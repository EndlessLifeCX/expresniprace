'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import './ContactForm.scss';

// Schema for "Looking for a job" form (no company name)
const jobSeekerSchema = z.object({
  formType: z.literal('jobSeeker'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(9, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  suggestion: z.string().min(10, 'Suggestion must be at least 10 characters'),
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy',
  }),
});

// Schema for "Request personnel" form (includes company name)
const employerSchema = z.object({
  formType: z.literal('employer'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(9, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  suggestion: z.string().min(10, 'Suggestion must be at least 10 characters'),
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy',
  }),
});

// Union schema
const contactSchema = z.discriminatedUnion('formType', [
  jobSeekerSchema,
  employerSchema,
]);

type ContactFormData = z.infer<typeof contactSchema>;
type FormType = 'jobSeeker' | 'employer';

export default function ContactForm() {
  const t = useTranslations();
  const locale = useLocale();
  const [formType, setFormType] = useState<FormType>('jobSeeker');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      formType: 'jobSeeker',
      agreeToPrivacy: false as any,
    },
  });

  const handleFormTypeChange = (newFormType: FormType) => {
    setFormType(newFormType);
    setValue('formType', newFormType);
    // Reset form when switching types
    reset({
      formType: newFormType,
      fullName: '',
      phoneNumber: '',
      email: '',
      companyName: '',
      suggestion: '',
      agreeToPrivacy: false as any,
    });
    setSubmitStatus('idle');
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset({
          formType: data.formType,
          fullName: '',
          phoneNumber: '',
          email: '',
          companyName: '',
          suggestion: '',
          agreeToPrivacy: false as any,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id='contact'>
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>

        {/* Form Type Switcher */}
        <div className="form-type-switcher">
          <button
            type="button"
            className={`switcher-btn ${formType === 'jobSeeker' ? 'active' : ''}`}
            onClick={() => handleFormTypeChange('jobSeeker')}
          >
            {t('contact.formType.jobSeeker')}
          </button>
          <button
            type="button"
            className={`switcher-btn ${formType === 'employer' ? 'active' : ''}`}
            onClick={() => handleFormTypeChange('employer')}
          >
            {t('contact.formType.employer')}
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('formType')} />

          <div className="form-group">
            <label htmlFor="fullName">{t('contact.form.fullName')}</label>
            <input
              type="text"
              id="fullName"
              {...register('fullName')}
              className={errors.fullName ? 'error' : ''}
              placeholder={t('contact.form.fullNamePlaceholder')}
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">{t('contact.form.phoneNumber')}</label>
            <input
              type="tel"
              id="phoneNumber"
              {...register('phoneNumber')}
              className={errors.phoneNumber ? 'error' : ''}
              placeholder={t('contact.form.phoneNumberPlaceholder')}
            />
            {errors.phoneNumber && (
              <span className="error-message">{errors.phoneNumber.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('contact.form.email')}</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={errors.email ? 'error' : ''}
              placeholder={t('contact.form.emailPlaceholder')}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          {formType === 'employer' && (
            <div className="form-group">
              <label htmlFor="companyName">{t('contact.form.companyName')}</label>
              <input
                type="text"
                id="companyName"
                {...register('companyName')}
                className={'companyName' in errors && errors.companyName ? 'error' : ''}
                placeholder={t('contact.form.companyNamePlaceholder')}
              />
              {'companyName' in errors && errors.companyName && (
                <span className="error-message">{errors.companyName.message}</span>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="suggestion">{t('contact.form.suggestion')}</label>
            <textarea
              id="suggestion"
              rows={5}
              {...register('suggestion')}
              className={errors.suggestion ? 'error' : ''}
              placeholder={t('contact.form.suggestionPlaceholder')}
            />
            {errors.suggestion && (
              <span className="error-message">{errors.suggestion.message}</span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register('agreeToPrivacy')}
                className={errors.agreeToPrivacy ? 'error' : ''}
              />
              <span>
                {t('contact.form.privacyText')}{' '}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                  {t('contact.form.privacyLink')}
                </a>
              </span>
            </label>
            {errors.agreeToPrivacy && (
              <span className="error-message">{errors.agreeToPrivacy.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
          </button>

          {submitStatus === 'success' && (
            <div className="status-message success">
              {t('contact.form.success')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="status-message error">
              {t('contact.form.error')}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
