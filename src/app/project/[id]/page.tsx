'use client'

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { projectCustomCss } from '../../styles/projectCustomCss';
import { submitEnquiry } from '@/lib/actions';
import { loadWebsiteContent, type PortfolioProject } from '@/lib/portfolio';

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id || 'websites';

  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [prevId, setPrevId] = useState('');
  const [nextId, setNextId] = useState('');
  const [projectNotFound, setProjectNotFound] = useState(false);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState<string | null>(null);


  useEffect(() => {
    let active = true;
    let abortController: AbortController | null = null;

    async function loadProjectContent() {
      if (abortController) abortController.abort();
      abortController = new AbortController();
      const controller = abortController;
      setIsProjectLoading(true);
      setProjectError(null);
      setProjectNotFound(false);
      setProject(null);
      try {
        const result = await loadWebsiteContent({ signal: controller.signal });
        if (!active || controller.signal.aborted) return;

        const nextProjects = result.ok ? result.content.projects : [];
        const matchedProject = nextProjects.find(item => item.id === id) || null;
        setProjects(nextProjects);
        setProject(matchedProject);
        setProjectNotFound(!matchedProject);
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

    // 2. Dynamic Prev / Next Navigation setup (Filtered by category)
    const activeFilter = sessionStorage.getItem('activeCategoryFilter') || 'all';
    const categorySequences = projects.reduce<Record<string, string[]>>((acc, item) => {
      acc.all.push(item.id);
      acc[item.category] = [...(acc[item.category] || []), item.id];
      return acc;
    }, { all: [] });

    let storedSequence: string[] = [];
    try {
      const parsedSequence = JSON.parse(sessionStorage.getItem('activeProjectSequence') || '[]');
      if (Array.isArray(parsedSequence)) {
        storedSequence = parsedSequence.filter((projectId): projectId is string => typeof projectId === 'string' && Boolean(projectId));
      }
    } catch {
      storedSequence = [];
    }

    let filteredSequence = storedSequence.includes(id)
      ? storedSequence
      : categorySequences[activeFilter] || categorySequences['all'];

    if (!filteredSequence.includes(id) || filteredSequence.length === 0) {
      filteredSequence = categorySequences['all'];
    }

    const currentProjectIndex = filteredSequence.indexOf(id);
    const prevProjId = filteredSequence[(currentProjectIndex - 1 + filteredSequence.length) % filteredSequence.length];
    const nextProjId = filteredSequence[(currentProjectIndex + 1) % filteredSequence.length];
    setPrevId(prevProjId);
    setNextId(nextProjId);

    const projectPrev = document.getElementById('projectPrev') as HTMLAnchorElement;
    const projectNext = document.getElementById('projectNext') as HTMLAnchorElement;
    if (projectPrev && projectNext) {
      projectPrev.href = '/project/' + prevProjId;
      projectNext.href = '/project/' + nextProjId;
    }

    // 3. Custom Cursor
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

      // Cleanup function scope variables
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

    // 5. Hamburger
    const hamB = document.getElementById('ham');
    const mob = document.getElementById('mob');
    const handleHamClick = () => {
      if (hamB && mob) {
        hamB.classList.toggle('open');
        mob.classList.toggle('open');
        document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
      }
    };
    if (hamB) hamB.addEventListener('click', handleHamClick);

    const mobLinks = mob ? mob.querySelectorAll('a') : [];
    const handleMobLinkClick = () => {
      if (hamB && mob) {
        hamB.classList.remove('open');
        mob.classList.remove('open');
        document.body.style.overflow = '';
      }
    };
    mobLinks.forEach(a => a.addEventListener('click', handleMobLinkClick));



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
      if (activeLb && activeLb.classList.contains('open')) return; // ignore if lightbox is open
      const activeModal = document.getElementById('back-form-modal');
      if (activeModal && activeModal.classList.contains('open')) return; // ignore if form modal is open
      if (e.key === 'ArrowLeft') router.push('/project/' + prevProjId);
      if (e.key === 'ArrowRight') router.push('/project/' + nextProjId);
    };
    document.addEventListener('keydown', handleProjectSwitchKeys);

    // 10. Swipe Gesture switcher
    let touchStartX = 0;
    let touchStartY = 0;
    const SWIPE_THRESHOLD = 60;
    const ANGLE_LIMIT = 40;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dy) > Math.abs(dx) * Math.tan(ANGLE_LIMIT * Math.PI / 180)) return;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (dx < 0) {
        router.push('/project/' + nextProjId);
      } else if (dx > 0) {
        router.push('/project/' + prevProjId);
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

    // Browser back from project pages should go to the homepage, not open the lead form.
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

    // Form submit connection to Supabase Server Action
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
  }, [id, router, projects, project]);

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
    return <><style dangerouslySetInnerHTML={{ __html: projectCustomCss }} /><div className="modal-card" role="status" aria-live="polite">Loading live project content.</div></>;
  }

  if (!project || projectNotFound) {
    return <><style dangerouslySetInnerHTML={{ __html: projectCustomCss }} /><div className="modal-card" role="status" aria-live="polite">{projectError || 'Project not found.'}<br /><a href="/" className="btn-primary">Back to Home</a></div></>;
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: projectCustomCss }} />
      <div className="sr-only" role="status" aria-live="polite">{projectError || 'Project content loaded.'}</div>
      
{/* ══ CURSOR (max z-index, always on top) ══ */}
<div id="cur-dot"></div>
<div id="cur-ring"></div>
<div id="prog"></div>

{/* SVG gradient for ring chart */}
<svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
  <defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#7c3aed"/>
      <stop offset="50%" stopColor="#2563eb"/>
      <stop offset="100%" stopColor="#06b6d4"/>
    </linearGradient>
  </defs>
