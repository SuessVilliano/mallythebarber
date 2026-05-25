# Mel — AI Agent Update Guide

This file holds the **updated knowledge base, system prompt, and config** for
**Mel**, Mally The Barber's AI booking assistant (Conversational AI + Voice AI
in GoHighLevel).

> Use this as a copy/paste source. Update Mel inside GHL — don't recreate.

---

## 1. Update Mel's System Prompt / Persona

Paste this into Mel's Conversational AI prompt (and Voice AI prompt — same text
with the small voice-only addendum at the end):

```
You are Mel, the friendly and professional AI booking assistant for Mally The
Barber — a premium barbershop in New Castle, Delaware.

Your job:
1. Answer questions about services, pricing, hours, and location.
2. Book appointments by collecting the client's name, phone, email, preferred
   service, and preferred date/time, then handing off to the calendar.
3. Offer the FIRST5 discount code to new clients ($5 off their first cut).
4. Reschedule or cancel appointments when asked, following the 4-hour
   cancellation policy.
5. Send the booking link when a client wants to self-serve.

Your personality:
- Sharp, confident, warm — like a barber who knows their craft.
- Brief and direct. No filler. No corporate-speak.
- Use the client's first name once you have it.
- If unsure, say so and offer to text/call Mally directly.

Hard rules:
- Never invent services or prices. Use only what's in your knowledge base.
- Never promise a time slot without checking the calendar.
- For walk-ins: say they're welcome but strongly recommend booking online to
  skip the wait.
- If a request is outside scope (complaints, refunds, special requests),
  collect the details and tag the conversation for Mally to follow up.
- Always close by confirming next steps.

Booking link: https://mallythebarber.com/#book
Phone: (302) 384-2469
Address: 1412 N Dupont Hwy, New Castle, DE 19720

[VOICE AI ONLY — append this for voice]
You are speaking out loud. Keep responses under 2 sentences when possible.
Spell out prices ("forty dollars" not "$40"). When confirming a time, repeat
it back clearly. If the caller goes silent for more than 6 seconds, ask "Are
you still there?"
```

---

## 2. Replace Mel's Knowledge Base

Delete any old KB entries and paste these in. GHL → AI Agent → Knowledge Base
→ Add Documents. You can paste each section as a separate doc, or one big
"Mally The Barber — Master KB" doc.

### KB Document: Business Info

```
Business name: Mally The Barber
Owner: Mally
Address: 1412 N Dupont Hwy, New Castle, DE 19720
Phone: (302) 384-2469
Email: 273maljones@gmail.com
Website: https://mallythebarber.com
Booking link: https://mallythebarber.com/#book
Admin panel: https://mallythebarber.com/admin

Hours:
- Tuesday–Friday: 9:00 AM – 7:00 PM
- Saturday: 8:00 AM – 6:00 PM
- Sunday: 10:00 AM – 3:00 PM
- Monday: Closed

Parking: Free on-site parking
Payment methods: Cash, credit card, debit card, Apple Pay, Google Pay, online prepay
Areas served: New Castle, Wilmington, Newark, surrounding Delaware
```

### KB Document: Services & Pricing

```
| Service                          | Duration | Price |
|----------------------------------|----------|-------|
| Mens / Womens Haircut            | 45 min   | $40   |
| Signature Haircut & Beard        | 55 min   | $45   |
| Children's Haircut (Ages 1–4)    | 30 min   | $20+  |
| Children's Haircut (Ages 5–12)   | 30 min   | $25   |
| Children's Haircut (Ages 13–18)  | 30 min   | $30   |
| Shape-Up                         | 30 min   | $15   |
| Beard Shape-Up / Trim            | 30 min   | $15   |
| Shampoo & Conditioner            | 10 min   | $10   |
| Enhancements / Eye Brows         | 10 min   | $10   |

Most popular: Signature Haircut & Beard ($45)
Best deal: Shape-Up ($15) for in-between visits
```

### KB Document: Policies

```
Cancellation: Cancel or reschedule at least 4 hours before the appointment.
  Repeat no-shows may be charged a fee for future bookings.

Walk-ins: Welcome based on availability. Booking online strongly recommended
  to lock in your preferred time.

First-time client discount: $5 off your first cut. Code FIRST5. Mention when
  booking online or in person. One per customer.

Payment: Pre-pay when booking online, or pay in person (cash/card/Apple Pay/Google Pay).
  No deposit required for in-person payment.

Confirmations & reminders: Automatic SMS and email confirmation after booking,
  plus a reminder 24 hours and 2 hours before the appointment.
```

### KB Document: FAQs (verbatim from website)

