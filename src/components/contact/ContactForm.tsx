'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState, type FormEvent } from 'react';
import { FormField } from '@/components/contact/FormField';
import { Button } from '@/components/ui/Button';
import { REVEAL_VIEWPORT, revealVariants } from '@/components/ui/Reveal';
import { site } from '@/data/site';
import {
  contactFailureMessage,
  CONTACT_SUCCESS_MESSAGE,
  emptyContactErrors,
  emptyContactForm,
  isValid,
  SERVICE_OPTIONS,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '@/lib/contact-form';
import { cn } from '@/lib/utils';

type Status = { tone: 'success' | 'error'; message: string } | null;

/** Field order used to focus the first invalid control after a failed submit. */
const FIELD_IDS: Record<keyof ContactFormValues, string> = {
  name: 'contact-name',
  email: 'contact-email',
  company: 'contact-company',
  phone: 'contact-phone',
  service: 'contact-service',
  message: 'contact-message',
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactFormErrors>(emptyContactErrors);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const reduceMotion = useReducedMotion();

  /**
   * Guards against duplicate submissions. The disabled button covers the
   * common case, but `disabled` only takes effect after a re-render — a fast
   * double-click or a repeated Enter keypress can dispatch twice before that.
   * A ref flips synchronously, so the second submit is dropped outright.
   */
  const inFlight = useRef(false);

  const setField = (key: keyof ContactFormValues) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear this field's error as soon as it is edited; it is re-checked on
    // the next submit.
    setErrors((current) =>
      current[key] ? { ...current, [key]: '' } : current,
    );
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inFlight.current) return;

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (!isValid(nextErrors)) {
      setStatus(null);

      const firstInvalid = (
        Object.keys(FIELD_IDS) as Array<keyof ContactFormValues>
      ).find((key) => nextErrors[key]);

      if (firstInvalid) {
        document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      }
      return;
    }

    inFlight.current = true;
    setSending(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setValues(emptyContactForm);
      setErrors(emptyContactErrors);
      setStatus({ tone: 'success', message: CONTACT_SUCCESS_MESSAGE });
    } catch {
      setStatus({ tone: 'error', message: contactFailureMessage(site.email) });
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return (
    <motion.form
      variants={revealVariants()}
      initial={reduceMotion ? undefined : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={REVEAL_VIEWPORT}
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-3xl border border-white/[0.1] bg-white/[0.045] p-[clamp(22px,3vw,34px)] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <FormField
          id="contact-name"
          name="name"
          label="Name"
          placeholder="Ayesha Siddiqui"
          autoComplete="name"
          value={values.name}
          onChange={setField('name')}
          error={errors.name}
        />
        <FormField
          id="contact-email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@company.com"
          autoComplete="email"
          value={values.email}
          onChange={setField('email')}
          error={errors.email}
        />
        <FormField
          id="contact-company"
          name="company"
          label="Company"
          placeholder="Company name"
          autoComplete="organization"
          value={values.company}
          onChange={setField('company')}
          error={errors.company}
        />
        <FormField
          id="contact-phone"
          name="phone"
          type="tel"
          label="Phone"
          placeholder="+92 300 0000000"
          autoComplete="tel"
          value={values.phone}
          onChange={setField('phone')}
          error={errors.phone}
        />
      </div>

      <FormField
        id="contact-service"
        name="service"
        label="Service Needed"
        placeholder="Select a service"
        options={SERVICE_OPTIONS}
        value={values.service}
        onChange={setField('service')}
        error={errors.service}
      />

      <FormField
        id="contact-message"
        name="message"
        label="Project Details"
        rows={5}
        placeholder="What are you building, and what does success look like in six months?"
        value={values.message}
        onChange={setField('message')}
        error={errors.message}
      />

      <Button type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send message'}
      </Button>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          'min-h-[20px] text-[13px] leading-[1.6]',
          status?.tone === 'error' ? 'text-danger' : 'text-success',
        )}
      >
        {status?.message}
      </p>
    </motion.form>
  );
}
