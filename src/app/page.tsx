'use client'

import { useEffect, useMemo, useState } from 'react';
import { indexCustomCss } from './styles/indexCustomCss';
import { submitEnquiry } from '@/lib/actions';

type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  icon?: string;
  placeholderGradient?: string;
};

const fallbackPortfolioProjects: PortfolioProject[] = [
  { id: 'branding', title: 'Zenith Realty Rebrand', category: 'Branding', tags: ['Brand Identity', 'Visual Design', 'Guidelines'], image: '/Images/Gemini_Generated_Image_9hy5999hy5999hy5.png', imageAlt: 'Zenith Realty' },
  { id: 'websites', title: 'Healthcare Platform', category: 'Websites', tags: ['Healthcare', 'SaaS', 'Dashboard'], image: '/Images/Gemini_Generated_Image_9y2spc9y2spc9y2s.png', imageAlt: 'HealthCore Platform' },
  { id: 'events', title: 'LuxeStore Commerce', category: 'Events', tags: ['E-Commerce', 'UX Research', 'Design System'], image: '/Images/Gemini_Generated_Image_56kvyt56kvyt56kv.png', imageAlt: 'LuxeStore Commerce' },
  { id: 'nova', title: 'FitTrack Pro', category: 'Publication', tags: ['iOS', 'Android', 'Health'], icon: '📱', placeholderGradient: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))' },
  { id: 'mfg', title: 'IndustrIQ IoT Dashboard', category: 'Publication', tags: ['React', 'IoT', 'Real-time'], icon: '🏭', placeholderGradient: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.2))' },
  { id: 'seo', title: 'OrganicBoost SEO Campaign', category: 'Websites', tags: ['SEO', 'Marketing', 'Growth'], image: '/Images/Gemini_Generated_Image_7pjuoj7pjuoj7pju.png', imageAlt: 'OrganicBoost' },
  { id: 'social', title: 'ArtFlow Creative Platform', category: 'Interiors', tags: ['Creative', 'Collaboration', 'SaaS'], icon: '🎨', placeholderGradient: 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(124,58,237,0.2))' },
  { id: 'fintech', title: 'PayWise Finance App', category: 'Packaging', tags: ['Fintech', 'Payments', 'Security'], icon: '💰', placeholderGradient: 'linear-gradient(135deg, rgba(34,197,94,0.3), rgba(6,182,212,0.2))' },
  { id: 'ecommerce', title: 'FoodieHub Delivery Platform', category: 'Events', tags: ['Food Tech', 'Marketplace', 'UX'], icon: '🍔', placeholderGradient: 'linear-gradient(135deg, rgba(251,146,60,0.3), rgba(236,72,153,0.2))' },
];

const getStringValue = (source: any, keys: string[]) => {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
};

const normalizePortfolioProject = (item: any, index: number): PortfolioProject | null => {
  const title = getStringValue(item, ['title', 'name', 'projectTitle', 'clientName']);
  if (!title) return null;

  const rawTags = item?.tags || item?.technologies || item?.services || item?.skills || [];
  const tags = Array.isArray(rawTags)
    ? rawTags.map(tag => typeof tag === 'string' ? tag : getStringValue(tag, ['name', 'title'])).filter(Boolean).slice(0, 3)
    : String(rawTags).split(',').map(tag => tag.trim()).filter(Boolean).slice(0, 3);

  return {
    id: getStringValue(item, ['slug', 'id', '_id']) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `portfolio-${index + 1}`,
    title,
    category: getStringValue(item, ['category', 'type', 'portfolioCategory']) || 'Branding',
    tags: tags.length ? tags : ['Case Study'],
    image: getStringValue(item, ['image', 'imageUrl', 'thumbnail', 'thumbnailUrl', 'coverImage', 'coverImageUrl']),
    imageAlt: getStringValue(item, ['imageAlt', 'alt']) || title,
    icon: '✨',
    placeholderGradient: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
  };
};

