import { getDictionary } from '@/shared/i18n';
import { BasePageProps } from '@/shared/types';

export default async function Home({ params: { lang } }: BasePageProps) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {dictionary.title_hello}
    </main>
  );
}
