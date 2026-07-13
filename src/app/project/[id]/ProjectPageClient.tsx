'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectReelSection from '@/components/project/ProjectReelSection';
import { submitEnquiry } from '@/lib/actions';
import { getPublishedProjects, loadWebsiteContent, normalizeFilterSlug, projectMatchesFilter, type PortfolioProject, fallbackPortfolioProjects } from '@/lib/portfolio';

const getProjectHref = (projectId: string, filter: string) => `/project/${projectId}?filter=${encodeURIComponent(filter || 'all')}`;

const isInteractiveSwipeTarget = (target: EventTarget | null) => (
  target instanceof Element &&
  Boolean(target.closest('video, button, a, input, textarea, select, [role="button"], [contenteditable="true"], [data-disable-project-swipe]'))
);

const isEditableKeyTarget = (target: EventTarget | null) => (
  target instanceof Element &&
  Boolean(target.closest('input, textarea, select, video, [contenteditable="true"]'))
);

export default function ProjectPageClient({
  initialProjects,
  initialProject,
  id
}: {
  initialProjects: PortfolioProject[];
  initialProject: PortfolioProject | null;
  id: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
  const [project, setProject] = useState<PortfolioProject | null>(initialProject);
  
  const [projectNotFound, setProjectNotFound] = useState(initialProject === null);
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isProjectNavigating, setIsProjectNavigating] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; enabled: boolean }>({ x: 0, y: 0, enabled: false });

  const rawFilter = searchParams.get('filter')?.trim() || 'all';
  const activeFilter = normalizeFilterSlug(rawFilter) || 'all';
  const allProjects = useMemo(() => getPublishedProjects(projects.length ? projects : fallbackPortfolioProjects), [projects]);
  const requestedProjects = useMemo(
    () => activeFilter === 'all' ? allProjects : allProjects.filter(item => projectMatchesFilter(item, activeFilter)),
    [activeFilter, allProjects]
  );
  const navigationProjects = useMemo(() => {
    if (!project) return requestedProjects.length ? requestedProjects : allProjects;
    const currentExists = requestedProjects.some(item => String(item.id) === String(project.id));
    return requestedProjects.length > 0 && currentExists ? requestedProjects : allProjects;
  }, [allProjects, project, requestedProjects]);
  const currentIndex = useMemo(
    () => project ? navigationProjects.findIndex(item => String(item.id) === String(project.id)) : -1,
    [navigationProjects, project]
  );
  const canNavigate = currentIndex >= 0 && navigationProjects.length > 1;
  const previousProject = canNavigate
    ? navigationProjects[(currentIndex - 1 + navigationProjects.length) % navigationProjects.length]
    : undefined;
  const nextProject = canNavigate
    ? navigationProjects[(currentIndex + 1) % navigationProjects.length]
    : undefined;
  const projectNavigation = useMemo(() => (
    canNavigate && previousProject && nextProject
      ? { previous: previousProject, next: nextProject, filter: activeFilter, currentIndex }
      : null
  ), [activeFilter, canNavigate, currentIndex, nextProject, previousProject]);

  useEffect(() => {
    console.log('Active filter:', activeFilter);
    console.log('Published IDs:', allProjects.map((item) => item.id));
    console.log('Filtered IDs:', requestedProjects.map((item) => item.id));
    console.log('Navigation IDs:', navigationProjects.map((item) => item.id));
    console.log('Current index:', currentIndex);
    console.log('Previous/Next IDs:', previousProject?.id, nextProject?.id);
    if (previousProject) console.log('Previous URL:', getProjectHref(previousProject.id, activeFilter));
    if (nextProject) console.log('Next URL:', getProjectHref(nextProject.id, activeFilter));
  }, [activeFilter, allProjects, currentIndex, navigationProjects, nextProject, previousProject, requestedProjects]);

  const navigateToProject = useCallback((targetProject: PortfolioProject | undefined) => {
    if (!targetProject || isProjectNavigating) return;

    setIsProjectNavigating(true);
    setIsMobileNavOpen(false);
    document.querySelectorAll('video').forEach(video => video.pause());
    const modal = document.getElementById('back-form-modal');
    modal?.classList.remove('open');
    document.body.style.overflow = '';

    router.push(getProjectHref(targetProject.id, activeFilter || 'all'), { scroll: true });
  }, [activeFilter, isProjectNavigating, router]);

  const goToPreviousProject = useCallback(() => navigateToProject(previousProject), [navigateToProject, previousProject]);
  const goToNextProject = useCallback(() => navigateToProject(nextProject), [navigateToProject, nextProject]);

  useEffect(() => {
    let active = true;
    let abortController: AbortController | null = null;
    setIsProjectNavigating(false);

    // Immediately try to find project in existing projects array or fallbacks to prevent flash of loading screen
    const foundProject = projects.find(item => item.id === id) || fallbackPortfolioProjects.find(item => item.id === id) || null;
    if (foundProject) {
      setProject(foundProject);
      setIsProjectLoading(false);
      setProjectNotFound(false);
    } else {
      setProject(null);
      setIsProjectLoading(true);
      setProjectNotFound(false);
    }

    async function loadProjectContent() {
      if (abortController) abortController.abort();
      abortController = new AbortController();
      const controller = abortController;
      setProjectError(null);
      
      try {
        const result = await loadWebsiteContent({ signal: controller.signal });
        if (!active || controller.signal.aborted) return;

        const nextProjects = result.ok ? result.content.projects : [];
        const matchedProject = nextProjects.find(item => item.id === id) || null;
        setProjects(nextProjects);
        
        if (matchedProject) {
          setProject(matchedProject);
          setProjectNotFound(false);
        } else if (!foundProject) {
          setProjectNotFound(true);
        }
        
        if (!result.ok) {
          setProjectError('Unable to load live website content.');
        }
      } finally {
        if (active) setIsProjectLoading(false);
      }
    }

    loadProjectContent();

    const handleFocus = () => loadProjectContent();
    const handleOnline = () => loadProjectContent();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);
    const refreshInterval = window.setInterval(loadProjectContent, 45000);

    return () => {
      active = false;
      if (abortController) abortController.abort();
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
      window.clearInterval(refreshInterval);
    };
  }, [id]);

  useEffect(() => {
    if (!project) return;
    const currentProject = project;
    // 1. GSAP ScrollTrigger register
    if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // GSAP timeline items
      gsap.utils.toArray('.tl-item').forEach((el: any, i: number) => {
        gsap.fromTo(el, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });

      // Left-to-right clipPath image reveal animation
      const revealContainers = document.querySelectorAll('.reveal-img-container');
      revealContainers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;

        gsap.set(container, { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' });
        gsap.set(img, { scale: 1.15 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

        tl.to(container, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.4,
          ease: 'power3.inOut'
        })
        .to(img, {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out'
        }, '-=1.4');
      });

      // GSAP reveal for impact cards
      const impactGrid = document.querySelector('.impact-card-grid');
      const impactCards = document.querySelectorAll('.impact-metric-card');
      if (impactGrid && impactCards.length) {
        gsap.fromTo(impactCards, { opacity: 0, y: 24, scale: 0.96 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: impactGrid, start: 'top 82%', once: true }
        });
      }
    }

    // 2. Custom Cursor
    const curDot = document.getElementById('cur-dot');
    const curRing = document.getElementById('cur-ring');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    if (curDot && curRing) {
      curDot.style.left = mx + 'px'; curDot.style.top = my + 'px';
      curRing.style.left = rx + 'px'; curRing.style.top = ry + 'px';

      const handleMouseMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;
        curDot.style.left = mx + 'px';
        curDot.style.top = my + 'px';
      };
      document.addEventListener('mousemove', handleMouseMove);

      let animId: number;
      const animCur = () => {
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        curRing.style.left = rx + 'px';
        curRing.style.top = ry + 'px';
        animId = requestAnimationFrame(animCur);
      };
      animCur();

      const hoverables = document.querySelectorAll('a, button, .reveal-img-container, .sim-card, .impact-metric-card, .ov-card, .tl-item, input, select, textarea, label, .check-item, .custom-checkbox, .modal-close, .modal-cancel-link');
      const addHoverCls = () => curRing.classList.add('h');
      const removeHoverCls = () => curRing.classList.remove('h');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', addHoverCls);
        el.addEventListener('mouseleave', removeHoverCls);
      });

      (window as any)._cleanupCursor = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animId);
        hoverables.forEach(el => {
          el.removeEventListener('mouseenter', addHoverCls);
          el.removeEventListener('mouseleave', removeHoverCls);
        });
      };
    }

    // 4. Scroll Prog & Nav toggle
    const pg = document.getElementById('prog');
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      if (pg) {
        pg.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
      }
      if (nav) {
        nav.classList.toggle('sc', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 8. Lightbox Setup
    const galMeta = (currentProject.gallery.length ? currentProject.gallery : [currentProject.image].filter(Boolean)).map((src, index) => ({ src: src as string, l: `Brand Asset ${index + 1}` }));
    let lbIdx = 0;
    function openLb(i: number) {
      lbIdx = i;
      const img = document.getElementById('lb-img') as HTMLImageElement;
      if (!img) return;
      img.src = galMeta[i].src;
      img.alt = currentProject.title + ' — ' + galMeta[i].l;
      const labelEl = document.getElementById('lb-label');
      if (labelEl) labelEl.textContent = currentProject.title + ' — ' + galMeta[i].l;
      const ctrEl = document.getElementById('lb-ctr');
      if (ctrEl) ctrEl.textContent = (i + 1) + ' / ' + galMeta.length;
      const lbEl = document.getElementById('lb');
      if (lbEl) lbEl.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      const lbEl = document.getElementById('lb');
      if (lbEl) lbEl.classList.remove('open');
      document.body.style.overflow = '';
    }
    function navLb(d: number) {
      lbIdx = (lbIdx + d + galMeta.length) % galMeta.length;
      openLb(lbIdx);
    }
    (window as any).openLightbox = openLb;

    const lbCloseBtn = document.getElementById('lb-x');
    const lbPrevBtn = document.getElementById('lb-prev');
    const lbNextBtn = document.getElementById('lb-next');
    const lbEl = document.getElementById('lb');

    if (lbCloseBtn) lbCloseBtn.addEventListener('click', closeLb);
    if (lbPrevBtn) lbPrevBtn.addEventListener('click', () => navLb(-1));
    if (lbNextBtn) lbNextBtn.addEventListener('click', () => navLb(1));
    if (lbEl) {
      lbEl.addEventListener('click', e => {
        if (e.target === lbEl) closeLb();
      });
    }

    const handleLightboxKeys = (e: KeyboardEvent) => {
      const activeLb = document.getElementById('lb');
      if (!activeLb || !activeLb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') navLb(-1);
      if (e.key === 'ArrowRight') navLb(1);
    };
    document.addEventListener('keydown', handleLightboxKeys);

    // Bind stacked click to lightbox
    const revealImgContainers = document.querySelectorAll('.reveal-img-container');
    revealImgContainers.forEach((container, i) => {
      container.addEventListener('click', () => openLb(i));
    });

    // 9. Keyboard left/right logic for project switching
    const handleProjectSwitchKeys = (e: KeyboardEvent) => {
      const activeLb = document.getElementById('lb');
      if (activeLb && activeLb.classList.contains('open')) return;
      const activeModal = document.getElementById('back-form-modal');
      if (activeModal && activeModal.classList.contains('open')) return;
      if (isEditableKeyTarget(e.target)) return;
      if (e.key === 'ArrowLeft') goToPreviousProject();
      if (e.key === 'ArrowRight') goToNextProject();
    };
    document.addEventListener('keydown', handleProjectSwitchKeys);

    // 10. Swipe Gesture switcher
    const SWIPE_THRESHOLD = 70;

    const handleTouchStart = (e: TouchEvent) => {
      if (!projectNavigation || isInteractiveSwipeTarget(e.target)) {
        touchStartRef.current = { x: 0, y: 0, enabled: false };
        return;
      }

      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        enabled: window.innerWidth < 768,
      };
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current.enabled || isInteractiveSwipeTarget(e.target)) return;

      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const isHorizontalSwipe = Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2;
      touchStartRef.current = { x: 0, y: 0, enabled: false };
      if (!isHorizontalSwipe) return;

      if (dx < 0) {
        goToNextProject();
      } else if (dx > 0) {
        goToPreviousProject();
      }
    };
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // 11. Exit Intent form modal system
    const modal = document.getElementById('back-form-modal');
    const modalClose = document.getElementById('modalCloseBtn');
    const modalCancel = document.getElementById('modalCancelBtn');
    const modalForm = document.getElementById('modal-contact-form') as HTMLFormElement;
    const modSuccess = document.getElementById('modal-success-message');
    function closeFormModal() {
      if (!modal) return;
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    function goHome() {
      closeFormModal();
      router.push('/');
    }

    history.replaceState({ page: 'project-detail' }, '', window.location.href);
    history.pushState({ page: 'project-detail-current' }, '', window.location.href);

    const handlePopState = () => {
      closeFormModal();
      router.replace('/');
    };
    window.addEventListener('popstate', handlePopState);

    if (modalClose) modalClose.addEventListener('click', closeFormModal);
    if (modalCancel) modalCancel.addEventListener('click', goHome);
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeFormModal(); });

    if (modalForm) {
      modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const checkboxes = modalForm.querySelectorAll('input[name="looking_for"]:checked');
        if (checkboxes.length === 0) {
          alert("Please select at least one service option.");
          return;
        }

        const services = Array.from(checkboxes).map(cb => (cb as HTMLInputElement).value);
        const name = (document.getElementById('mod-name') as HTMLInputElement).value;
        const email = (document.getElementById('mod-email') as HTMLInputElement).value;
        const phone = (document.getElementById('mod-phone') as HTMLInputElement).value;
        const website = (document.getElementById('mod-web') as HTMLInputElement).value;

        const submitBtn = modalForm.querySelector('.form-submit-btn') as HTMLButtonElement;
        if (submitBtn) submitBtn.disabled = true;

        try {
          const result = await submitEnquiry({
            name,
            email,
            phone,
            company: website,
            services,
            message: 'Website Link: ' + website
          });

          if (result.success) {
            modalForm.style.display = 'none';
            if (modSuccess) modSuccess.style.display = 'block';

            setTimeout(() => {
              closeFormModal();
              router.push('/');
            }, 2000);
          } else {
            alert(result.error || 'Failed to submit enquiry.');
            if (submitBtn) submitBtn.disabled = false;
          }
        } catch (err) {
          console.error(err);
          alert('An error occurred. Please try again.');
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }

    return () => {
      if ((window as any)._cleanupCursor) (window as any)._cleanupCursor();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('keydown', handleLightboxKeys);
      document.removeEventListener('keydown', handleProjectSwitchKeys);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToNextProject, goToPreviousProject, id, project, projectNavigation, router]);

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? 'hidden' : '';

    const closeMobileNavOnDesktop = () => {
      if (window.innerWidth > 768) {
        setIsMobileNavOpen(false);
      }
    };

    closeMobileNavOnDesktop();
    window.addEventListener('resize', closeMobileNavOnDesktop);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', closeMobileNavOnDesktop);
    };
  }, [isMobileNavOpen]);

  useEffect(() => {
    if (!project) return;
    // 1. Reveal Observer
    const ro = new IntersectionObserver(e => e.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('vis');
        ro.unobserve(en.target);
      }
    }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach(el => ro.observe(el));

    // 2. Counters
    function runCounter(el: any) {
      const tgt = parseFloat(el.dataset.t);
      const suf = el.dataset.s || '';
      const pre = el.dataset.p || '';
      const dur = 2000;
      const s = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      (function tick(now) {
        const t = Math.min((now - s) / dur, 1);
        el.textContent = pre + Math.round(ease(t) * tgt) + suf;
        if (t < 1) requestAnimationFrame(tick);
      })(s);
    }
    const co = new IntersectionObserver(e => e.forEach(en => {
      if (en.isIntersecting) {
        runCounter(en.target);
        co.unobserve(en.target);
      }
    }), { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(el => co.observe(el));

    return () => {
      ro.disconnect();
      co.disconnect();
    };
  }, [project, projects]);

  if (isProjectLoading) {
    return <><div className="modal-card" role="status" aria-live="polite">Loading live project content.</div></>;
  }

  if (!project || projectNotFound) {
    return <><div className="modal-card" role="status" aria-live="polite">{projectError || 'Project not found.'}<br /><a href="/" className="btn-primary">Back to Home</a></div></>;
  }

  const galleryImages = project.gallery.length ? project.gallery : [project.image].filter((image): image is string => Boolean(image));
  const overviewCards = [
    { icon: '🎯', title: 'The Challenge', text: project.challenge },
    { icon: '💡', title: 'Our Approach', text: project.approach },
    { icon: '📈', title: 'The Impact', text: project.impact },
    { icon: '🛡️', title: 'Compliance First', text: project.compliance },
  ].filter(card => card.text);
  const processSteps = project.process.length ? project.process : [];
  const similarProjects = projects.filter(item => item.id !== project.id).slice(0, 3);
  const hasOverviewContent = Boolean(
    project.overviewTitle?.trim() ||
    project.description?.trim() ||
    project.shortDescription?.trim() ||
    project.challenge?.trim() ||
    project.approach?.trim() ||
    project.impact?.trim() ||
    project.compliance?.trim()
  );
  const hasProcessContent = processSteps.length > 0;
  const hasImpactContent = project.stats.length > 0;
  const hasGalleryContent = galleryImages.length > 0;
  const visibleReels = project.reelSection?.items
    ?.filter((item) => item.enabled !== false)
    .filter((item) => item.videoUrl?.trim()) ?? [];
  const hasReelContent = project.reelSection?.enabled === true && visibleReels.length > 0;
  const hasVideoContent = Boolean(project.videoUrl?.trim());
  const showOverview = project.sectionVisibility?.overview !== false && hasOverviewContent;
  const showProcess = project.sectionVisibility?.process !== false && hasProcessContent;
  const showImpact = project.sectionVisibility?.impact !== false && hasImpactContent;
  const showGallery = project.sectionVisibility?.gallery !== false && hasGalleryContent;
  const showReel = project.sectionVisibility?.reel !== false && hasReelContent;
  const showVideoShowcase = project.sectionVisibility?.videoShowcase !== false && hasVideoContent;
  const showRelatedProjects = project.sectionVisibility?.relatedProjects !== false && similarProjects.length > 0;

  if (process.env.NODE_ENV !== 'production' && project.sectionVisibility) {
    console.log('Normalized sectionVisibility:', project.sectionVisibility);
    console.log('Overview Visible:', showOverview);
    console.log('Video Showcase Visible:', showVideoShowcase);
  }

  return (
    <>
      <div className="sr-only" role="status" aria-live="polite">{projectError || 'Project content loaded.'}</div>
      
      <div id="cur-dot"></div>
      <div id="cur-ring"></div>
      <div id="prog"></div>

      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed"/>
            <stop offset="50%" stopColor="#2563eb"/>
            <stop offset="100%" stopColor="#06b6d4"/>
          </linearGradient>
        </defs>
      </svg>

      <nav className="nav" id="nav">
        <div className="nav-in">
          <a href="/" className="logo"><div className="logo-i">R</div><span className="logo-t">Revti<span>Digital</span></span></a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#portfolio">Projects</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
          <a href="/" className="nav-back" id="navBackBtn"><i className="fa-solid fa-arrow-left"></i> Back to Home</a>
          <button
            className={`ham${isMobileNavOpen ? ' open' : ''}`}
            id="ham"
            aria-label="Menu"
            aria-controls="mob"
            aria-expanded={isMobileNavOpen}
            type="button"
            onClick={() => setIsMobileNavOpen(open => !open)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mob-nav${isMobileNavOpen ? ' open' : ''}`} id="mob">
        <button
          className="mob-close"
          type="button"
          aria-label="Close menu"
          onClick={() => setIsMobileNavOpen(false)}
        >
          ×
        </button>
        <a href="/" onClick={() => setIsMobileNavOpen(false)}>Home</a>
        <a href="/#portfolio" onClick={() => setIsMobileNavOpen(false)}>Projects</a>
        <a href="/#contact" onClick={() => setIsMobileNavOpen(false)}>Contact</a>
      </div>

      {projectNavigation && (
        <nav className="project-navigation-shell" aria-label="Project navigation">
          <aside className="project-navigation-rail project-navigation-rail--left">
            <button
              type="button"
              className="project-navigation-arrow project-navigation-arrow--previous"
              aria-label={`View previous project: ${projectNavigation.previous.title}`}
              onClick={goToPreviousProject}
              disabled={isProjectNavigating}
            >
              <svg className="project-navigation-arrow-icon" viewBox="0 0 48 96" aria-hidden="true" focusable="false">
                <path d="M36 8 12 48l24 40" />
              </svg>
              <span className="project-navigation-arrow-label">Previous project</span>
            </button>
          </aside>
          <aside className="project-navigation-rail project-navigation-rail--right">
            <button
              type="button"
              className="project-navigation-arrow project-navigation-arrow--next"
              aria-label={`View next project: ${projectNavigation.next.title}`}
              onClick={goToNextProject}
              disabled={isProjectNavigating}
            >
              <svg className="project-navigation-arrow-icon" viewBox="0 0 48 96" aria-hidden="true" focusable="false">
                <path d="M12 8 36 48 12 88" />
              </svg>
              <span className="project-navigation-arrow-label">Next project</span>
            </button>
          </aside>
        </nav>
      )}

      <header className="proj-hero">
        <div className="hero-mesh"></div>
        <div className="hero-grid-bg"></div>
        <div className="orb" style={{ width: "500px", height: "500px", top: "-80px", left: "-100px", background: "black" }}></div>
        <div className="orb" style={{ width: "320px", height: "320px", bottom: "20%", right: "-60px", background: "black", animationDelay: "-5s" }}></div>
        <div style={{ width: "100%" }}>
          <div className="proj-hero-content">
            <ol className="breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="/#portfolio">Projects</a></li>
              <li>{project.title}</li>
            </ol>
            <div className="proj-cat-pill">{project.category}{project.industry ? ` · ${project.industry}` : ''}</div>
            <h1 className="proj-h1">
              {project.title}
            </h1>
            <p className="proj-sub">{project.tagline || project.shortDescription || project.description}</p>
            <div className="proj-meta-row">
              <div className="meta-item">
                <span className="meta-label">Client</span>
                <span className="meta-value">{project.client || 'Revti Digital'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Industry</span>
                <span className="meta-value">{project.industry || project.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Year</span>
                <span className="meta-value">{project.year || '—'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Sprint</span>
                <span className="meta-value">{project.sprint || '—'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showOverview && (
      <section className="proj-overview" id="overview">
        <div className="wrap">
          <div className="overview-grid">
            <div>
              <h2 className="sec-h2 rv" style={{ transitionDelay: ".1s", marginBottom: "56px" }}><span className="grad">Overview</span></h2>
              <h2 className="ov-big rv" style={{ transitionDelay: ".1s" }}>{project.overviewTitle || project.headline || project.title}</h2>
              {project.shortDescription && (
                <p className="ov-p rv" style={{ transitionDelay: ".15s" }}>{project.shortDescription}</p>
              )}
              {project.description && (
                <p className="ov-p rv" style={{ transitionDelay: ".2s" }}>{project.description}</p>
              )}
            </div>
            {overviewCards.length > 0 && (
              <div className="ov-cards">
                {overviewCards.map((card, index) => (
                  <div className="ov-card rv" style={{ transitionDelay: `${0.1 + index * 0.05}s` }} key={card.title}>
                    <div className="ov-icon" style={{ background: "rgba(124,58,237,.15)", border: "1px solid rgba(124,58,237,.25)" }}>{card.icon}</div>
                    <div className="ov-text"><h4>{card.title}</h4><p>{card.text}</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {showProcess && (
      <section className="proj-process" id="process">
        <div className="wrap">
          <h2 className="sec-h2 rv" style={{ transitionDelay: ".1s", marginBottom: "56px" }}>From discovery to <span className="grad">deployment</span></h2>
          <div className="timeline">
            {processSteps.map((step, index) => (
              <div className="tl-item rv" style={{ transitionDelay: `${index * 0.06}s` }} key={`${step.title}-${index}`}>
                <div className="tl-dot">{step.icon || '•'}</div>
                <div className="tl-body">
                  <div className="tl-step">{step.step || `Phase ${String(index + 1).padStart(2, '0')}`}</div>
                  {step.title && <h3 className="tl-title">{step.title}</h3>}
                  {step.text && <p className="tl-text">{step.text}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {showGallery && (
      <section id="project-gallery" className="sticky-section-gallery" data-disable-project-swipe>
          <div className="gallery-scroll-container">
              <div className="gallery-header">
                  <h2>Brand Showcase</h2>
                  <p>Observe the fluid left-to-right scroll reveal transition on each visual asset.</p>
              </div>

              <div className="stacked-reveal-gallery">
                {galleryImages.map((image, index) => (
                  <div className="reveal-img-container" key={`${image}-${index}`}>
                    <img src={image} alt={`${project.title} asset ${index + 1}`} />
                  </div>
                ))}
              </div>
          </div>

        <div className="lb" id="lb">
          <button className="lb-x" id="lb-x" type="button" aria-label="Close gallery lightbox">✕</button>
          <button className="lb-nav lb-prev" id="lb-prev" type="button" aria-label="Previous gallery image">&lt;</button>
          <div className="lb-stage"><img className="lb-img" id="lb-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="" /><div className="lb-label" id="lb-label">Brand Asset</div><div className="lb-ctr" id="lb-ctr">1 / 4</div></div>
          <button className="lb-nav lb-next" id="lb-next" type="button" aria-label="Next gallery image">&gt;</button>
        </div>
      </section>
      )}

      {showReel && project.reelSection && (
          <ProjectReelSection reelSection={project.reelSection} />
      )}

      {showImpact && (
      <section className="proj-results" id="results">
        <div className="wrap impact-showcase">
          <h2 className="impact-title rv">Impact <span className="muted">Results</span></h2>
          <div className="impact-card-grid" aria-label="Impact result metrics">
            {project.stats.map((stat, index) => (
              <div className="impact-metric-card rv" style={{ transitionDelay: `${0.1 + index * 0.06}s` }} key={`${stat.label}-${index}`}>
                {stat.label && <span className="impact-metric-label">{stat.label}</span>}
                <div className="impact-metric-row">
                  {stat.before && <span className="impact-value-group"><span className="impact-before-label">Before</span><span className="impact-before">{stat.before}</span></span>}
                  {stat.before && <span className="impact-arrow" aria-hidden="true">→</span>}
                  <span className="impact-value-group">
                    <span className="impact-after-label">{stat.before ? 'After' : 'Result'}</span>
                    <span className="impact-after">{stat.after ?? stat.num ?? '—'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {showRelatedProjects && (
      <section className="proj-similar" id="similar">
        <div className="wrap">
          <h2 className="sec-h2 rv" style={{ transitionDelay: ".1s" }}>Explore <span className="grad">related work</span></h2>
          <div className="sim-grid">
            {similarProjects.map(item => (
              <a href={getProjectHref(item.id, projectNavigation?.filter || activeFilter)} className="project-card" key={item.id}>
                <div className="card-visual"><div className="card-image-wrapper">
                  {item.image ? <img src={item.image} alt={item.imageAlt || item.title} loading="lazy" /> : <div className="card-placeholder" style={{ background: item.placeholderGradient }}><span className="placeholder-icon">{item.icon || '✨'}</span></div>}
                  {item.category && <div className="card-overlay"><div className="overlay-content"><span className="overlay-category">{item.category}</span></div></div>}
                </div></div>
                <div className="card-info">
                  <h3 className="card-title">{item.title}</h3>
                  <div className="meta-container">
                    {item.tags.length > 0 && <div className="card-tags">{item.tags.slice(0, 2).map(tag => <span className="tag" key={`${item.id}-${tag}`}>{tag}</span>)}</div>}
                    <div className="show-project-view">Show Project</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      )}

      <div id="back-form-modal" className="modal-overlay">
        <div className="modal-card">
          <button className="modal-close" id="modalCloseBtn" aria-label="Close form">&times;</button>
          <h2 className="modal-title">Want your Brand to stand out? <span className="grad">Contact Us</span></h2>
          <form id="modal-contact-form" className="modal-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mod-name" className="form-label">Name</label>
                <input type="text" id="mod-name" className="form-line-input" required placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label htmlFor="mod-email" className="form-label">Email</label>
                <input type="email" id="mod-email" className="form-line-input" required placeholder="Your Email" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mod-phone" className="form-label">Phone Number</label>
                <input type="tel" id="mod-phone" className="form-line-input" required placeholder="Your Phone Number" />
              </div>
              <div className="form-group">
                <label htmlFor="mod-web" className="form-label">Website Link (Optional)</label>
                <input type="url" id="mod-web" className="form-line-input" placeholder="https://example.com" />
              </div>
            </div>
            <div className="form-group full-width">
              <span className="form-label">Looking For <span className="required">*</span></span>
              <div className="checkbox-grid">
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="Website Development" />
                  <span className="custom-checkbox"></span>
                  Website Development
                </label>
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="Branding" />
                  <span className="custom-checkbox"></span>
                  Branding
                </label>
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="SEO" />
                  <span className="custom-checkbox"></span>
                  SEO
                </label>
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="Social Media Management" />
                  <span className="custom-checkbox"></span>
                  Social Media Management
                </label>
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="Digital Activation" />
                  <span className="custom-checkbox"></span>
                  Digital Activation
                </label>
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="Content" />
                  <span className="custom-checkbox"></span>
                  Content
                </label>
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="Corporate Videos & Photos" />
                  <span className="custom-checkbox"></span>
                  Corporate Videos & Photos
                </label>
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="WhatsApp for Business" />
                  <span className="custom-checkbox"></span>
                  WhatsApp for Business
                </label>
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="AI based Chat Bot" />
                  <span className="custom-checkbox"></span>
                  AI based Chat Bot
                </label>
                <label className="check-item">
                  <input type="checkbox" name="looking_for" value="Advertisement" />
                  <span className="custom-checkbox"></span>
                  Advertisement (PPC, Fb & Insta Ads, Lead Gen)
                </label>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
              <button type="submit" className="btn-primary form-submit-btn">ENQUIRE NOW</button>
            </div>
          </form>
          <div id="modal-success-message" className="form-success-container" style={{ display: "none" }}>
            <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
            <h3>Thank You!</h3>
            <p>Your enquiry has been submitted successfully. We will get back to you shortly.</p>
          </div>
        </div>
      </div>
    </>
  );
}
