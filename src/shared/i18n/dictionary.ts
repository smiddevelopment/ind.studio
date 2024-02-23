import { Locale } from '.';
import 'server-only';

const dictionaries = {
  en: () => import('./dictionary.en.json').then(module => module.default),
  ru: () => import('./dictionary.ru.json').then(module => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]?.() ?? dictionaries.en();
}
