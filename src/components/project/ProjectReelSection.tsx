'use client'

import { useMemo, useState, useSyncExternalStore } from 'react';
import type { ProjectReelItem, ProjectReelSection as ProjectReelSectionData } from '@/lib/portfolio';

type ProjectReelSectionProps = {
  reelSection?: ProjectReelSectionData;
};

export default function ProjectReelSection({ reelSection }: ProjectReelSectionProps) {
  const [failedVideoIds, setFailedVideoIds] = useState<Record<string, boolean>>({});

  const visibleReels = useMemo(
    () => (reelSection?.items ?? [])
      .filter((item) => item.enabled !== false)
      .filter((item) => Boolean(item.videoUrl?.trim()))
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
    [reelSection?.items]
  );

  const sectionTitle = reelSection?.title?.trim() || '';
  const sectionDescription = reelSection?.description?.trim() || '';
  const hasSectionIntro = Boolean(sectionTitle || sectionDescription);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (!reelSection?.enabled || visibleReels.length === 0) {
    return null;
  }

  return (
    <section className="project-reel-section" aria-label={sectionTitle || 'Project reels'}>
      <div className="project-reel-inner">
        {hasSectionIntro && (
          <div className="project-reel-content rv">
            {sectionTitle && <h2 className="project-reel-title">{sectionTitle}</h2>}
            {sectionDescription && <p className="project-reel-description">{sectionDescription}</p>}
          </div>
        )}

        <div className="project-reel-grid" data-disable-project-swipe>
          {visibleReels.map((reel) => (
            <ProjectReelItemCard
              key={reel.id}
              reel={reel}
              hasError={Boolean(failedVideoIds[reel.id])}
              prefersReducedMotion={prefersReducedMotion}
              onError={() => setFailedVideoIds((current) => ({ ...current, [reel.id]: true }))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type ProjectReelItemCardProps = {
  reel: ProjectReelItem;
  hasError: boolean;
  prefersReducedMotion: boolean;
  onError: () => void;
};

function ProjectReelItemCard({ reel, hasError, prefersReducedMotion, onError }: ProjectReelItemCardProps) {
  const videoUrl = reel.videoUrl?.trim() || '';
  const title = reel.title?.trim() || '';
  const description = reel.description?.trim() || '';
  const posterUrl = reel.posterUrl?.trim() || '';
  const shouldAutoplay = Boolean(reel.autoplay && !prefersReducedMotion);
  const shouldMute = Boolean(reel.muted || shouldAutoplay);
  const canvasStyle = useMemo(
    () => (hasError && posterUrl ? { backgroundImage: `url(${posterUrl})` } : undefined),
    [hasError, posterUrl]
  );

  return (
    <article className="project-reel-item rv">
      {(title || description) && (
        <div className="project-reel-item-copy">
          {title && <h3 className="project-reel-item-title">{title}</h3>}
          {description && <p className="project-reel-item-description">{description}</p>}
        </div>
      )}

      <div className="project-reel-canvas" style={canvasStyle} data-disable-project-swipe>
        {!hasError ? (
          <video
            key={videoUrl}
            className="project-reel-video"
            src={videoUrl}
            poster={posterUrl || undefined}
            controls
            playsInline
            preload="metadata"
            loop={Boolean(reel.loop)}
            muted={shouldMute}
            autoPlay={shouldAutoplay}
            aria-label={title || 'Project reel video'}
            onError={onError}
          />
        ) : (
          <div className="project-reel-error" role="status">
            This project reel is currently unavailable.
          </div>
        )}
      </div>
    </article>
  );
}

const getReducedMotionSnapshot = () => (
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

const getReducedMotionServerSnapshot = () => false;

const subscribeToReducedMotion = (callback: () => void) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);

  return () => mediaQuery.removeEventListener('change', callback);
};
