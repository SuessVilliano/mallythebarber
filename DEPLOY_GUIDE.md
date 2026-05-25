# 🚀 Mally The Barber — Deploy Guide

## Step 1 — Push to GitHub

```bash
# In Terminal, navigate to this folder
cd path/to/mally-barber

# Create a GitHub repo (go to github.com/new, name it "mally-the-barber")
# Then run:
git init
git add .
git commit -m "Initial commit: Mally The Barber website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mally-the-barber.git
git push -u origin main
```

---

## Step 2 — Deploy to Vercel

1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select `mally-the-barber`
4. Framework Preset: **Other**
5. Root Directory: `.` (leave blank)
6. Click **Deploy** ✅

Vercel will auto-deploy every time you push to `main`.

---

## Step 3 — Enable Gallery (Vercel Blob Storage)

The gallery needs Vercel Blob to store photos persistently across all devices.

1. In Vercel dashboard → Your project → **Storage** tab
2. Click **"Create Database"** → Select **Blob**
3. Name it `mally-gallery` → Click **Create**
4. Click **"Connect Project"** → Select your project → **Connect**

This automatically adds a `BLOB_READ_WRITE_TOKEN` environment variable.

5. Go to **Deployments** → Click the 3-dot menu → **Redeploy** (to pick up the new env var)

✅ Gallery is now live and connected!

---

## Step 4 — Connect Your Domain (mallythebarber.com)

1. In Vercel dashboard → Project → **Domains** tab
2. Add `mallythebarber.com`
3. Follow the DNS instructions shown (add CNAME/A records in your domain registrar)

---

## Step 5 — Activate GHL Workflows

Your GHL account has 6 workflows ready in **Draft** status. Publish them in the GHL dashboard:

1. Log into GoHighLevel → **Automation** → **Workflows**
2. You'll see these 6 workflows — click each and hit **Publish**:
   - ✉️ **Appointment Confirmation + Reminders** ← most important
   - 📱 **New Lead Nurture (Fast 5)**
   - 🚫 **Appt No Show**
   - ⭐ **New Sale - Send Review Request**
   - 💬 **Long-Term Nurture**
   - 🔔 **Stale Leads**

---

## Admin Panel

**URL:** `https://mallythebarber.com/admin`  
**Password:** `mals2025`

### How to add a cut photo:
1. Go to `/admin`
2. Enter password
3. Fill in: Cut Name, Cut Type (select from dropdown), Description (optional)
4. Drag and drop a photo (or click to browse)
5. Click **"Upload & Publish"**
6. Photo instantly appears on the main site gallery ✅

### How to edit or remove:
- Click **✏ Edit** on any photo to change name/type/description
- Click **✕ Delete** to remove a photo permanently

---

## File Structure

```
mally-barber/
├── index.html        ← Main website
├── admin.html        ← Admin gallery manager (/admin)
├── api/
│   └── gallery.js   ← Serverless API for gallery CRUD
├── package.json      ← @vercel/blob dependency
├── vercel.json       ← Routing + headers config
└── .gitignore
```

---

## Quick Updates

**Change services/prices:** Edit the `<div class="services-grid">` section in `index.html`

**Change phone/address:** Search for `(302) 384-2469` in `index.html`

**Change admin password:** Update `ADMIN_PW` in `admin.html` and `ADMIN_PASSWORD` in `api/gallery.js` — redeploy

---

## GHL Details (for reference)

| Key | Value |
|-----|-------|
| Location ID | `9e60YFK9nwS9SM8FtPO6` |
| Calendar ID | `uF3gavmzwUNiyOzmGFk1` |
| PIT Token | `pit-1bf41b46-4126-4f5d-8c25-2cc083cadda3` |
| Business Email | `273maljones@gmail.com` |
| Business Phone | `(302) 384-2469` |
