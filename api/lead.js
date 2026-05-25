// api/lead.js — Vercel Serverless Function
// Captures exit-intent popup leads and creates a GHL contact tagged
// "first-cut-discount" so a GHL workflow can deliver the $5 off code.
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   GHL_PIT_TOKEN     Private Integration Token from GHL
//   GHL_LOCATION_ID   Location ID (defaults to known value if unset)

const GHL_API = 'https://services.leadconnectorhq.com/contacts/';
const DEFAULT_LOCATION_ID = '9e60YFK9nwS9SM8FtPO6';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function isValidEmail(v) {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function normalizePhone(v) {
  if (!v) return undefined;
  const digits = String(v).replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return digits.startsWith('+') ? digits : `+${digits}`;
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.GHL_PIT_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID || DEFAULT_LOCATION_ID;
  if (!token) {
    return res.status(500).json({ error: 'GHL_PIT_TOKEN env var is not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const firstName = (body.firstName || '').trim() || undefined;
  const lastName = (body.lastName || '').trim() || undefined;
  const email = isValidEmail(body.email) ? body.email.trim().toLowerCase() : undefined;
  const phone = normalizePhone(body.phone);
  const source = (body.source || 'website').toString().slice(0, 80);

  if (!email && !phone) {
    return res.status(400).json({ error: 'Email or phone is required' });
  }

  const payload = {
    locationId,
    firstName,
    lastName,
    email,
    phone,
    source,
    tags: ['first-cut-discount', 'website-lead', 'exit-intent-popup'],
  };

  try {
    const ghlRes = await fetch(GHL_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await ghlRes.json().catch(() => ({}));

    // 200, 201 = created. 400/409 with "duplicate" means contact exists — still success for us.
    const isDuplicate =
      ghlRes.status === 400 &&
      JSON.stringify(data).toLowerCase().includes('duplicat');

    if (!ghlRes.ok && !isDuplicate) {
      console.error('GHL contact create failed', { status: ghlRes.status, data });
      return res.status(502).json({ error: 'Lead capture failed', details: data });
    }

    return res.status(200).json({
      ok: true,
      code: 'FIRST5',
      contactId: data?.contact?.id || data?.id || null,
      duplicate: isDuplicate,
    });
  } catch (err) {
    console.error('Lead capture error', err);
    return res.status(500).json({ error: 'Internal error', message: err.message });
  }
}
