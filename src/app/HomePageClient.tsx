'use client'

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { submitEnquiry } from '@/lib/actions';
import {
  buildVisibleProjectFilters,
  getFilterSlugFromHash,
  getPrimaryProjectFilter,
  getProjectFilterHash,
  isProjectFilterHash as isFilterHash,
  loadWebsiteContent,
  normalizeFilterSlug,
  projectMatchesFilter,
  type ClientLogo,
  type ContactSectionContent,
  type HomeHeroContent,
  type PortfolioImpactMetric,
  type PortfolioProject,
  type ProjectFilter,
  type SocialLink,
  type WebsiteContent
} from '@/lib/portfolio';

const getInitialProjectFilter = () => {
  if (typeof window === 'undefined') return 'all';
  const hashFilter = getFilterSlugFromHash(window.location.hash);
  const queryFilter = normalizeFilterSlug(new URLSearchParams(window.location.search).get('filter') || '') || '';
  return hashFilter || queryFilter || 'all';
};

const renderHighlightedText = (title: string, highlight: string) => {
  if (!highlight) return title;
  const start = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (start === -1) return title;
  const end = start + highlight.length;

  return (
    <>
      {title.slice(0, start)}
      <span className="grad">{title.slice(start, end)}</span>
      {title.slice(end)}
    </>
  );
};

