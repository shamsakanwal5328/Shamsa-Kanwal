"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MailIcon } from "@/components/Icons";

const MIN_FILL_TIME_MS = 3000;

const fieldClass =
  "mt-1.5 block w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-base text-ink placeholder:text-muted focus:border-secondary";

type Status = { kind: "idle" } | { kind: "sent" } | { kind: "blocked" };

/**
 * No email backend is configured, so the form composes a message in the
 * visitor's own email app via mailto:. Spam protection: a hidden honeypot
 * field and a minimum fill time, both of which bots commonly fail.
 */
export default function ContactForm({ recipient }: { recipient: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (form.get("website") || Date.now() - startedAt.current < MIN_FILL_TIME_MS) {
      setStatus({ kind: "blocked" });
      return;
    }

    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const subject = String(form.get("subject")).trim();
    const message = String(form.get("message")).trim();
    const body = `${message}\n\n— ${name}\n${email}`;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "sent" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-describedby="contact-form-note">
      <p id="contact-form-note" className="text-[15px] text-muted">
        All fields are required. Sending opens your own email app with the message ready to review.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="font-semibold">
            Name
          </label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={120} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className="font-semibold">
            Email
          </label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="font-semibold">
          Subject
        </label>
        <input id="contact-subject" name="subject" type="text" required maxLength={160} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="contact-message" className="font-semibold">
          Message
        </label>
        <textarea id="contact-message" name="message" rows={6} required maxLength={4000} className={fieldClass} />
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        <MailIcon className="text-lg" />
        Send message
      </button>

      <p role="status" aria-live="polite" className="text-[15px]">
        {status.kind === "sent" && (
          <span className="text-success">
            Your email app should now open with the message. If it does not, please write to{" "}
            <a href={`mailto:${recipient}`} className="font-semibold underline underline-offset-4">
              {recipient}
            </a>
            .
          </span>
        )}
        {status.kind === "blocked" && (
          <span className="text-ink">The message could not be prepared. Please wait a moment and try again.</span>
        )}
      </p>
    </form>
  );
}
