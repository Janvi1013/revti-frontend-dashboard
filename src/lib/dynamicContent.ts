export type ImpactStat = {
  value: string;
  target: string;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
};

export type LogoItem = { name: string };

export type ProjectDetail = {
  id: string;
  title: string;
  titleAccent: string;
  category: string;
  categoryIcon: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  overviewEyebrow: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  overviewCards: { icon: string; title: string; text: string }[];
  processTitle: string;
  processAccent: string;
  timeline: { icon: string; step: string; title: string; text: string }[];
  galleryTitle: string;
  galleryDescription: string;
  galleryImages: { src: string; alt: string }[];
  impactTitle: string;
  impactAccent: string;
  impactMetrics: { label: string; before: string; after: string; target: string; prefix?: string; suffix?: string }[];
  related: { id: string; title: string; category: string; tags: string[]; image?: string }[];
};

export const fallbackImpactStats: ImpactStat[] = [
  { value: '10+', target: '10', suffix: '+', label: 'Years of Experience', sub: 'Delivering results since 2018' },
  { value: '200+', target: '200', suffix: '+', label: 'Clients Served', sub: 'Across 8+ industries globally' },
  { value: '50+', target: '50', suffix: '+', label: 'Projects Delivered', sub: 'On time, on budget, on point' },
  { value: '8+', target: '8', suffix: '+', label: 'Industries Covered', sub: 'Focused expertise across growth sectors' },
];

export const fallbackLogos: LogoItem[] = [
  'Apollo Health', 'Zenith Realty', 'LuxeStore', 'OrganicBoost', 'FinEdge', 'IndustrIQ', 'NovaBrand', 'FoodieHub'
].map(name => ({ name }));