export default function HomePage() {
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(fallbackPortfolioProjects);

  const portfolioCategories = useMemo(() => {
    const categories = portfolioProjects.map(project => project.category).filter(Boolean);
    return ['all', ...Array.from(new Set(categories))];
  }, [portfolioProjects]);

  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '');
    if (!apiBaseUrl) return;

    const controller = new AbortController();

    async function loadPortfolioProjects() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/portfolio`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Portfolio request failed with ${response.status}`);
        const payload = await response.json();
        const rawProjects = Array.isArray(payload) ? payload : payload?.data || payload?.portfolio || payload?.projects || [];
        const nextProjects = Array.isArray(rawProjects)
          ? rawProjects.map(normalizePortfolioProject).filter((project): project is PortfolioProject => Boolean(project))
          : [];

        if (nextProjects.length) {
          setPortfolioProjects(nextProjects);
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Unable to load portfolio projects from backend.', error);
        }
      }
    }

    loadPortfolioProjects();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    // 1. GSAP ScrollTrigger register
    if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

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
      gsap.fromTo('.gallery-sec-hdr', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.gallery-sec-hdr', start: 'top 80%', once: true }
      });

      // Entrance animation for project cards
      const projectGrid = document.getElementById('projectGrid');
      const projectCards = document.querySelectorAll('.project-card');
      if (projectGrid && projectCards.length) {
        gsap.fromTo(projectCards, { opacity: 0, y: 40, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: projectGrid, start: 'top 80%', once: true }
        });
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

    // 4. Reveal (standard IntersectionObserver fallback if GSAP not trigger)
    const ro = new IntersectionObserver(e => e.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('vis');
        (ro as any).unobserve(en.target);
      }
    }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach(el => ro.observe(el));

    // 5. Counters
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
        (co as any).unobserve(en.target);
      }
    }), { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(el => co.observe(el));

    // 6. Smooth hash links
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

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('open');
      isModalOpen = false;
      document.body.style.overflow = '';
    }

    // Check sessionStorage showContactForm flag
    if (sessionStorage.getItem('showContactForm') === '1') {
      sessionStorage.removeItem('showContactForm');
      setTimeout(() => {
        openModal();
      }, 100);
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Form submit intercept
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

    // 8. Portfolio Filter + category-aware project navigation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll<HTMLAnchorElement>('.project-card');
    let activeCategoryFilter = 'all';

    const getProjectIdFromHref = (href: string) => {
      const projectPath = '/project/';
      const pathStart = href.indexOf(projectPath);
      if (pathStart === -1) return '';
      return href.slice(pathStart + projectPath.length).split(/[?#/]/)[0];
    };

    const syncProjectSequence = (selectedFilter: string) => {
      const projectIds = Array.from(projectCards)
        .filter(card => selectedFilter === 'all' || card.getAttribute('data-category') === selectedFilter)
        .map(card => getProjectIdFromHref(card.getAttribute('href') || ''))
        .filter((projectId, index, ids) => projectId && ids.indexOf(projectId) === index);

      sessionStorage.setItem('activeCategoryFilter', selectedFilter);
      sessionStorage.setItem('activeProjectSequence', JSON.stringify(projectIds));
    };

    syncProjectSequence(activeCategoryFilter);

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedFilter = button.getAttribute('data-filter') || 'all';
        activeCategoryFilter = selectedFilter;
        syncProjectSequence(selectedFilter);

        projectCards.forEach(card => {
          card.classList.add('fade-out');
        });

        setTimeout(() => {
          projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedFilter === 'all' || cardCategory === selectedFilter) {
              card.classList.remove('hide');
              setTimeout(() => {
                card.classList.remove('fade-out');
              }, 20);
            } else {
              card.classList.add('hide');
            }
          });
        }, 400);
      });
    });

    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const cardCategory = card.getAttribute('data-category') || 'all';
        const sequenceFilter = activeCategoryFilter === 'all' ? 'all' : cardCategory;
        syncProjectSequence(sequenceFilter);
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [portfolioProjects]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: indexCustomCss }} />
      
{/* <div className="cur-dot" id="curDot"></div>
<div className="cur-ring" id="curRing"></div>
<div className="cur-view-txt" id="curViewTxt">VIEW</div> */}
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
    <a href="#contact" className="nav-cta">Start a Project</a>
    <button className="ham" id="ham" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</nav>
<div className="mob-nav" id="mob">
  <a href="#hero">Home</a><a href="#portfolio">Projects</a><a href="#contact">Contact</a>
  <a href="#contact" className="nav-cta" style={{ fontSize: "18px" }}>Start a Project</a>
</div>

{/* ── HERO ── */}
<section className="hero" id="hero">
  <div className="hero-mesh"></div>
  <div className="hero-grid-bg"></div>
  <div className="orb" style={{ width: "500px", height: "500px", top: "-100px", left: "-150px", background: "rgba(124,58,237,.09)" }}></div>
  <div className="orb" style={{ width: "380px", height: "380px", top: "30%", right: "-80px", background: "rgba(37,99,235,.07)", animationDelay: "-4s" }}></div>
  <div className="orb" style={{ width: "280px", height: "280px", bottom: "-50px", left: "40%", background: "rgba(6,182,212,.06)", animationDelay: "-8s" }}></div>
  <div className="wrap" style={{ width: "100%" }}>
    <div className="hero-content">
      <div className="hero-ey"><span className="ey-dot"></span> Digital Agency · Est. 2018</div>
      <h1 className="hero-h1">We Make<span className="grad"> Digital </span>Matter.</h1>
      <p className="hero-sub">From SEO-driven growth strategies to full-scale enterprise software — Revti Digital builds things that perform.</p>
      <div className="hero-btns">
        <a href="#portfolio" className="btn-primary"><i className="fa-solid fa-arrow-down"></i> View Our Work</a>
        <a href="#contact" className="btn-ghost"><i className="fa-solid fa-paper-plane"></i> Start a Project</a>
      </div>
    </div>
  </div>
  {/* <div className="scroll-hint"><div className="scroll-mouse"></div><span className="scroll-label">Scroll</span></div> */}
