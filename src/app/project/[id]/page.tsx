import { getPublishedProjects, loadWebsiteContent, fallbackPortfolioProjects } from '@/lib/portfolio';
import { projectCustomCss } from '../../styles/projectCustomCss';
import ProjectPageClient from './ProjectPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id || 'websites';

  const result = await loadWebsiteContent();
  const allProjects = getPublishedProjects(result.content.projects.length ? result.content.projects : fallbackPortfolioProjects);
  const matchedProject = allProjects.find(item => item.id === id) || null;
  const project = matchedProject || fallbackPortfolioProjects.find(item => item.id === id) || null;

  if (process.env.NODE_ENV !== 'production') {
    console.log(
      'Project page allProjects:',
      allProjects.map((item) => ({
        id: item.id,
        title: item.title,
        status: item.status,
        sequence: item.sequence,
      }))
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: projectCustomCss }} />
      <ProjectPageClient
        key={project?.id || id}
        allProjects={allProjects}
        categories={result.content.categories}
        id={id}
        project={project}
      />
    </>
  );
}
