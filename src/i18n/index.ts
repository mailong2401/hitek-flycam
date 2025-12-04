import vi from './locales/vi.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import kr from './locales/kr.json';

export type Language = 'vi' | 'en' | 'ja' | 'kr';

export const translations = {
  vi,
  en,
  ja,
  kr,
} as const;

export type TranslationKey = FlattenObject<typeof vi>;

// Utility type để lấy tất cả keys dạng flattened
type FlattenObject<T extends object> = {
  [K in keyof T]: T[K] extends object 
    ? `${K & string}.${FlattenObject<T[K]> & string}`
    : K
}[keyof T];