</section>

{/* ── IMPACT ── */}
<section className="impact" id="impact">
  <div className="wrap">
    <div className="impact-grid">
      <div className="impact-item rv"><span className="impact-num counter" data-t="10" data-s="+">10+</span><div className="impact-label">Years of Experience</div><div className="impact-sub">Delivering results since 2018</div></div>
      <div className="impact-item rv" style={{ transitionDelay: ".1s" }}><span className="impact-num counter" data-t="200" data-s="+">200+</span><div className="impact-label">Clients Served</div><div className="impact-sub">Across 8+ industries globally</div></div>
      <div className="impact-item rv" style={{ transitionDelay: ".2s" }}><span className="impact-num counter" data-t="50" data-s="+">50+</span><div className="impact-label">Projects Delivered</div><div className="impact-sub">On time, on budget, on point</div></div>
      <div className="impact-item rv" style={{ transitionDelay: ".3s" }}><span className="impact-num counter" data-t="8" data-s="+">8+</span><div className="impact-label">Industries Covered</div><div className="impact-sub">Focused expertise across growth sectors</div></div>
    </div>
  </div>
</section>


{/* ═══════════════════════════════════════
     PREMIUM ANIMATED FILTERING GALLERY
═══════════════════════════════════════ */}
<section className="portfolio-section" id="portfolio">
  <div className="portfolio-container">
    {/* Section Header */}
    <div className="portfolio-header">
      {/* <span className="portfolio-eyebrow">
       
      </span> */}
      <h2 className="portfolio-title">Creative Projects</h2>
      <p className="portfolio-subtitle">Crafting digital experiences that drive measurable results across branding, design, and development.</p>
    </div>




     <div className="filter-menu">
      {portfolioCategories.map(category => (
        <button key={category} className={`filter-btn ${category === 'all' ? 'active' : ''}`} data-filter={category}>
          {category === 'all' ? 'All' : category}
        </button>
      ))}
    </div>

    {/* Project Grid */}
    <div className="project-grid" id="projectGrid">
      {portfolioProjects.map(project => (
        <a href={`/project/${project.id}`} className="project-card" data-category={project.category} key={project.id}>
          <div className="card-visual">
            <div className="card-image-wrapper">
              {project.image ? (
                <img src={project.image} alt={project.imageAlt || project.title} loading="lazy" />
              ) : (
                <div className="card-placeholder" style={{ background: project.placeholderGradient }}>
                  <span className="placeholder-icon">{project.icon || '✨'}</span>
                </div>
              )}
              <div className="card-overlay">
                <div className="overlay-content">
                  <span className="overlay-category">{project.category}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-info">
            <h3 className="card-title">{project.title}</h3>
            <div className="meta-container">
              <div className="card-tags">
                {project.tags.map(tag => <span className="tag" key={`${project.id}-${tag}`}>{tag}</span>)}
              </div>
              <div className="show-project-view">Show Project</div>
            </div>
          </div>
        </a>
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
  <div className="logo-carousel" aria-label="Client logo carousel">
    <div className="logo-carousel-track">
      {[
        'Apollo Health',
        'Zenith Realty',
        'LuxeStore',
        'OrganicBoost',
        'FinEdge',
        'IndustrIQ',
        'NovaBrand',
        'FoodieHub',
      ].map((brand) => (
        <div className="client-logo-card" key={`logo-a-${brand}`} aria-label={brand}>
          <span>{brand}</span>
        </div>
      ))}
      {[
        'Apollo Health',
        'Zenith Realty',
        'LuxeStore',
        'OrganicBoost',
        'FinEdge',
        'IndustrIQ',
        'NovaBrand',
        'FoodieHub',
      ].map((brand) => (
        <div className="client-logo-card" key={`logo-b-${brand}`} aria-hidden="true">
          <span>{brand}</span>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ── CONTACT CTA ── */}
<section className="contact-cta" id="contact" aria-labelledby="contact-cta-title">
  <div className="wrap">
    <div className="contact-cta-box rv">
      <h2 className="cta-title" id="contact-cta-title">Let&apos;s Create Something <span className="muted">Together</span></h2>
      <div className="cta-row">
        <span className="cta-line" aria-hidden="true"></span>
        <a href="mailto:hello@revtidigital.com" className="btn-primary">Get In Touch! <i className="fa-solid fa-arrow-right"></i></a>
      </div>
      <div className="cta-socials" aria-label="Social links">
        <a href="#">Instagram <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        <a href="#">Twitter <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        <a href="#">Linkedin <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
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
