import { Locale } from '@/shared/i18n';

export interface BasePageProps {
  params: {
    lang: Locale;
  };
}

export interface ClassNameProp {
  className?: string;
}
