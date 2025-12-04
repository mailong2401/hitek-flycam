// components/contact/ContactForm.tsx
"use client";

import { useState } from 'react';
import ContactFormFields from './ContactFormFields';
import ContactInfo from './ContactInfo';
import FormStatus from './FormStatus';
import SubmitButton from './SubmitButton';
import { ContactFormData } from '@/types/contact';
import { sendContactEmail } from '@/utils/emailService';

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('loading');

    try {
      console.log('🔄 Submitting form...');
      
      // Gửi email qua Supabase Edge Function
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({ 
          name: '', 
          company: '', 
          email: '', 
          phone: '', 
          service: '', 
          location: '', 
          message: '' 
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('❌ Form submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Gửi tin nhắn
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ContactFormFields 
            formData={formData} 
            onChange={handleChange} 
          />

          <FormStatus status={submitStatus} />
          <SubmitButton isLoading={isLoading} />
        </form>
      </div>

      {/* Contact Information */}
      <ContactInfo />
    </div>
  );
};

export default ContactForm;
