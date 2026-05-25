// api/gallery.js — Vercel Serverless Function
// Requires: BLOB_READ_WRITE_TOKEN env var (set automatically when you add Vercel Blob)

import { put, del, list, head } from '@vercel/blob';

const METADATA_KEY = 'gallery/metadata.json';
const ADMIN_PASSWORD = 'mals2025';

// ─── CORS HEADERS ───────────────────────────────────────────────────────────
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// ─── READ GALLERY METADATA ──────────────────────────────────────────────────
async function readGallery() {
  try {
    const { blobs } = await list({ prefix: 'gallery/metadata' });
    const meta = blobs.find(b => b.pathname === METADATA_KEY);
    if (!meta) return [];
    const res = await fetch(meta.downloadUrl);
    return await res.json();
  } catch {
    return [];
  }
}

// ─── WRITE GALLERY METADATA ─────────────────────────────────────────────────
async function writeGallery(items) {
  const blob = new Blob([JSON.stringify(items)], { type: 'application/json' });
  await put(METADATA_KEY, blob, { access: 'public', addRandomSuffix: false, allowOverwrite: true });
}

// ─── MAIN HANDLER ────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET: return gallery items ─────────────────────────────────────────────
  if (req.method === 'GET') {
    const items = await readGallery();
    return res.status(200).json(items);
  }

  // ── POST: add new gallery item (multipart form) ───────────────────────────
  if (req.method === 'POST') {
    const { password, name, type, description, imageBase64, imageType } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!imageBase64 || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Convert base64 to buffer and upload to Vercel Blob
    const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const ext = (imageType || 'image/jpeg').split('/')[1] || 'jpg';
    const filename = `gallery/images/${Date.now()}-${name.toLowerCase().replace(/\s+/g, '-')}.${ext}`;

    const { url } = await put(filename, buffer, {
      access: 'public',
      contentType: imageType || 'image/jpeg',
    });

    const items = await readGallery();
    const newItem = {
      id: `${Date.now()}`,
      name,
      type: type || name,
      description: description || '',
      imageUrl: url,
      createdAt: new Date().toISOString(),
    };

    items.unshift(newItem); // newest first
    await writeGallery(items);

    return res.status(200).json(newItem);
  }

  // ── PUT: update gallery item metadata ────────────────────────────────────
  if (req.method === 'PUT') {
    const { password, id, name, type, description } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const items = await readGallery();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });

    if (name) items[idx].name = name;
    if (type) items[idx].type = type;
    if (description !== undefined) items[idx].description = description;

    await writeGallery(items);
    return res.status(200).json(items[idx]);
  }

  // ── DELETE: remove gallery item ──────────────────────────────────────────
  if (req.method === 'DELETE') {
    const { password, id } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const items = await readGallery();
    const item = items.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    // Delete the image from Blob storage
    try { await del(item.imageUrl); } catch {}

    const updated = items.filter(i => i.id !== id);
    await writeGallery(updated);

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};
