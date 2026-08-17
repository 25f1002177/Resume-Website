# Puja Retail Growth — Setup

This is a static website. No traditional backend/database is required.

## 1. Edit `config.js`

Change:

- `whatsappNumber`: your WhatsApp number with country code, digits only.
  - Example: `919876543210`
- `metaPixelId`: your Meta Pixel ID.
- `googleAppsScriptUrl`: optional Google Apps Script Web App `/exec` URL.

## 2. Recommended lead flow

1. Prospect fills the qualification form.
2. The site scores obvious poor-fit leads.
3. All submissions can be logged to Google Sheets if Apps Script is configured.
4. A qualified submission opens WhatsApp in a new tab with all answers pre-filled.
5. The original tab navigates to `thank-you.html`.
6. `thank-you.html` fires the Meta standard `Lead` event only when the tab contains a session flag created by a real qualified form submission.
7. The session flag is removed after firing, reducing accidental duplicate Lead events from refresh/direct visits.

## 3. Google Sheets without your own backend

Use `google-apps-script.gs`:

1. Create a Google Sheet.
2. Open **Extensions → Apps Script**.
3. Paste the contents of `google-apps-script.gs`.
4. Click **Deploy → New deployment → Web app**.
5. Execute as **Me**.
6. Choose the access level appropriate for public form submissions (commonly "Anyone").
7. Deploy and copy the Web App `/exec` URL.
8. Paste it into `googleAppsScriptUrl` in `config.js`.

The site uses a fire-and-forget `fetch(..., mode:"no-cors", keepalive:true)` so the lead can be logged without slowing down the WhatsApp handoff.

## 4. Locality-specific ads with one landing page

You can use one website and personalize the hero from the ad URL:

- Gariahat:
  `https://yourdomain.com/?area=gariahat&utm_source=meta&utm_campaign=puja_gariahat`
- New Market:
  `https://yourdomain.com/?area=newmarket&utm_source=meta&utm_campaign=puja_newmarket`
- Hatibagan test:
  `https://yourdomain.com/?area=hatibagan&utm_source=meta&utm_campaign=puja_hatibagan`

The form automatically selects the matching area and passes UTM/fbclid attribution into Google Sheets and the WhatsApp message.

## 5. Meta Pixel

The base pixel loads on both pages after you set `metaPixelId`.

- Landing page: `PageView`
- Qualified confirmation page: `Lead`
- Obvious poor-fit form: custom `DisqualifiedApplication`

Before running paid traffic, verify events in Meta Events Manager / Test Events and with Meta Pixel Helper.

## 6. Important behavior

Browsers can block automatic new tabs. Because WhatsApp is opened directly from the user's form-submit gesture, it will usually be allowed. If it is blocked, the confirmation page contains a manual **WhatsApp খুলুন** button.

## 7. Pricing currently encoded

- Management: ₹27,500/month **starting**
- Media spend: separate
- POV production: separate
- Capacity message: max 5 stores this season

Change these values/copy whenever your market test gives you better evidence.
