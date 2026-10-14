import {
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Handshake,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Send,
  X,
  type LucideIcon,
} from 'lucide-react';
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { sendContactMessage, type ContactMessage } from '../../services/contactService';
import './ContactPage.scss';

type ContactField = keyof ContactMessage;
type FormErrors = Partial<Record<ContactField, string>>;
type IconTone = 'green' | 'violet' | 'orange' | 'amber';

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
  tone: IconTone;
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

const subjectOptions: Array<{ value: string; label: string; icon: LucideIcon; tone: IconTone }> = [
  { value: 'general', label: 'General inquiry', icon: MessageSquare, tone: 'orange' },
  { value: 'partnership', label: 'Partnership opportunity', icon: Handshake, tone: 'green' },
  { value: 'support', label: 'Technical support', icon: CircleAlert, tone: 'violet' },
  { value: 'feedback', label: 'Feedback or suggestion', icon: Lightbulb, tone: 'amber' },
];

type SubjectSelectProps = {
  id: string;
  labelId: string;
  value: string;
  placeholder: string;
  invalid: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

function SubjectSelect({ id, labelId, value, placeholder, invalid, describedBy, onChange, onBlur }: SubjectSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeaheadRef = useRef({ query: '', timer: 0 });
  const listboxId = `${id}-listbox`;
  const lastIndex = subjectOptions.length - 1;
  const selectedIndex = subjectOptions.findIndex((option) => option.value === value);
  const selected = subjectOptions[selectedIndex];
  const activeOption = isOpen ? subjectOptions[activeIndex] : undefined;

  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, activeIndex]);

  useEffect(() => () => window.clearTimeout(typeaheadRef.current.timer), []);

  const open = (index = Math.max(selectedIndex, 0)) => {
    setActiveIndex(index);
    setIsOpen(true);
    triggerRef.current?.focus();
  };

  const commit = (index: number) => {
    const option = subjectOptions[index];
    if (option) onChange(option.value);
    setIsOpen(false);
  };

  const findTypeaheadMatch = (key: string) => {
    const typeahead = typeaheadRef.current;
    window.clearTimeout(typeahead.timer);
    typeahead.query += key.toLowerCase();
    typeahead.timer = window.setTimeout(() => { typeahead.query = ''; }, 500);

    const current = isOpen ? activeIndex : selectedIndex;
    const start = typeahead.query.length === 1 ? current + 1 : Math.max(current, 0);
    for (let step = 0; step < subjectOptions.length; step += 1) {
      const index = (start + step) % subjectOptions.length;
      if (subjectOptions[index]?.label.toLowerCase().startsWith(typeahead.query)) return index;
    }
    return -1;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event;

    if (key.length === 1 && key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const match = findTypeaheadMatch(key);
      const option = subjectOptions[match];
      if (!option) return;
      if (isOpen) setActiveIndex(match);
      else onChange(option.value);
      return;
    }

    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
        event.preventDefault();
        open(key === 'ArrowUp' && selectedIndex < 0 ? lastIndex : undefined);
      }
      return;
    }

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, lastIndex));
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (event.altKey) commit(activeIndex);
        else setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case 'Home':
      case 'PageUp':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
      case 'PageDown':
        event.preventDefault();
        setActiveIndex(lastIndex);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        commit(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={`form-field__select${isOpen ? ' is-open' : ''}`}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className="form-field__select-trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-activedescendant={activeOption ? `${id}-option-${activeOption.value}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
        onKeyUp={(event) => { if (event.key === ' ') event.preventDefault(); }}
        onBlur={() => { setIsOpen(false); onBlur(); }}
      >
        {selected ? (
          <>
            <span className={`contact-icon contact-icon--sm contact-icon--${selected.tone}`}><selected.icon aria-hidden="true" /></span>
            <span className="form-field__select-value">{selected.label}</span>
          </>
        ) : (
          <span className="form-field__select-value form-field__select-value--placeholder">{placeholder}</span>
        )}
        <ChevronDown className="form-field__select-icon" aria-hidden="true" />
      </button>

      <ul
        ref={listRef}
        id={listboxId}
        className="form-field__select-menu"
        role="listbox"
        aria-labelledby={labelId}
        tabIndex={-1}
        onMouseDown={(event) => event.preventDefault()}
      >
        {subjectOptions.map(({ value: optionValue, label, icon: Icon, tone }, index) => (
          <li
            key={optionValue}
            id={`${id}-option-${optionValue}`}
            className={`form-field__select-option${index === activeIndex ? ' is-active' : ''}`}
            role="option"
            aria-selected={optionValue === value}
            onMouseMove={() => { if (index !== activeIndex) setActiveIndex(index); }}
            onClick={() => commit(index)}
          >
            <span className={`contact-icon contact-icon--sm contact-icon--${tone}`}><Icon aria-hidden="true" /></span>
            <span>{label}</span>
            {optionValue === value && <Check className="form-field__select-check" aria-hidden="true" />}
          </li>
        ))}
      </ul>
      <input type="hidden" name="subject" value={value} />
    </div>
  );
}

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
  const [isSubjectFlashing, setIsSubjectFlashing] = useState(false);
  const subjectFlashTimerRef = useRef<number | undefined>(undefined);
  const subjectFlashFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => () => {
    window.clearTimeout(subjectFlashTimerRef.current);
    window.cancelAnimationFrame(subjectFlashFrameRef.current ?? 0);
  }, []);

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

  const flashSubjectField = () => {
    window.clearTimeout(subjectFlashTimerRef.current);
    window.cancelAnimationFrame(subjectFlashFrameRef.current ?? 0);
    setIsSubjectFlashing(false);
    subjectFlashFrameRef.current = window.requestAnimationFrame(() => {
      setIsSubjectFlashing(true);
      subjectFlashTimerRef.current = window.setTimeout(() => setIsSubjectFlashing(false), 1800);
    });
  };

  const selectHelpSubject = (subject: string) => {
    updateField('subject', subject);
    flashSubjectField();
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

          <div className={`form-field${isSubjectFlashing ? ' form-field--subject-flash' : ''}`}>
            <label htmlFor="subject" id="subject-label">Subject</label>
            <SubjectSelect
              id="subject"
              labelId="subject-label"
              value={form.subject}
              placeholder="How can we help?"
              invalid={Boolean(errors.subject)}
              describedBy={errors.subject ? 'subject-error' : undefined}
              onChange={(value) => updateField('subject', value)}
              onBlur={() => validateField('subject')}
            />
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
