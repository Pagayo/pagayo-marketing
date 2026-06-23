/**
 * Cloudflare Pages Function — Contact Form Handler
 *
 * Accepts POST requests from marketing contact forms:
 *   /contact, /impact-contact, /powered-by-contact (+ /nl/powered-by-contact)
 * Validates input, and sends a notification email via AWS SES (eu-north-1, pagayo.email domain).
 *
 * Client SSoT: src/scripts/contact-form.ts (initContactForm) and src/scripts/pages/*-contact.ts
 *
 * Secrets required in Cloudflare Pages settings:
 *   AWS_SES_ACCESS_KEY  — AWS access key
 *   AWS_SES_SECRET_KEY  — AWS secret key
 *   AWS_SES_REGION      — (optional) default: eu-north-1
 *   CONTACT_EMAIL_TO    — (optional) default: info@pagayo.com
 *
 * Rate limiting: configure via Cloudflare WAF rules on /api/contact.
 */

interface Env {
  AWS_SES_ACCESS_KEY: string;
  AWS_SES_SECRET_KEY: string;
  AWS_SES_REGION?: string;
  CONTACT_EMAIL_TO?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  /** Honeypot — must be empty */
  website?: string;
  sector?: string;
  network_size?: string;
  intent?: string;
  form_type?: string;
}

// ─── AWS SES v4 Signing ───────────────────────────────────────────────────────

async function sha256Hex(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256(
  key: ArrayBuffer,
  message: string,
): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    new TextEncoder().encode(message),
  );
}

