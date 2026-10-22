// Zoomlion Ireland lead mailer: receives the website's quote/contact form and
// emails it to the sales inbox, logging each lead to the bound Google Sheet.
// Setup: see apps-script/README.md.

const TO = "office@oreganplantsales.com";
const FIELDS = ["name", "phone", "email", "county", "machine", "finance", "message", "source", "page"];
const MAX_LEN = 4000;

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.company_website) return ok(); // honeypot: bots fill the hidden field
  if (!p.name || !p.phone || !p.email) return ok();

  const lead = {};
  FIELDS.forEach(function (k) {
    lead[k] = String(p[k] || "").slice(0, MAX_LEN).trim();
  });

  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  if (sheet) {
    // Prefix formula characters so a lead can't inject a spreadsheet formula.
    const safe = function (v) { return /^[=+\-@]/.test(v) ? "'" + v : v; };
    sheet.getSheets()[0].appendRow([new Date()].concat(FIELDS.map(function (k) { return safe(lead[k]); })));
  }

  const subject = "Zoomlion.ie enquiry: " + (lead.machine || "general") + " (" + lead.name + ")";
  const body = FIELDS.filter(function (k) { return lead[k]; })
    .map(function (k) { return k.charAt(0).toUpperCase() + k.slice(1) + ": " + lead[k]; })
    .join("\n");
  MailApp.sendEmail({ to: TO, subject: subject, body: body, replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) ? lead.email : TO });
  return ok();
}

function ok() {
  return ContentService.createTextOutput("ok");
}
