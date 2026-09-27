import {
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Send,
  X,
  type LucideIcon,
} from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { sendContactMessage, type ContactMessage } from '../../services/contactService';
import './ContactPage.scss';

type ContactField = keyof ContactMessage;
type FormErrors = Partial<Record<ContactField, string>>;

const initialForm: ContactMessage = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
};

const helpOptions: Array<{
  title: string;
  description: string;
  subject: string;
  icon: LucideIcon;
  tone: 'green' | 'violet' | 'orange';
}> = [
  {
    title: 'Partnership Inquiry',
    description: 'Explore partnership opportunities for your church, ministry, or organization.',
    subject: 'partnership',
    icon: Handshake,
    tone: 'green',
  },
  {
    title: 'Report an Issue',
    description: 'Found a bug or having trouble? Let us know and we’ll help you resolve it.',
    subject: 'support',
    icon: CircleAlert,
    tone: 'violet',
  },
  {
    title: 'General Inquiries',
    description: 'Have a question about FaithLink? We’re happy to help.',
    subject: 'general',
    icon: MessageSquare,
    tone: 'orange',
  },
];

function validateForm(values: ContactMessage): FormErrors {
  const errors: FormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (values.fullName.trim().length < 2) errors.fullName = 'Enter your full name.';
  if (!emailPattern.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.subject) errors.subject = 'Choose a subject.';
  if (values.message.trim().length < 20) errors.message = 'Your message must contain at least 20 characters.';

  return errors;
}

export function ContactPage() {
  const [form, setForm] = useState<ContactMessage>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isSuccessOpen && !dialog.open) dialog.showModal();
    if (!isSuccessOpen && dialog.open) dialog.close();
  }, [isSuccessOpen]);

  const updateField = (field: ContactField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError('');
  };

  const validateField = (field: ContactField) => {
    const fieldError = validateForm(form)[field];
    setErrors((current) => ({ ...current, [field]: fieldError }));
  };

  const selectHelpSubject = (subject: string) => {
    updateField('subject', subject);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => formRef.current?.querySelector<HTMLTextAreaElement>('#message')?.focus(), 450);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0] as ContactField;
      window.setTimeout(() => document.getElementById(firstInvalidField)?.focus(), 0);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await sendContactMessage({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });
      setForm(initialForm);
      setErrors({});
      setIsSuccessOpen(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Your message could not be delivered. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-hero__content">
          <p className="contact-eyebrow contact-eyebrow--light">Get in touch</p>
          <h1 id="contact-title">Let’s Build a<br />Brighter Generation<br /><em>Together</em></h1>
          <p>Have questions, suggestions, or partnership opportunities? We’d love to hear from you.</p>
        </div>
        <p className="contact-hero__scribble" aria-hidden="true">Real People.<br />Stronger Together.<br />A Brighter Tomorrow.</p>
      </section>

      <section className="contact-methods" aria-label="Contact methods">
        <div className="contact-methods__grid">
          <a className="contact-method" href="mailto:enwafor008@gmail.com">
            <span className="contact-icon contact-icon--green"><Mail aria-hidden="true" /></span>
            <span><strong>Email Us</strong><small>We typically respond within 24–48 hours.</small><b>enwafor008@gmail.com</b></span>
          </a>

          <a className="contact-method" href="https://wa.me/2347074474312" target="_blank" rel="noreferrer">
            <span className="contact-icon contact-icon--violet"><MessageCircle aria-hidden="true" /></span>
            <span><strong>WhatsApp Us</strong><small>Send us a message anytime.</small><b>07074474312</b></span>
          </a>

          <article className="contact-method">
            <span className="contact-icon contact-icon--orange"><MapPin aria-hidden="true" /></span>
            <span><strong>Our Location</strong><b className="contact-method__location">Lagos, Nigeria</b><small>Serving churches and young people across Africa and beyond.</small></span>
          </article>
        </div>
      </section>

      <section className="contact-content">
        <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
          <p className="contact-eyebrow">Send us a message</p>
          <h2>We’d Love to Hear From You</h2>
          <p className="contact-form__intro">Fill out the form below and our team will get back to you soon.</p>

          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Your full name" value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} onBlur={() => validateField('fullName')} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
            {errors.fullName && <span className="form-field__error" id="fullName-error">{errors.fullName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(event) => updateField('email', event.target.value)} onBlur={() => validateField('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <span className="form-field__error" id="email-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <select id="subject" name="subject" value={form.subject} onChange={(event) => updateField('subject', event.target.value)} onBlur={() => validateField('subject')} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined}>
              <option value="" disabled>How can we help?</option>
              <option value="general">General inquiry</option>
              <option value="partnership">Partnership opportunity</option>
              <option value="support">Technical support</option>
              <option value="feedback">Feedback or suggestion</option>
            </select>
            {errors.subject && <span className="form-field__error" id="subject-error">{errors.subject}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Share your message, questions, or ideas…" value={form.message} onChange={(event) => updateField('message', event.target.value)} onBlur={() => validateField('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
            {errors.message && <span className="form-field__error" id="message-error">{errors.message}</span>}
          </div>

          {submitError && <p className="contact-form__submit-error" role="alert">{submitError}</p>}

          <button className="contact-form__submit" type="submit" disabled={isSubmitting}>
            <Send aria-hidden="true" /> {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>

        <div className="contact-help">
          <p className="contact-eyebrow">Other ways to reach us</p>
          <h2>How We Can Help</h2>
          <p className="contact-help__intro">Whether you’re a church leader, a young person, or a potential partner, we’re here to support you.</p>

          <div className="contact-help__options">
            {helpOptions.map(({ title, description, subject, icon: Icon, tone }) => (
              <button key={title} type="button" onClick={() => selectHelpSubject(subject)}>
                <span className={`contact-icon contact-icon--${tone}`}><Icon aria-hidden="true" /></span>
                <span><strong>{title}</strong><small>{description}</small></span>
                <ChevronRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-quote" aria-label="Encouragement from Galatians">
        <span aria-hidden="true">“</span>
        <blockquote>Let us not grow weary in doing good, for in due season we will reap,<br />if we do not give up.</blockquote>
        <cite>Galatians 6:9 (NIV)</cite>
      </section>

      <dialog className="success-dialog" ref={dialogRef} onCancel={() => setIsSuccessOpen(false)} onClose={() => setIsSuccessOpen(false)}>
        <button type="button" className="success-dialog__close" onClick={() => setIsSuccessOpen(false)} aria-label="Close confirmation"><X aria-hidden="true" /></button>
        <span className="success-dialog__icon"><CircleCheck aria-hidden="true" /></span>
        <p>Message sent</p>
        <h2>Thank you for reaching out.</h2>
        <span>We’ve received your message and will get back to you as soon as possible.</span>
        <button type="button" className="success-dialog__done" onClick={() => setIsSuccessOpen(false)}>Done</button>
      </dialog>
    </main>
  );
}
