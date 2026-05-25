# GHL Calendar Automation — Activation Checklist

The 6 workflows below are sitting in **Draft** status in your GHL account.
They need to be published to activate calendar automation for the booking
calendar (ID `uF3gavmzwUNiyOzmGFk1`).

Go to **GHL → Automation → Workflows** and publish each one. Verify the
trigger/actions match what's described before flipping to Active.

---

## 1. ✉️ Appointment Confirmation + Reminders ← do this first
**Trigger:** Calendar — Appointment Booked (calendar: Mally The Barber)

**Actions:**
- Send Email (instant): "Your appointment with Mally is confirmed for {{appointment.start_time}}"
- Send SMS (instant): "Mally The Barber: Confirmed for {{appointment.start_time}}. Reply STOP to opt out."
- Wait until 24 hours before appointment → Send SMS reminder
- Wait until 2 hours before appointment → Send SMS reminder
- Wait until 15 minutes before → Send SMS "We're ready for you. See you soon!"

---

## 2. 📱 New Lead Nurture (Fast 5)
**Trigger:** Contact tag added → `website-lead` OR `first-cut-discount`

**Actions (over 5 days):**
- Day 0 (instant): Welcome email + FIRST5 code
- Day 0 (instant): SMS "Welcome — your $5 off code is FIRST5"
- Day 1: Email "Here's what makes Mally different" (services overview)
- Day 3: SMS "Still want to book? Tap here: {{booking_link}}"
- Day 5: Email final reminder

End condition: tag `appointment-booked` → exit workflow.

---

## 3. 🚫 Appt No Show
**Trigger:** Calendar — Appointment marked No-Show

**Actions:**
- Add tag `no-show`
- Send SMS: "Hey {{first_name}}, we missed you today. Want to reschedule? Reply YES or book: {{booking_link}}"
- Send Email with reschedule link
- If 2+ no-shows in 90 days → add tag `requires-prepayment` (so future bookings can be gated)

---

## 4. ⭐ New Sale - Send Review Request
**Trigger:** Calendar — Appointment status = Completed

**Actions:**
- Wait 2 hours
- Send SMS: "Hope you love the cut. Drop a quick Google review? {{google_review_link}}"
- Wait 1 day, if no review → Send Email reminder
- Add tag `review-requested`

---

## 5. 💬 Long-Term Nurture
**Trigger:** Contact tag added → `client-active`

**Actions (every 3 weeks):**
- Send SMS: "Time for a touch-up? Book your next cut: {{booking_link}}"
- Pause if appointment booked within the last 14 days
- Loop until tag `client-inactive` added

---

## 6. 🔔 Stale Leads
**Trigger:** Contact tag added 30 days ago AND no appointment booked

**Actions:**
- Send Email: "We saved your $5 off code — still want it? FIRST5"
- Send SMS: "Last chance on your FIRST5 discount — {{booking_link}}"
- Wait 7 days → if still no booking → add tag `cold-lead`

---

## 7. (NEW) Send FIRST5 Discount Code
> Required for the exit-intent popup on the new site.

**Trigger:** Contact tag added → `first-cut-discount`

**Actions:**
- Wait 30 seconds (let GHL finish processing the contact)
- Send Email — Subject: "Your $5 off at Mally The Barber" — Body: "Hey {{first_name}}, here's your code: **FIRST5**. Book your first cut here: https://mallythebarber.com/#book"
- If phone present → Send SMS: "Mally The Barber: Welcome! Your $5 off code is FIRST5. Book: https://mallythebarber.com/#book — reply STOP to opt out."
- Add to **New Lead Nurture (Fast 5)** workflow

---

## Verification Tests

After publishing all workflows, run these end-to-end tests:

1. **Booking flow:** Book a test appointment with your own number → verify confirmation SMS + email arrive within 1 minute
2. **Reminder timing:** Book for 25 hours out → verify reminder fires at the 24-hour mark
3. **Exit popup:** Visit https://mallythebarber.com, trigger exit intent, submit your email → verify `first-cut-discount` tag is on the contact + FIRST5 code arrives via email/SMS
4. **No-show flow:** Mark a past test appointment as No-Show → verify SMS goes out
5. **Review flow:** Mark a test appointment as Completed → verify review SMS goes out after 2 hours

---

## Required Env Vars in Vercel

For `/api/lead` (exit-intent popup) to create GHL contacts:

| Variable | Value |
|----------|-------|
| `GHL_PIT_TOKEN` | `pit-1bf41b46-4126-4f5d-8c25-2cc083cadda3` |
| `GHL_LOCATION_ID` | `9e60YFK9nwS9SM8FtPO6` *(optional; defaults to this)* |

Set both at Vercel → Project → Settings → Environment Variables → All
environments (Production + Preview + Development), then **redeploy**.
