// Receives the enquiry form from zoomlion.ie and emails it with Resend.
// Settings are in wrangler.toml; the API key is the RESEND_API_KEY secret.

const FIELDS = ["name", "phone", "email", "county", "machine", "finance", "message", "source", "page"];
const MAX_LEN = 4000;

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clean = (v) => String(v ?? "").replace(/[\r\u0000]/g, "").trim().slice(0, MAX_LEN);
const list = (s) => String(s ?? "").split(",").map((x) => x.trim()).filter(Boolean);

function cors(origin, env) {
  const ok = list(env.ALLOWED_ORIGINS).includes(origin);
  return {
    ...(ok ? { "Access-Control-Allow-Origin": origin } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...headers } });

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") ?? "";
    const headers = cors(origin, env);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405, headers);
    if (!list(env.ALLOWED_ORIGINS).includes(origin)) return json({ ok: false, error: "Origin not allowed" }, 403, headers);

    let form;
    try {
      form = await request.formData();
    } catch {
      return json({ ok: false, error: "Bad request" }, 400, headers);
    }

    // Bots fill the hidden field; pretend it worked.
    if (clean(form.get("company_website"))) return json({ ok: true }, 200, headers);

    const d = Object.fromEntries(FIELDS.map((k) => [k, clean(form.get(k))]));
    if (!d.name || !/^\+?\d{7,15}$/.test(d.phone.replace(/[\s()-]/g, "")) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
      return json({ ok: false, error: "Please check your name, phone and email." }, 422, headers);
    }

    const rows = FIELDS.filter((k) => d[k]).map((k) => [k[0].toUpperCase() + k.slice(1), d[k]]);
    const subject = `Zoomlion enquiry: ${d.machine || "general"} - ${d.name}`.replace(/[\r\n]/g, " ");
    const html =
      `<h2 style="margin:0 0 12px">New Zoomlion enquiry</h2><table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:15px">` +
      rows.map(([k, v]) => `<tr><td style="font-weight:600;vertical-align:top">${esc(k)}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("") +
      `</table>`;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: list(env.MAIL_TO),
        cc: list(env.MAIL_CC),
        reply_to: d.email,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return json({ ok: false, error: "Could not send" }, 502, headers);
    }
    return json({ ok: true }, 200, headers);
  },
};
