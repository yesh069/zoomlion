# Lead mailer (Google Apps Script)

Free email handler for the quote and contact forms. No server or paid plan needed.

1. Create a Google Sheet called "Zoomlion.ie leads" (signed in as the account that should send the emails).
2. Add a header row: `Date, Name, Phone, Email, County, Machine, Finance, Message, Source, Page`.
3. Go to **Extensions → Apps Script**, paste in `Code.gs` and save.
4. Go to **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Deploy, then authorise.
5. Copy the web app URL into `NEXT_PUBLIC_LEAD_ENDPOINT` (in `.env.local`, or in the GitHub Actions secret used by the deploy), then rebuild.

If the URL isn't set, the forms open the visitor's email app with the enquiry filled in instead.
