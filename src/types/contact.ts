export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  message: string;
}

export interface ContactInfoItem {
  icon: React.ComponentType;
  title: string;
  details: string[];
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at?: string;
  updated_at?: string;
}