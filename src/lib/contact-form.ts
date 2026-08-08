/**
 * Contact form contract, shared by the client form and the API route so the
 * two can never drift. The rules and copy are taken verbatim from the design's
 * component script.
 */

export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export type ContactFormErrors = Record<keyof ContactFormValues, string>;

export const emptyContactForm: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
};

export const emptyContactErrors: ContactFormErrors = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\-\s\d]{7,20}$/;

export const MESSAGE_MIN_LENGTH = 20;

/**
 * Returns an error map with one entry per field; an empty string means the
 * field is valid. Use `isValid` to collapse the map to a boolean.
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

  if (!values.company.trim()) {
    errors.company = 'Please enter your company.';
  }

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Use digits, spaces, or +().';
  }

  if (values.message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = `A little more detail helps: ${MESSAGE_MIN_LENGTH} characters minimum.`;
  }

  return errors;
}

export function isValid(errors: ContactFormErrors): boolean {
  return Object.values(errors).every((message) => !message);
}

/** Narrows unknown JSON (an API request body) to the form shape. */
export function coerceContactForm(input: unknown): ContactFormValues {
  const source = (input ?? {}) as Partial<Record<keyof ContactFormValues, unknown>>;
  const read = (key: keyof ContactFormValues) =>
    typeof source[key] === 'string' ? (source[key] as string) : '';

  return {
    name: read('name'),
    email: read('email'),
    company: read('company'),
    phone: read('phone'),
    message: read('message'),
  };
}

export const CONTACT_SUCCESS_MESSAGE =
  'Thanks — your brief is with us. We reply within one business day.';

/** Fallback shown when the request fails, pointing at the published address. */
export function contactFailureMessage(email: string): string {
  return `That did not send. Please try again, or email ${email} directly.`;
}
