import { loadWebsiteContent } from '@/lib/portfolio';
import { indexCustomCss } from './styles/indexCustomCss';
import HomePageClient from './HomePageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const result = await loadWebsiteContent();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: indexCustomCss }} />
      <HomePageClient initialContent={result.content} />
    </>
  );
}