```
Q: Where is Mally The Barber located?
A: 1412 N Dupont Hwy, New Castle, DE 19720. Free parking on-site.

Q: How do I book?
A: Online 24/7 at https://mallythebarber.com/#book, call/text (302) 384-2469,
   or chat right here with Mel.

Q: What services do you offer?
A: Mens & womens haircuts ($40), signature haircut + beard ($45), kids cuts
   ($20–$30), shape-ups ($15), beard trim ($15), shampoo ($10), brows ($10).

Q: Do you accept walk-ins?
A: Yes, based on availability — booking online is strongly recommended.

Q: First-time discount?
A: Yes — $5 off with code FIRST5.

Q: Payment methods?
A: Cash, credit, debit, Apple Pay, Google Pay, or online prepay.

Q: Kids' haircuts?
A: Ages 1–4 ($20+), 5–12 ($25), 13–18 ($30). All 30 min.

Q: Beard services?
A: Beard shape-up/trim is $15. Combo haircut + beard is $45.

Q: Cancellation policy?
A: At least 4 hours' notice. Repeat no-shows may incur a fee.

Q: Appointment length?
A: Cuts are 30–45 min. Signature combo is ~55 min.

Q: Parking?
A: Yes, free on-site.

Q: Reminders?
A: Yes — automatic SMS and email reminders.
```

### KB Document: Other Mally Brands (for upsell/cross-mention)

```
Mally also operates:
- Mal's Famous Seafood & Grill (food truck) — https://malsfamousseafoodgrill.com
- Bar on the Move (mobile bar for events) — https://baronthemove.liv8.co

If a client mentions an event, wedding, or catering need, you can mention
these brands. Otherwise stay focused on the barbershop.
```

---

## 3. Voice AI — Phone Number Config

In GHL → Voice AI → Phone Numbers, attach Mel to **(302) 384-2469** (or your
inbound Voice AI number if separate).

**Recommended voice settings:**
- Voice: Warm male voice (e.g., "Rachel" alternative or any masculine option)
- Speaking rate: 1.0 (default)
- Interruption sensitivity: Medium
- Silence timeout: 6 seconds
- First message: *"Mally The Barber, this is Mel. How can I help you today?"*

**Call routing:**
- If caller asks for Mally directly OR says the word "emergency" → transfer to
  Mally's cell.
- If caller wants to book → collect name/service/preferred date → confirm via
  calendar API → send SMS confirmation.
- If caller wants to cancel/reschedule → look up by phone number → confirm
  change → send SMS update.

---

## 4. Conversational AI — Chat Widget Config

The widget is already embedded on the site:

```html
<script src="https://beta.leadconnectorhq.com/loader.js"
        data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a148ac352a22073a70a074e"></script>
```

In GHL → Chat Widget settings:
- **Greeting:** "Hey 👋 I'm Mel — Mally's AI booking assistant. Need to book a cut, ask about services, or check our hours? I've got you."
- **Suggested replies:** "Book a haircut", "What are your hours?", "How much for a cut + beard?", "Do you cut kids' hair?"
- **Brand color:** `#C9A455` (matches the site's gold)
- **Position:** Bottom-right
- **Avatar:** Use a barbershop icon or Mally's logo

---

## 5. Auto-Tagging / Lead Capture Webhook

The website's exit-intent popup now POSTs to `/api/lead` which creates a GHL
contact tagged:
- `first-cut-discount`
- `website-lead`
- `exit-intent-popup`

**Required workflow:** *"Send FIRST5 Discount Code"*
- **Trigger:** Tag added → `first-cut-discount`
- **Action 1:** Wait 30 seconds
- **Action 2:** Send Email — "Your $5 off code: FIRST5 — book at https://mallythebarber.com/#book"
- **Action 3:** Send SMS (if phone present) — "Mally The Barber: Welcome! Your $5 off code is FIRST5. Book here: https://mallythebarber.com/#book"
- **Action 4:** Add to long-term nurture pipeline

**Required env vars in Vercel:**
- `GHL_PIT_TOKEN` = `pit-1bf41b46-4126-4f5d-8c25-2cc083cadda3`
- `GHL_LOCATION_ID` = `9e60YFK9nwS9SM8FtPO6` (optional — defaults to this)

Add at Vercel → Project → Settings → Environment Variables → redeploy.

---

## 6. Testing Mel

After updating, test these 8 paths:

1. **Hours:** "What time do you close on Saturday?" → should say 6 PM
2. **Pricing:** "How much for a cut and beard?" → $45
3. **Booking:** "I want to book a haircut for tomorrow at 2pm" → collects info, links calendar
4. **Kids:** "Do you cut kids' hair?" → yes, ages + prices
5. **Walk-in:** "Can I walk in?" → yes, but recommend booking
6. **Discount:** "Any first-time deals?" → FIRST5 code
7. **Cancellation:** "I need to cancel my Friday appointment" → looks up + processes
8. **Outside scope:** "Do you do dreadlocks?" → flags for Mally if not in KB

If any answer is wrong or stale, update the relevant KB doc and re-test.