export const fallbackProjectDetail: ProjectDetail = {
  id: 'websites',
  title: 'HealthCore',
  titleAccent: 'Web Platform',
  category: 'Web Development · Healthcare',
  categoryIcon: '🏥',
  subtitle: 'AI-powered, HIPAA-compliant patient management serving 500+ hospitals — 40% fewer diagnostic errors and $12M in annual savings.',
  meta: [
    { label: 'Client', value: 'Apollo Health Systems' },
    { label: 'Industry', value: 'Healthcare / MedTech' },
    { label: 'Year', value: '2023 – 2024' },
    { label: 'Sprint', value: '18-Month Agile' },
  ],
  overviewEyebrow: 'Overview',
  overviewTitle: 'Revolutionising diagnostics with AI intelligence',
  overviewParagraphs: [
    'Apollo Health Systems faced fragmented patient data across 500+ facilities — overwhelming clinical staff and causing costly diagnostic delays. Revti Digital designed and engineered a unified AI-powered platform that connects every hospital, surfaces real-time insights, and assists physicians with evidence-based recommendations.',
    'Full HIPAA, HL7 FHIR R4, and ISO 27001 compliance from sprint one — zero security incidents since April 2024 launch.',
  ],
  overviewCards: [
    { icon: '🎯', title: 'The Challenge', text: '500+ hospitals, 15 different EMR systems, zero unified intelligence — causing diagnostic inconsistencies and dangerous data silos.' },
    { icon: '💡', title: 'Our Approach', text: 'Microservices with an AI inference engine, FHIR R4 federation layer, and a clinical-grade React UI with 200+ purpose-built components.' },
    { icon: '📈', title: 'The Impact', text: '40% fewer diagnostic errors, 3× faster reporting, $12M annual savings, 99.99% uptime across all 500+ hospitals.' },
    { icon: '🛡️', title: 'Compliance First', text: 'Full HIPAA, HL7 FHIR R4, and ISO 27001 compliance baked in from sprint one — zero security incidents since launch.' },
  ],
  processTitle: 'From discovery to',
  processAccent: 'deployment',
  timeline: [
    { icon: '🔍', step: 'Phase 01 · Weeks 1–4', title: 'Discovery & Research', text: '80+ stakeholder interviews across 12 hospitals. Mapped 200+ clinical workflows and synthesised 40 pain points into a strategic platform blueprint.' },
    { icon: '📐', step: 'Phase 02 · Weeks 5–10', title: 'Architecture & Strategy', text: 'Designed a microservices platform with FastAPI backend, TensorFlow AI models, React frontend, AWS GovCloud infrastructure, and FHIR R4 API layer unifying 15 EMR systems.' },
    { icon: '🎨', step: 'Phase 03 · Weeks 8–16', title: 'Design & Prototyping', text: 'Clinical-grade design system with 200+ components. Six rounds of usability testing with actual clinicians. WCAG 2.1 AA accessibility enforced from first wireframe.' },
    { icon: '⚙️', step: 'Phase 04 · Weeks 12–52', title: 'Engineering & AI Development', text: '18-person team across four tracks: AI model training (12 models, 2M+ medical images), backend, frontend, and EMR integrations with Epic, Oracle Health, and Meditech.' },
    { icon: '🚀', step: 'Phase 05 · Month 18', title: 'Deployment & Scale', text: 'Blue-green rollout across 500+ hospitals with zero downtime. 12,000 clinical staff trained in 90 days. Continuous anomaly detection ensures 99.99% uptime.' },
  ],
  galleryTitle: 'Brand Showcase',
  galleryDescription: 'Observe the fluid left-to-right scroll reveal transition on each visual asset.',
  galleryImages: [
    { src: '/Images/Gemini_Generated_Image_39dgf639dgf639dg.png', alt: 'Brand Asset 01' },
    { src: '/Images/Gemini_Generated_Image_4wbmmb4wbmmb4wbm.png', alt: 'Brand Asset 02' },
    { src: '/Images/Gemini_Generated_Image_56kvyt56kvyt56kv.png', alt: 'Brand Asset 03' },
    { src: '/Images/Gemini_Generated_Image_5iyked5iyked5iyk.png', alt: 'Brand Asset 04' },
  ],
  impactTitle: 'Impact',
  impactAccent: 'Results',
  impactMetrics: [
    { label: 'Diagnostic Errors', before: '10×', after: '40%', target: '40', suffix: '%' },
    { label: 'Reporting Speed', before: '1×', after: '3×', target: '3', suffix: '×' },
    { label: 'Annual Savings', before: '$0', after: '$12M', target: '12', prefix: '$', suffix: 'M' },
    { label: 'Hospitals Connected', before: '1', after: '500+', target: '500', suffix: '+' },
  ],
  related: [
    { id: 'seo', title: 'OrganicBoost SEO Campaign', category: 'SEO', tags: ['SEO', 'Branding'], image: '/Images/Gemini_Generated_Image_7pjuoj7pjuoj7pju.png' },
    { id: 'ecommerce', title: 'LuxeStore Commerce', category: 'UI/UX', tags: ['UI/UX', 'E-commerce'], image: '/Images/Gemini_Generated_Image_56kvyt56kvyt56kv.png' },
    { id: 'branding', title: 'Zenith Realty Rebrand', category: 'Branding', tags: ['Branding', 'Web Design'], image: '/Images/Gemini_Generated_Image_9hy5999hy5999hy5.png' },
  ],
};

export function pickArray(source: any, keys: string[]) {
  if (Array.isArray(source)) return source;
  for (const key of keys) if (Array.isArray(source?.[key])) return source[key];
  return [];
}

export function str(source: any, keys: string[], fallback = '') {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number') return String(value);
  }
  return fallback;
}

export function normalizeImpactStats(payload: any, fallback = fallbackImpactStats): ImpactStat[] {
  const rows = pickArray(payload, ['impact', 'impactStats', 'stats', 'metrics']);
  if (!rows.length) return fallback;
  return rows.map((item: any, index: number) => ({
    value: str(item, ['value', 'displayValue', 'number'], fallback[index]?.value || ''),
    target: str(item, ['target', 'count', 'number'], (fallback[index]?.target || '0').replace(/[^0-9.]/g, '')),
    suffix: str(item, ['suffix'], fallback[index]?.suffix || ''),
    prefix: str(item, ['prefix'], fallback[index]?.prefix || ''),
    label: str(item, ['label', 'title', 'name'], fallback[index]?.label || ''),
    sub: str(item, ['sub', 'subtitle', 'description'], fallback[index]?.sub || ''),
  })).filter((item: ImpactStat) => item.label);
}

export function normalizeLogos(payload: any): LogoItem[] {
  const rows = pickArray(payload, ['logos', 'clients', 'brands']);
  if (!rows.length) return fallbackLogos;
  return rows.map((item: any) => ({ name: typeof item === 'string' ? item : str(item, ['name', 'title', 'clientName']) })).filter((item: LogoItem) => item.name);
}