</svg>

{/* NAV */}
<nav className="nav" id="nav">
  <div className="nav-in">
    <a href="/" className="logo"><div className="logo-i">R</div><span className="logo-t">Revti<span>Digital</span></span></a>
    <ul className="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/#portfolio">Projects</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
    <a href="/" className="nav-back" id="navBackBtn"><i className="fa-solid fa-arrow-left"></i> Back to Home</a>
    <button className="ham" id="ham" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</nav>



<div className="mob-nav" id="mob">
  <a href="/">Home</a>
  <a href="/#portfolio">Projects</a>
  <a href="/#contact">Contact</a>
</div>

{/* ══ HERO — CENTERED, ONE-LINE ══ */}
<header className="proj-hero">
  <div className="hero-mesh"></div>
  <div className="hero-grid-bg"></div>
  {/* <div className="hero-wm">HC</div> */}
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
      {/* ONE-LINE HEADING */}
      <h1 className="proj-h1">
        {project.title} <span className="grad">{project.year || ''}</span>
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

{/* ══ OVERVIEW + TECH ══ */}
<section className="proj-overview" id="overview">
  <div className="wrap">
    <div className="overview-grid">
      <div>
        <h2 className="sec-h2 rv" style={{ transitionDelay: ".1s", marginBottom: "56px" }}><span className="grad">Overview</span></h2>
        <h2 className="ov-big rv" style={{ transitionDelay: ".1s" }}>{project.overviewTitle || project.headline || project.title}</h2>
        {(project.description || project.shortDescription || project.tagline) && (
          <p className="ov-p rv" style={{ transitionDelay: ".15s" }}>{project.description || project.shortDescription || project.tagline}</p>
        )}
        {project.compliance && (
          <p className="ov-p rv" style={{ transitionDelay: ".2s" }}>{project.compliance}</p>
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

{/* ══ PROCESS ══ */}
{processSteps.length > 0 && (
<section className="proj-process" id="process">
  <div className="wrap">
    <h2 className="sec-h2 rv" style={{ transitionDelay: ".1s", marginBottom: "56px" }}>From discovery to <span className="grad">deployment</span></h2>
    <div className="timeline">
      {processSteps.map((step, index) => (
        <div className="tl-item rv" style={{ transitionDelay: `${index * 0.06}s` }} key={`${step.title}-${index}`}>
          <div className="tl-dot">{step.icon || '•'}</div>
          <div className="tl-body"><div className="tl-step">{step.step || `Phase ${String(index + 1).padStart(2, '0')}`}</div><h3 className="tl-title">{step.title}</h3><p className="tl-text">{step.text}</p></div>
        </div>
      ))}
    </div>
  </div>
</section>
)}

{/* 06. SCROLL REVEAL GALLERY (BRILIO STYLE) */}
<section id="project-gallery" className="sticky-section-gallery">
    <div className="gallery-scroll-container">
        <div className="gallery-header">
            {/* <span>VISUAL IDENTITY</span> */}
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

{/* ══ RESULTS — IMPACT ══ */}
{project.stats.length > 0 && (
<section className="proj-results" id="results">
  <div className="wrap impact-showcase">
    <h2 className="impact-title rv">Impact <span className="muted">Results</span></h2>
    <div className="impact-card-grid" aria-label="Impact result metrics">
      {project.stats.map((stat, index) => (
        <div className="impact-metric-card rv" style={{ transitionDelay: `${0.1 + index * 0.06}s` }} key={`${stat.label}-${index}`}>
          <span className="impact-metric-label">{stat.label}</span>
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

{/* Project Previous / Next */}
<div className="project-switcher" aria-label="Project navigation">
  <a className="project-switch project-prev" id="projectPrev" href={`/project/${prevId}`} aria-label="Previous project">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 20 8 12 16 4"></polyline></svg>
  </a>
  <a className="project-switch project-next" id="projectNext" href={`/project/${nextId}`} aria-label="Next project">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 20 16 12 8 4"></polyline></svg>
  </a>
</div>

{/* ══ SIMILAR ══ */}
<section className="proj-similar" id="similar">
  <div className="wrap">
    {/* <div className="sec-label rv"><span className="dot"></span> More Case Studies</div> */}
    <h2 className="sec-h2 rv" style={{ transitionDelay: ".1s" }}>Explore <span className="grad">related work</span></h2>
    <div className="sim-grid">
      {similarProjects.map(item => (
        <a href={`/project/${item.id}`} className="project-card" key={item.id}>
          <div className="card-visual"><div className="card-image-wrapper">
            {item.image ? <img src={item.image} alt={item.imageAlt || item.title} loading="lazy" /> : <div className="card-placeholder" style={{ background: item.placeholderGradient }}><span className="placeholder-icon">{item.icon || '✨'}</span></div>}
            <div className="card-overlay"><div className="overlay-content"><span className="overlay-category">{item.category}</span></div></div>
          </div></div>
          <div className="card-info"><h3 className="card-title">{item.title}</h3><div className="meta-container"><div className="card-tags">{item.tags.slice(0, 2).map(tag => <span className="tag" key={`${item.id}-${tag}`}>{tag}</span>)}</div><div className="show-project-view">Show Project</div></div></div>
        </a>
      ))}
    </div>
  </div>
</section>

{/* ══ BACK HOME ══ */}
{/* <div className="back-bar"><a href="/" className="back-btn"><i className="fa-solid fa-arrow-left"></i> Back to Home</a></div> */}

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
        <button type="button" className="modal-cancel-link" id="modalCancelBtn">No thanks, continue to Homepage</button>
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
