/**
 * Contact form contract, shared by the client form and the API route so the
 * two can never drift. Validation runs on both sides from these same rules.
 */

/** Selectable services, in the order they appear in the dropdown. */
export const SERVICE_OPTIONS = [
  'Web Development',
  'AI Solutions',
  'ERP Development',
  'E-commerce',
  'SaaS Development',
  'Automation',
  'Other',
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

export type ContactFormErrors = Record<keyof ContactFormValues, string>;

export const emptyContactForm: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  message: '',
};

export const emptyContactErrors: ContactFormErrors = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\-\s\d]{7,20}$/;

export const MESSAGE_MIN_LENGTH = 20;

function isServiceOption(value: string): value is ServiceOption {
  return (SERVICE_OPTIONS as readonly string[]).includes(value);
}

/**
 * Returns an error map with one entry per field; an empty string means the
 * field is valid. Use `isValid` to collapse the map to a boolean.
 *
 * Required: name, email, service, message. Company and phone are optional,
 * though phone is still format-checked when present.
 */
export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = { ...emptyContactErrors };

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That email does not look right.';
  }

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Use digits, spaces, or +().';
  }

  if (!values.service.trim()) {
    errors.service = 'Please choose a service.';
  } else if (!isServiceOption(values.service)) {
    // Only reachable if the request was crafted outside the form.
    errors.service = 'Please choose one of the listed services.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please tell us about your project.';
  } else if (values.message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = `A little more detail helps: ${MESSAGE_MIN_LENGTH} characters minimum.`;
  }

  return errors;
}

export function isValid(errors: ContactFormErrors): boolean {
  return Object.values(errors).every((message) => !message);
}

/** Narrows unknown JSON (an API request body) to the form shape. */
export function coerceContactForm(input: unknown): ContactFormValues {
  const source = (input ?? {}) as Partial<
    Record<keyof ContactFormValues, unknown>
  >;
  const read = (key: keyof ContactFormValues) =>
    typeof source[key] === 'string' ? (source[key] as string) : '';

  return {
    name: read('name'),
    email: read('email'),
    company: read('company'),
    phone: read('phone'),
    service: read('service'),
    message: read('message'),
  };
}

export const CONTACT_SUCCESS_MESSAGE =
  "Thank you! Your message has been sent successfully. We'll get back to you soon.";

/** Fallback shown when the request fails, pointing at the published address. */
export function contactFailureMessage(email: string): string {
  return `That did not send. Please try again, or email ${email} directly.`;
}

/** Subject line for the notification email. */
export const CONTACT_EMAIL_SUBJECT = 'New Project Inquiry — Nexoffice';