export function normalizeProjectDetail(payload: any, id: string): ProjectDetail {
  const project = payload?.data || payload?.project || payload?.portfolio || payload || {};
  const fallback = { ...fallbackProjectDetail, id };
  const meta = pickArray(project, ['meta', 'details']).map((item: any) => ({ label: str(item, ['label', 'name']), value: str(item, ['value', 'text']) })).filter((item: any) => item.label && item.value);
  const overviewParagraphs = pickArray(project, ['overviewParagraphs', 'overview']).map((item: any) => typeof item === 'string' ? item : str(item, ['text', 'description'])).filter(Boolean);
  const overviewCards = pickArray(project, ['overviewCards', 'cards']).map((item: any) => ({ icon: str(item, ['icon'], '✨'), title: str(item, ['title', 'label']), text: str(item, ['text', 'description']) })).filter((item: any) => item.title && item.text);
  const timeline = pickArray(project, ['timeline', 'process']).map((item: any) => ({ icon: str(item, ['icon'], '•'), step: str(item, ['step', 'phase']), title: str(item, ['title']), text: str(item, ['text', 'description']) })).filter((item: any) => item.title && item.text);
  const galleryImages = pickArray(project, ['galleryImages', 'images', 'gallery']).map((item: any, index: number) => ({ src: typeof item === 'string' ? item : str(item, ['src', 'url', 'image', 'imageUrl']), alt: typeof item === 'string' ? `Gallery image ${index + 1}` : str(item, ['alt', 'title'], `Gallery image ${index + 1}`) })).filter((item: any) => item.src);
  const impactMetrics = pickArray(project, ['impactMetrics', 'results', 'impact']).map((item: any) => ({ label: str(item, ['label', 'title']), before: str(item, ['before'], '—'), after: str(item, ['after', 'value']), target: str(item, ['target'], str(item, ['after', 'value']).replace(/[^0-9.]/g, '')), prefix: str(item, ['prefix']), suffix: str(item, ['suffix']) })).filter((item: any) => item.label && item.after);
  const related = pickArray(project, ['related', 'relatedProjects']).map((item: any) => ({ id: str(item, ['slug', 'id', '_id']), title: str(item, ['title', 'name']), category: str(item, ['category'], 'Project'), tags: pickArray(item, ['tags', 'services']).map((tag: any) => typeof tag === 'string' ? tag : str(tag, ['name'])).filter(Boolean).slice(0, 3), image: str(item, ['image', 'imageUrl', 'thumbnail']) })).filter((item: any) => item.id && item.title);
  return {
    ...fallback,
    id: str(project, ['slug', 'id', '_id'], fallback.id),
    title: str(project, ['title', 'name'], fallback.title),
    titleAccent: str(project, ['titleAccent', 'accentTitle', 'subtitleTitle'], fallback.titleAccent),
    category: str(project, ['category', 'type', 'industry'], fallback.category),
    categoryIcon: str(project, ['categoryIcon', 'icon', 'emoji'], fallback.categoryIcon),
    subtitle: str(project, ['subtitle', 'description', 'summary'], fallback.subtitle),
    meta: meta.length ? meta : fallback.meta,
    overviewEyebrow: str(project, ['overviewEyebrow'], fallback.overviewEyebrow),
    overviewTitle: str(project, ['overviewTitle'], fallback.overviewTitle),
    overviewParagraphs: overviewParagraphs.length ? overviewParagraphs : fallback.overviewParagraphs,
    overviewCards: overviewCards.length ? overviewCards : fallback.overviewCards,
    processTitle: str(project, ['processTitle'], fallback.processTitle),
    processAccent: str(project, ['processAccent'], fallback.processAccent),
    timeline: timeline.length ? timeline : fallback.timeline,
    galleryTitle: str(project, ['galleryTitle'], fallback.galleryTitle),
    galleryDescription: str(project, ['galleryDescription'], fallback.galleryDescription),
    galleryImages: galleryImages.length ? galleryImages : fallback.galleryImages,
    impactTitle: str(project, ['impactTitle'], fallback.impactTitle),
    impactAccent: str(project, ['impactAccent'], fallback.impactAccent),
    impactMetrics: impactMetrics.length ? impactMetrics : fallback.impactMetrics,
    related: related.length ? related : fallback.related,
  };
}
