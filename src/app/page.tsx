import { loadWebsiteContent } from '@/lib/portfolio';
import HomePageClient from './HomePageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const result = await loadWebsiteContent();
  return <HomePageClient initialContent={result.content} />;
}
