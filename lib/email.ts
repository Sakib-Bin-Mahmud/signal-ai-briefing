import { Digest, NewsItem } from "./types";

const CATEGORY_COLORS: Record<string, string> = {
  Headline: "#334155",
  Product: "#6D28D9",
  Company: "#1D4ED8",
  Research: "#0F766E",
  Policy: "#9F1D3B",
  Investment: "#15803D",
};

function itemHtml(item: NewsItem): string {
  const color = CATEGORY_COLORS[item.category] ?? "#334155";
  return `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #E2E6EB;">
        <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: ${color}; margin-bottom: 4px;">
          ${item.category} · ${item.source} · ${item.importance}
        </div>
        <div style="font-size: 15px; font-weight: 600; color: #10151F; margin-bottom: 4px;">
          <a href="${item.url}" style="color: #10151F; text-decoration: none;">${item.title}</a>
        </div>
        <div style="font-size: 13px; color: #4B5566; line-height: 1.5;">${item.snippet}</div>
      </td>
    </tr>`;
}

export function renderDigestEmailHtml(digest: Digest): string {
  const dateStr = new Date(digest.generatedAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const sectionsHtml = digest.sections
    .filter((s) => s.items.length > 0)
    .map(
      (s) => `
      <tr><td style="padding: 20px 0 6px 0; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #10151F;">
        ${s.category}
      </td></tr>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${s.items.map(itemHtml).join("")}
      </table>`
    )
    .join("");

  return `
  <html>
    <body style="margin:0; padding:0; background:#ECEEF1; font-family: -apple-system, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; margin:0 auto; background:#ffffff;">
        <tr>
          <td style="padding: 28px 24px 8px 24px;">
            <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #C2410C;">${dateStr}</div>
            <div style="font-family: Georgia, serif; font-size: 26px; font-weight: 700; color: #10151F; margin-top: 4px;">Signal — Daily AI Briefing</div>
            <div style="font-size: 14px; color: #4B5566; margin-top: 10px; line-height: 1.6;">${digest.overview}</div>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 24px 24px 24px;">
            ${sectionsHtml}
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 24px; border-top: 1px solid #E2E6EB; font-family: monospace; font-size: 11px; color: #4B5566;">
            Generated ${new Date(digest.generatedAt).toLocaleString()} · ${digest.totalScanned} items scanned
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

/**
 * Sends the digest via Resend (https://resend.com). Requires RESEND_API_KEY,
 * FROM_EMAIL (must be on a domain verified in Resend), and RECIPIENT_EMAIL
 * environment variables. See README for setup.
 */
export async function sendDigestEmail(digest: Digest): Promise<{ ok: boolean; detail: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  const to = process.env.RECIPIENT_EMAIL;

  if (!apiKey || !from || !to) {
    return {
      ok: false,
      detail: "Missing RESEND_API_KEY, FROM_EMAIL, or RECIPIENT_EMAIL environment variable.",
    };
  }

  const dateStr = new Date(digest.generatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Signal — AI Briefing, ${dateStr}`,
      html: renderDigestEmailHtml(digest),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { ok: false, detail: `Resend API error (${res.status}): ${text}` };
  }

  return { ok: true, detail: "sent" };
}
