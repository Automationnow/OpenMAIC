import { supportedLocales } from './locales';

export type Locale = (typeof supportedLocales)[number]['code'];

// Default locale set to English for Automation Now, LLC deployment.
// Users can still switch language via the language switcher in the UI.
export const defaultLocale: Locale = 'en-US';
