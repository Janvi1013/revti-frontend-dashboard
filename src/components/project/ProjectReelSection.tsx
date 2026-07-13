'use client'

import { useMemo, useState, useSyncExternalStore } from 'react';
import type { ProjectReelSection as ProjectReelSectionData } from '@/lib/portfolio';

type ProjectReelSectionProps = {
  reel?: ProjectReelSectionData;
};

export default function ProjectReelSection({ reel }: ProjectReelSectionProps) {
  const [failedVideoUrl, setFailedVideoUrl] = useState('');

  const videoUrl = reel?.videoUrl?.trim() || '';
  const title = reel?.title?.trim() || '';
  const description = reel?.description?.trim() || '';
  const posterUrl = reel?.posterUrl?.trim() || '';
  const hasTextContent = Boolean(title || description);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const hasError = Boolean(videoUrl && failedVideoUrl === videoUrl);

  const shouldAutoplay = Boolean(reel?.autoplay && !prefersReducedMotion);
  const shouldMute = Boolean(reel?.muted || shouldAutoplay);
  const canvasStyle = useMemo(
    () => (hasError && posterUrl ? { backgroundImage: `url(${posterUrl})` } : undefined),
    [hasError, posterUrl]
  );

  if (!reel?.enabled || !videoUrl) {
    return null;
  }

  return (
    <section className="project-reel-section" aria-label={title || 'Project reel'}>
      <div className={`project-reel-inner${hasTextContent ? '' : ' project-reel-inner--media-only'}`}>
        {hasTextContent && (
          <div className="project-reel-content rv">
            {title && <h2 className="project-reel-title">{title}</h2>}
            {description && <p className="project-reel-description">{description}</p>}
          </div>
        )}

        <div className="project-reel-canvas rv" style={canvasStyle}>
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
              onError={() => setFailedVideoUrl(videoUrl)}
            />
          ) : (
            <div className="project-reel-error" role="status">
              This project reel is currently unavailable.
            </div>
          )}
        </div>
      </div>
    </section>
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
