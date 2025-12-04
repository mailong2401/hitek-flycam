// types/contact.ts
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
