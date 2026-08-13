import { NextResponse } from 'next/server';
import { site } from '@/data/site';
import {
  coerceContactForm,
  CONTACT_EMAIL_SUBJECT,
  isValid,
  validateContactForm,
  type ContactFormValues,
} from '@/lib/contact-form';

export const runtime = 'nodejs';

/**
 * Contact endpoint.
 *
 * Delivery is wired for Resend and needs no extra dependency — it posts to the
 * REST API with `fetch`. The only required setting is the API key:
 *
 *   RESEND_API_KEY      re_xxxxxxxx           (required to send)
 *   CONTACT_TO_EMAIL    overrides `site.email`
 *   CONTACT_FROM_EMAIL  overrides the shared Resend sender
 *
 * Until `RESEND_API_KEY` is set the route validates and logs the brief, so the
 * form is fully exercisable in development.
 *
 * Preferring EmailJS instead? Keep this route for validation and swap the
 * `deliver()` body for a POST to
 * https://api.emailjs.com/api/v1.0/email/send with your service/template ids.
 */

/**
 * Resend's shared sender. It works with no DNS setup, but Resend only allows it
 * to send to the address that owns the API key. Verify a domain and set
 * CONTACT_FROM_EMAIL to send from your own address to anyone.
 */
const DEFAULT_FROM = 'Nexoffice <onboarding@resend.dev>';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toHtml(values: ContactFormValues): string {
  const rows: Array<[string, string]> = [
    ['Name', values.name],
    ['Email', values.email],
    ['Company', values.company || '—'],
    ['Phone', values.phone || '—'],
    ['Service needed', values.service],
    ['Project details', values.message],
  ];

  return `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6b7280;vertical-align:top">${label}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join('')}</table>`;
}

/** Plain-text alternative, so the mail is readable in any client. */
function toText(values: ContactFormValues): string {
  return [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || '—'}`,
    `Phone: ${values.phone || '—'}`,
    `Service needed: ${values.service}`,
    '',
    'Project details:',
    values.message,
  ].join('\n');
}

async function deliver(values: ContactFormValues): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  if (!apiKey) {
    console.info('[contact] RESEND_API_KEY not set; brief received:', values);
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: values.email,
      subject: CONTACT_EMAIL_SUBJECT,
      html: toHtml(values),
      text: toText(values),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Resend responded ${response.status}: ${await response.text()}`,
    );
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request body.' }, { status: 400 });
  }

  const values = coerceContactForm(payload);
  const errors = validateContactForm(values);

  if (!isValid(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await deliver(values);
  } catch (error) {
    console.error('[contact] delivery failed', error);
    return NextResponse.json(
      { ok: false, error: 'Delivery failed.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
