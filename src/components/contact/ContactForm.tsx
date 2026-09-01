import { type SubmitEventHandler, useEffect, useRef, useState } from 'react';
import { Check, LoaderCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme: 'light';
          action: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
          'error-callback': () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | undefined>(undefined);
  const configuredSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const siteKey = configuredSiteKey || (import.meta.env.DEV ? TURNSTILE_TEST_SITE_KEY : '');

  useEffect(() => {
    if (!siteKey) return;

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainer.current || turnstileWidgetId.current) return;
      turnstileWidgetId.current = window.turnstile.render(turnstileContainer.current, {
        sitekey: siteKey,
        theme: 'light',
        action: 'contact',
        callback: setTurnstileToken,
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile-script]');
    if (window.turnstile) {
      renderWidget();
      return;
    }

    if (existing) {
      existing.addEventListener('load', renderWidget, { once: true });
      return () => existing.removeEventListener('load', renderWidget);
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = 'true';
    script.addEventListener('load', renderWidget, { once: true });
    document.head.append(script);

    return () => script.removeEventListener('load', renderWidget);
  }, [siteKey]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (!turnstileToken) {
      setState('error');
      setFeedback('Please complete the anti-spam check, then try again.');
      return;
    }

    setState('sending');
    setFeedback('Sending your message…');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          companyWebsite: formData.get('companyWebsite'),
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Message could not be sent');
      }

      form.reset();
      window.turnstile?.reset(turnstileWidgetId.current);
      setTurnstileToken('');
      setState('success');
      setFeedback('Message sent. I’ll get back to you soon!');
    } catch {
      setState('error');
      setFeedback('The message could not be sent right now. Please email me directly instead.');
      window.turnstile?.reset(turnstileWidgetId.current);
      setTurnstileToken('');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="contact-name">
          <span>Name</span>
          <Input id="contact-name" name="name" autoComplete="name" minLength={2} maxLength={80} required />
        </label>
        <label htmlFor="contact-email">
          <span>Email</span>
          <Input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
      </div>

      <label htmlFor="contact-subject">
        <span>Subject</span>
        <Input id="contact-subject" name="subject" minLength={3} maxLength={120} required />
      </label>

      <label htmlFor="contact-message">
        <span>Message</span>
        <Textarea id="contact-message" name="message" minLength={20} maxLength={3000} rows={7} required />
      </label>

      <label className="honeypot" aria-hidden="true">
        Company website
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>

      {siteKey ? (
        <div className="turnstile-wrap">
          <div ref={turnstileContainer} className="turnstile-widget" />
        </div>
      ) : (
        <p className="form-config-note">
          Add the Turnstile site key in Vercel before enabling this form.
        </p>
      )}

      <div className="form-submit-row">
        <p className={`form-feedback is-${state}`} aria-live="polite">
          {feedback}
        </p>
        <button className="button button-primary submit-button" type="submit" disabled={state === 'sending' || !siteKey}>
          {state === 'sending' ? (
            <LoaderCircle className="spin" aria-hidden="true" />
          ) : state === 'success' ? (
            <Check aria-hidden="true" />
          ) : (
            <Send aria-hidden="true" />
          )}
          {state === 'sending' ? 'Sending' : state === 'success' ? 'Sent' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
