import { loadWebsiteContent, fallbackPortfolioProjects } from '@/lib/portfolio';
import ProjectPageClient from './ProjectPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id || 'websites';

  const result = await loadWebsiteContent();
  const matchedProject = result.content.projects.find(item => item.id === id) || null;
  const project = matchedProject || fallbackPortfolioProjects.find(item => item.id === id) || null;

  return (
    <ProjectPageClient
      initialProjects={result.content.projects}
      initialProject={project}
      id={id}
    />
  );
}