async function hmacSha256Hex(
  key: ArrayBuffer,
  message: string,
): Promise<string> {
  const buf = await hmacSha256(key, message);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function signAwsRequest(
  method: string,
  url: string,
  body: string,
  accessKey: string,
  secretKey: string,
  region: string,
): Promise<Headers> {
  const parsedUrl = new URL(url);
  const host = parsedUrl.host;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const service = "ses";

  const payloadHash = await sha256Hex(body);
  const canonicalHeaders =
    `content-type:application/json\n` +
    `host:${host}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders = "content-type;host;x-amz-date";
  const canonicalRequest = [
    method,
    parsedUrl.pathname,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join("\n");

  const enc = new TextEncoder();
  const kDate = await hmacSha256(enc.encode(`AWS4${secretKey}`), dateStamp);
  const kRegion = await hmacSha256(kDate, region);
  const kService = await hmacSha256(kRegion, service);
  const kSigning = await hmacSha256(kService, "aws4_request");
  const signature = await hmacSha256Hex(kSigning, stringToSign);

  const authorizationHeader =
    `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return new Headers({
    "Content-Type": "application/json",
    "x-amz-date": amzDate,
    Authorization: authorizationHeader,
  });
}

// ─── Email ────────────────────────────────────────────────────────────────────

async function sendContactEmail(
  env: Env,
  payload: ContactPayload,
): Promise<void> {
  const region = env.AWS_SES_REGION || "eu-north-1";
  const to = env.CONTACT_EMAIL_TO || "info@pagayo.com";
  const endpoint = `https://email.${region}.amazonaws.com/v2/email/outbound-emails`;

  const isPoweredBy = payload.form_type === "powered-by";
  const heading = isPoweredBy
    ? "New Powered by Pagayo enquiry"
    : "New contact form submission";
  const subjectPrefix = isPoweredBy ? "[Powered by]" : "[Contact]";

  const html = `
    <h2>${heading}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><th align="left">Name</th><td>${escapeHtml(payload.name)}</td></tr>
      <tr><th align="left">Email</th><td><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
      ${payload.company ? `<tr><th align="left">Organisation</th><td>${escapeHtml(payload.company)}</td></tr>` : ""}
      ${payload.sector ? `<tr><th align="left">Sector</th><td>${escapeHtml(payload.sector)}</td></tr>` : ""}
      ${payload.network_size ? `<tr><th align="left">Network size</th><td>${escapeHtml(payload.network_size)}</td></tr>` : ""}
      ${payload.intent ? `<tr><th align="left">Intent</th><td>${escapeHtml(payload.intent)}</td></tr>` : ""}
      <tr><th align="left">Subject</th><td>${escapeHtml(payload.subject)}</td></tr>
    </table>
    <h3 style="margin-top:24px">Message</h3>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
  `.trim();

  const text =
    `Name: ${payload.name}\n` +
    `Email: ${payload.email}\n` +
    (payload.company ? `Organisation: ${payload.company}\n` : "") +
    (payload.sector ? `Sector: ${payload.sector}\n` : "") +
    (payload.network_size ? `Network size: ${payload.network_size}\n` : "") +
    (payload.intent ? `Intent: ${payload.intent}\n` : "") +
    `Subject: ${payload.subject}\n\n` +
    `Message:\n${payload.message}`;

  const sesPayload = {
    FromEmailAddress: `"Pagayo Contact" <noreply@pagayo.email>`,
    Destination: { ToAddresses: [to] },
    ReplyToAddresses: [payload.email],
    Content: {
      Simple: {
        Subject: { Data: `${subjectPrefix} ${payload.subject}`, Charset: "UTF-8" },
        Body: {
          Html: { Data: html, Charset: "UTF-8" },
          Text: { Data: text, Charset: "UTF-8" },
        },
      },
    },
  };

  const body = JSON.stringify(sesPayload);
  const headers = await signAwsRequest(
    "POST",
    endpoint,
    body,
    env.AWS_SES_ACCESS_KEY,
    env.AWS_SES_SECRET_KEY,
    region,
  );

  const response = await fetch(endpoint, { method: "POST", headers, body });

  if (!response.ok) {
    const errText = await response.text();
    console.error(`SES error ${response.status}:`, errText);
    throw new Error(`SES_ERROR|http=${response.status}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const env = context.env;

  // Guard: secrets must be configured
  if (!env.AWS_SES_ACCESS_KEY || !env.AWS_SES_SECRET_KEY) {
    console.error("contact: AWS SES credentials not configured");
    return Response.json(
      { success: false, error: "Service temporarily unavailable" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    const contentType = context.request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await context.request.json();
    } else {
      const formData = await context.request.formData();
      body = Object.fromEntries(formData.entries());
    }
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;

  // Honeypot check
  if (data.website) {
    return Response.json({ success: true });
  }

  // Validation
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const companyRaw =
    typeof data.company === "string"
      ? data.company.trim()
      : typeof data.organisation === "string"
        ? data.organisation.trim()
        : undefined;
  const company = companyRaw || undefined;
  const subject = typeof data.subject === "string" ? data.subject.trim() : "";
  let message = typeof data.message === "string" ? data.message.trim() : "";
  const sector = typeof data.sector === "string" ? data.sector.trim() : undefined;
  const network_size =
    typeof data.network_size === "string" ? data.network_size.trim() : undefined;
  const intent = typeof data.intent === "string" ? data.intent.trim() : undefined;
  const form_type =
    typeof data.form_type === "string" ? data.form_type.trim() : undefined;

  if (message.length < 10 && form_type === "powered-by") {
    const lines = ["Powered by Pagayo network enquiry."];
    if (sector) lines.push(`Sector: ${sector}`);
    if (network_size) lines.push(`Network size: ${network_size}`);
    if (intent) lines.push(`Intent: ${intent}`);
    if (message) lines.push("", "Additional notes:", message);
    message = lines.join("\n");
  }

  const errors: string[] = [];
  if (!name || name.length > 120) errors.push("name");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    errors.push("email");
  if (!subject || subject.length > 200) errors.push("subject");
  if (!message || message.length < 10 || message.length > 5000)
    errors.push("message");

  if (errors.length > 0) {
    return Response.json(
      { success: false, error: "Validation failed", fields: errors },
      { status: 422 },
    );
  }

  try {
    await sendContactEmail(env, {
      name,
      email,
      company,
      subject,
      message,
      sector,
      network_size,
      intent,
      form_type,
    });
    return Response.json({ success: true });
  } catch (err) {
    console.error("contact: send failed", err);
    return Response.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
};

// Only POST is handled; other methods get 405
export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method !== "POST") {
    return Response.json(
      { success: false, error: "Method not allowed" },
      { status: 405, headers: { Allow: "POST" } },
    );
  }
  return onRequestPost(context);
};
