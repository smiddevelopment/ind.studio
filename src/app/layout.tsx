import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { SuisseIntl } from '@/shared/fonts';
import { Locale } from '@/shared/i18n';
import { BasePageProps } from '@/shared/types';

import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return [{ lang: 'en' satisfies Locale }, { lang: 'ru' satisfies Locale }];
}

export default function RootLayout({
  children,
  params: { lang },
}: BasePageProps & PropsWithChildren) {
  return (
    <html lang={lang}>
      <body className={SuisseIntl.className}>{children}</body>
    </html>
  );
}