export default function HomePageClient({ initialContent }: { initialContent: WebsiteContent }) {
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(initialContent.projects);
  const [impactMetrics, setImpactMetrics] = useState<PortfolioImpactMetric[]>(initialContent.impactMetrics);
  const [heroContent, setHeroContent] = useState<HomeHeroContent | null>(initialContent.heroContent);
  const [contactContent, setContactContent] = useState<ContactSectionContent | null>(initialContent.contactContent);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>(initialContent.clientLogos);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialContent.socialLinks);
  const [activeProjectFilter, setActiveProjectFilter] = useState(getInitialProjectFilter);
  const filterButtonRefs = useRef(new Map<string, HTMLButtonElement>());
  const filterChangedByUserRef = useRef(false);

  const [portfolioCategoryFilters, setPortfolioCategoryFilters] = useState<ProjectFilter[]>(initialContent.categoryFilters || []);
  const [contentError, setContentError] = useState<string | null>(null);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const availableProjectFilters = useMemo(
    () => buildVisibleProjectFilters(portfolioProjects, portfolioCategoryFilters),
    [portfolioProjects, portfolioCategoryFilters]
  );

  const activeFilterIsValid = availableProjectFilters.some(filter => filter.slug === activeProjectFilter);
  const resolvedProjectFilter = activeFilterIsValid ? activeProjectFilter : 'all';
  const activeProjectFilterLabel = availableProjectFilters.find(filter => filter.slug === resolvedProjectFilter)?.label || 'All projects';

  const filteredProjects = useMemo(
    () => portfolioProjects.filter(project => projectMatchesFilter(project, resolvedProjectFilter)),
    [portfolioProjects, resolvedProjectFilter]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!activeFilterIsValid && activeProjectFilter !== 'all') {
      setActiveProjectFilter('all');
    }
  }, [activeFilterIsValid, activeProjectFilter]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem('activeProjectFilter', resolvedProjectFilter);
    window.sessionStorage.setItem('activeCategoryFilter', resolvedProjectFilter);
    window.sessionStorage.setItem('activeProjectSequence', JSON.stringify(filteredProjects.map(project => project.id)));

    const currentHash = window.location.hash;
    const canReplaceHash = filterChangedByUserRef.current || isFilterHash(currentHash);
    if (!canReplaceHash) return;

    const nextHash = getProjectFilterHash(resolvedProjectFilter);
    if (currentHash !== nextHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
    }
    filterChangedByUserRef.current = false;
  }, [filteredProjects, resolvedProjectFilter]);

  const scrollActiveFilterIntoView = useCallback((filterSlug: string) => {
    window.requestAnimationFrame(() => {
      const activeButton = filterButtonRefs.current.get(filterSlug);
      activeButton?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    scrollActiveFilterIntoView(resolvedProjectFilter);
  }, [resolvedProjectFilter, scrollActiveFilterIntoView]);

  const handleProjectFilterChange = useCallback((nextFilter: string) => {
    const nextSlug = normalizeFilterSlug(nextFilter) || 'all';
    filterChangedByUserRef.current = true;
    const updateFilter = () => setActiveProjectFilter(nextSlug);

    if (!prefersReducedMotion && typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        flushSync(updateFilter);
      });
    } else {
      updateFilter();
    }

    scrollActiveFilterIntoView(nextSlug);
  }, [prefersReducedMotion, scrollActiveFilterIntoView]);

  useEffect(() => {
    let active = true;
    let abortController: AbortController | null = null;

    async function loadContent() {
      if (abortController) abortController.abort();
      abortController = new AbortController();
      const controller = abortController;
      
      const needsLoader = !heroContent || portfolioProjects.length === 0;
      if (needsLoader) setIsContentLoading(true);
      setContentError(null);
      try {
        const result = await loadWebsiteContent({ signal: controller.signal });
        if (!active || controller.signal.aborted) return;

        setPortfolioProjects(result.content.projects);
        setPortfolioCategoryFilters(result.content.categoryFilters || []);
        setHeroContent(result.content.heroContent);
        setContactContent(result.content.contactContent);
        setImpactMetrics(result.content.impactMetrics);
        setClientLogos(result.content.clientLogos);
        setSocialLinks(result.content.socialLinks);

        if (!result.ok) {
          setContentError('Unable to load live website content. Showing temporary fallback content.');
        }
      } finally {
        if (active) setIsContentLoading(false);
      }
    }

    loadContent();

    const handleFocus = () => loadContent();
    const handleOnline = () => loadContent();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);
    const refreshInterval = window.setInterval(loadContent, 45000);

    return () => {
      active = false;
      if (abortController) abortController.abort();
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
      window.clearInterval(refreshInterval);
    };
  }, []);

  useEffect(() => {
    let createdScrollTriggers: any[] = [];

    // 1. GSAP ScrollTrigger register
    if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const existingScrollTriggers = new Set(ScrollTrigger.getAll ? ScrollTrigger.getAll() : []);

      // GSAP Scroll Reveals - Editorial Cards (.pc)
      gsap.utils.toArray('.pc').forEach((card: any) => {
        const visual = card.querySelector('.pc-visual');
        // Reveal on scroll
        gsap.fromTo(card, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        });

        // Parallax on the visual
        if (visual) {
          gsap.to(visual, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
          });
        }
      });

      // Gallery header reveal
      const galleryHeader = document.querySelector('.gallery-sec-hdr');
      if (galleryHeader) {
        gsap.fromTo(galleryHeader, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: galleryHeader, start: 'top 80%', once: true }
        });
      }

      // Entrance animation for project cards
      const projectGrid = document.getElementById('projectGrid');
      const projectCards = document.querySelectorAll('.project-card');
      if (projectGrid && projectCards.length) {
        gsap.fromTo(projectCards, { opacity: 0, y: 40, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: projectGrid, start: 'top 80%', once: true }
        });
      }

      if (ScrollTrigger.getAll) {
        createdScrollTriggers = ScrollTrigger.getAll().filter((trigger: any) => !existingScrollTriggers.has(trigger));
      }
    }

    // 2. Scroll Prog & Nav sc toggle
    const prog = document.getElementById('prog');
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      if (prog) {
        prog.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
      }
      if (nav) {
        nav.classList.toggle('sc', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Hamburger Menu
    const hamBtn = document.getElementById('ham');
    const mob = document.getElementById('mob');
    const handleHamClick = () => {
      if (hamBtn && mob) {
        hamBtn.classList.toggle('open');
        mob.classList.toggle('open');
        document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
      }
    };
    if (hamBtn) hamBtn.addEventListener('click', handleHamClick);

    const mobLinks = mob ? mob.querySelectorAll('a') : [];
    const handleMobLinkClick = () => {
      if (hamBtn && mob) {
        hamBtn.classList.remove('open');
        mob.classList.remove('open');
        document.body.style.overflow = '';
      }
    };
    mobLinks.forEach(a => a.addEventListener('click', handleMobLinkClick));

    // 4. Smooth hash links
    const handleHashLinkClick = (e: Event) => {
      const targetId = (e.currentTarget as HTMLElement).getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const t = document.querySelector(targetId);
        if (t) {
          e.preventDefault();
          t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', handleHashLinkClick);
    });

    // 7. Exit intent form validation & Supabase action integration
    const modal = document.getElementById('back-form-modal');
    const modalClose = document.getElementById('modalCloseBtn');
    const modalForm = document.getElementById('modal-contact-form') as HTMLFormElement;
    const modSuccess = document.getElementById('modal-success-message');
    let isModalOpen = false;

    function openModal() {
      if (isModalOpen || !modal) return;
      modal.classList.add('open');
      isModalOpen = true;
      document.body.style.overflow = 'hidden';
    }

    // Check sessionStorage showContactForm flag
    if (sessionStorage.getItem('showContactForm') === '1') {
      sessionStorage.removeItem('showContactForm');
      setTimeout(() => {
        openModal();
      }, 100);
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('open');
      isModalOpen = false;
      document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

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
            message: 'Website link: ' + website
          });

          if (result.success) {
            modalForm.style.display = 'none';
            if (modSuccess) modSuccess.style.display = 'block';

            setTimeout(() => {
              closeModal();
              modalForm.style.display = 'flex';
              if (modSuccess) modSuccess.style.display = 'none';
              modalForm.reset();
              if (submitBtn) submitBtn.disabled = false;
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
      createdScrollTriggers.forEach((trigger) => trigger.kill?.());
      window.removeEventListener('scroll', handleScroll);
    };
  }, [portfolioProjects]);

  useEffect(() => {
    // 1. Reveal (standard IntersectionObserver fallback if GSAP not trigger)
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
      const dur = 2000;
      const s = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      (function tick(now) {
        const t = Math.min((now - s) / dur, 1);
        el.textContent = Math.round(ease(t) * tgt) + suf;
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
  }, [impactMetrics, portfolioProjects]);


  return (
    <>
      <div className="sr-only" role="status" aria-live="polite">{isContentLoading ? 'Loading live site content.' : contentError || 'Live site content loaded.'}</div>
      <div id="prog"></div>

{/* NAV */}
<nav className="nav" id="nav">
  <div className="nav-in">
    <a href="/" className="logo"><div className="logo-i">R</div><span className="logo-t">Revti<span>Digital</span></span></a>
    <ul className="nav-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#portfolio">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button className="ham" id="ham" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</nav>

<div className="mob-nav" id="mob">
  <a href="#hero">Home</a>
  <a href="#portfolio">Projects</a>
  <a href="#contact">Contact</a>
</div>

{/* ── HERO ── */}
<section className="hero" id="hero">
  <div className="hero-mesh"></div>
  <div className="hero-grid-bg"></div>
  <div className="orb orb-1"></div>
  <div className="orb orb-2"></div>
  <div className="wrap">
    <div className="hero-content">
      <h1 className="hero-h1">{heroContent ? renderHighlightedText(heroContent.title, heroContent.highlight) : (isContentLoading ? 'Loading live content' : 'No hero content available')}</h1>
      {heroContent?.subtitle && <p className="hero-sub rv" style={{ transitionDelay: ".1s" }}>{heroContent.subtitle}</p>}
      <div className="hero-actions rv" style={{ transitionDelay: ".2s" }}>
        <a href={heroContent?.primaryHref || '#portfolio'} className="btn-primary" target={heroContent?.primaryNewTab ? '_blank' : undefined} rel={heroContent?.primaryNewTab ? 'noopener noreferrer' : undefined}><i className={`fa-solid ${heroContent?.primaryIcon || ''}`}></i> {heroContent?.primaryLabel || (isContentLoading ? 'Loading' : 'Unavailable')}</a>
        <a href={heroContent?.secondaryHref || '#contact'} className="btn-ghost" target={heroContent?.secondaryNewTab ? '_blank' : undefined} rel={heroContent?.secondaryNewTab ? 'noopener noreferrer' : undefined}><i className={`fa-solid ${heroContent?.secondaryIcon || ''}`}></i> {heroContent?.secondaryLabel || (isContentLoading ? 'Loading' : 'Unavailable')}</a>
      </div>
    </div>
  </div>
</section>

{/* ── IMPACT ── */}
<section className="impact" id="impact" aria-label="Key metrics">
  <div className="wrap">
    <div className="impact-grid">
      {impactMetrics.map((metric, index) => (
        <div className="impact-item rv" style={{ transitionDelay: `${index * 0.1}s` }} key={metric.label}>
          <span className="impact-num counter" data-t={metric.value} data-s={metric.suffix}>{metric.displayValue}</span>
          {metric.label && <div className="impact-label">{metric.label}</div>}
          {metric.sub && <div className="impact-sub">{metric.sub}</div>}
        </div>
      ))}
      {impactMetrics.length === 0 && !isContentLoading && <div className="impact-item rv"><span className="impact-label">No impact numbers available.</span></div>}
    </div>
  </div>
</section>

{/* ── PORTFOLIO GRID ── */}
<section className="portfolio-section" id="portfolio">
  <div className="portfolio-container">
    <div className="portfolio-header rv">
      <span className="portfolio-eyebrow">Creative Portfolio</span>
      <h2 className="portfolio-title">Featured Creations</h2>
      <p className="portfolio-subtitle">A collection of editorial design systems, bespoke brand identities, and high-performance digital products.</p>
    </div>

    {/* Filter Buttons */}
    <nav className="home-project-filter-nav rv" aria-label="Filter projects">
      {availableProjectFilters.map((filter) => (
          <button
            type="button"
            className={resolvedProjectFilter === filter.slug ? 'home-project-filter-button is-active' : 'home-project-filter-button'}
            data-filter={filter.slug}
            key={filter.slug}
            ref={(button) => {
              if (button) {
                filterButtonRefs.current.set(filter.slug, button);
              } else {
                filterButtonRefs.current.delete(filter.slug);
              }
            }}
            onClick={() => handleProjectFilterChange(filter.slug)}
            aria-pressed={resolvedProjectFilter === filter.slug}
          >
            {filter.label}
          </button>
        ))}
    </nav>

    <div className="sr-only home-project-results-status" aria-live="polite">
      {`${filteredProjects.length} projects shown for ${activeProjectFilterLabel}`}
    </div>

    <div className="project-grid home-project-grid" id="projectGrid">
      {portfolioProjects.length === 0 && !isContentLoading && <div className="project-empty-state home-project-empty-state">No published projects available.</div>}
      {portfolioProjects.length > 0 && filteredProjects.length === 0 && !isContentLoading && (
        <div className="project-empty-state home-project-empty-state">
          <p>No projects are available in this category yet.</p>
          <button type="button" className="home-project-empty-action" onClick={() => handleProjectFilterChange('all')}>View all projects</button>
        </div>
      )}
      {filteredProjects.map((project, index) => (
        <Link
          href={`/project/${project.id}${getProjectFilterHash(resolvedProjectFilter)}`}
          className="project-card home-project-grid-item"
          data-category={getPrimaryProjectFilter(project)?.slug || normalizeFilterSlug(project.category || '')}
          key={project.id}
          aria-label={`View project details for ${project.title}`}
          style={{ '--project-card-index': index } as React.CSSProperties}
        >
          <div className="card-visual">
            <div className="card-image-wrapper">
              {project.image ? (
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
              ) : (
                <div className="card-placeholder" style={{ background: project.placeholderGradient }}>
                  <span className="placeholder-icon">{project.icon || '✨'}</span>
                </div>
              )}
              {project.category && (
                <div className="card-overlay">
                  <div className="overlay-content">
                    <span className="overlay-category">{project.category}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="card-info">
            <h3 className="card-title">{project.title}</h3>
            <div className="meta-container">
              {project.tags.length > 0 && (
                <div className="card-tags">
                  {project.tags.map(tag => <span className="tag" key={`${project.id}-${tag}`}>{tag}</span>)}
                </div>
              )}
              <div className="show-project-view">Show Project</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

{/* ── LOGO CAROUSEL ── */}
<section className="logo-carousel-section" aria-labelledby="logo-carousel-title">
  <div className="logo-carousel-header rv">
    <span className="logo-carousel-eyebrow">Trusted Collaborations</span>
    <h2 className="logo-carousel-title" id="logo-carousel-title">Brands that trust our creative process</h2>
  </div>
  <div className={`logo-carousel${clientLogos.length > 1 ? ' is-marquee' : ' is-static'}`} aria-label="Client logo carousel">
    <div className="logo-carousel-track">
      {clientLogos.length === 0 && !isContentLoading && <div className="client-logo-card"><span>No client logos available.</span></div>}
      {clientLogos.map((logo) => (
        <div className="client-logo-card" key={`logo-a-${logo.id}`} aria-label={logo.name}>
          {logo.image ? <img src={logo.image} alt={logo.name} loading="lazy" /> : <span>{logo.name}</span>}
        </div>
      ))}
      {clientLogos.length > 1 && (
        clientLogos.map((logo) => (
          <div className="client-logo-card" key={`logo-b-${logo.id}`} aria-hidden="true">
            {logo.image ? <img src={logo.image} alt="" loading="lazy" /> : <span>{logo.name}</span>}
          </div>
        ))
      )}
    </div>
  </div>
</section>

{/* ── CONTACT CTA ── */}
<section className="contact-cta" id="contact" aria-labelledby="contact-cta-title">
  <div className="wrap">
    <div className="contact-cta-box rv">
      <h2 className="cta-title" id="contact-cta-title">{contactContent ? renderHighlightedText(contactContent.heading, contactContent.highlight) : (isContentLoading ? 'Loading contact content' : 'No contact content available')}</h2>
      <div className="cta-row">
        <span className="cta-line" aria-hidden="true"></span>
        <a href={contactContent?.buttonHref || '#contact'} className="btn-primary">{contactContent?.buttonLabel || (isContentLoading ? 'Loading' : 'Unavailable')} <i className="fa-solid fa-arrow-right"></i></a>
      </div>
      <div className="cta-socials" aria-label="Social links">
        {socialLinks.length === 0 && !isContentLoading && <span>No social links available.</span>}
        {socialLinks.map((social) => (
          <a href={social.href} key={social.id}>{social.platform} <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        ))}
      </div>
    </div>
  </div>
</section>

{/* ══ EXIT INTENT MODAL OVERLAY ══ */}
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
