import vi from './locales/vi.json';
import en from './locales/en.json';

export type Language = 'vi' | 'en';

export const translations = {
  vi,
  en,
} as const;

// Simplified type - accept any string to avoid deep recursion issues
export type TranslationKey = string;
