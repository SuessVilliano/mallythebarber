# Mally The Barber — Website

Premium barber booking website for **Mally The Barber**.

## Live Features

- 🎬 Animated splash/loader screen
- 📱 Fully mobile-optimized with hamburger menu
- ✂️ Services & pricing section (all 9 services)
- 📅 Live GoHighLevel booking calendar embed
- 🌐 Banner links to Mal's Seafood & Grill and Bar on the Move
- 🎨 Scroll-reveal animations throughout
- 🔗 Smooth anchor navigation with offset

## Tech Stack

- Pure HTML / CSS / JavaScript (zero dependencies, zero build step)
- GoHighLevel calendar embed (`uF3gavmzwUNiyOzmGFk1`)
- Hosted on **Vercel** (serverless static deploy)

## Deployment

### Deploy via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Deploy via GitHub + Vercel Dashboard

1. Push this folder to a new GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the GitHub repo
4. Framework: **Other** (Static)
5. Root Directory: `.` (this folder)
6. Click **Deploy**

Vercel auto-deploys on every `git push` to `main`.

## GHL Integration

- **Calendar Widget ID:** `uF3gavmzwUNiyOzmGFk1`
- **Location ID:** `9e60YFK9nwS9SM8FtPO6`
- Automations configured: Confirmation email/SMS, 24h reminder, post-visit follow-up

## Updating Services / Prices

Edit the `<div class="services-grid">` section in `index.html`.
Each service follows this pattern:

```html
<div class="service-item">
  <div class="service-left">
    <div class="service-name">SERVICE NAME</div>
    <div class="service-duration">XX min</div>
  </div>
  <div class="service-price">$XX</div>
</div>
```

## Brand Links

Update these in the `#brands` section of `index.html`:
- `https://malsfamousseafoodgrill.com`
- `https://baronthemove.liv8.co`
