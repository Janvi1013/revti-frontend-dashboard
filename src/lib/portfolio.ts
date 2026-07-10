import { supabase } from './supabase';

export type PortfolioStat = {
  num?: string;
  label?: string;
  before?: string;
  after?: string;
};

export type PortfolioFeedback = {
  name?: string;
  role?: string;
  text?: string;
};

export type PortfolioImpactMetric = {
  value: number;
  displayValue: string;
  suffix: string;
  label: string;
  sub: string;
};

export type HomeHeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  primaryIcon: string;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryIcon: string;
};

export type ContactSectionContent = {
  heading: string;
  highlight: string;
  buttonLabel: string;
  buttonHref: string;
};

export type ClientLogo = {
  id: string;
  name: string;
  image: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  href: string;
  icon?: string;
};

export type PortfolioProcessStep = {
  icon?: string;
  step?: string;
  title?: string;
  text?: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  year?: string;
  client?: string;
  tagline?: string;
  headline?: string;
  description?: string;
  shortDescription?: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  gallery: string[];
  stats: PortfolioStat[];
  industry?: string;
  sprint?: string;
  overviewTitle?: string;
  challenge?: string;
  approach?: string;
  impact?: string;
  compliance?: string;
  process: PortfolioProcessStep[];
  feedback: PortfolioFeedback[];
  clientLogo?: string;
  videoType?: string;
  videoUrl?: string;
  icon?: string;
  placeholderGradient?: string;
};

export const fallbackPortfolioProjects: PortfolioProject[] = [
  { id: 'branding', title: 'Zenith Realty Rebrand', category: 'Branding', tags: ['Brand Identity', 'Visual Design', 'Guidelines'], image: '/Images/Gemini_Generated_Image_9hy5999hy5999hy5.png', imageAlt: 'Zenith Realty', gallery: [], stats: [], process: [], feedback: [] },
  { id: 'websites', title: 'Healthcare Platform', category: 'Websites', tags: ['Healthcare', 'SaaS', 'Dashboard'], image: '/Images/Gemini_Generated_Image_9y2spc9y2spc9y2s.png', imageAlt: 'HealthCore Platform', gallery: [], stats: [], process: [], feedback: [] },
  { id: 'events', title: 'LuxeStore Commerce', category: 'Events', tags: ['E-Commerce', 'UX Research', 'Design System'], image: '/Images/Gemini_Generated_Image_56kvyt56kvyt56kv.png', imageAlt: 'LuxeStore Commerce', gallery: [], stats: [], process: [], feedback: [] },
  { id: 'nova', title: 'FitTrack Pro', category: 'Publication', tags: ['iOS', 'Android', 'Health'], icon: '📱', placeholderGradient: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))', gallery: [], stats: [], process: [], feedback: [] },
  { id: 'mfg', title: 'IndustrIQ IoT Dashboard', category: 'Publication', tags: ['React', 'IoT', 'Real-time'], icon: '🏭', placeholderGradient: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.2))', gallery: [], stats: [], process: [], feedback: [] },
  { id: 'seo', title: 'OrganicBoost SEO Campaign', category: 'Websites', tags: ['SEO', 'Marketing', 'Growth'], image: '/Images/Gemini_Generated_Image_7pjuoj7pjuoj7pju.png', imageAlt: 'OrganicBoost', gallery: [], stats: [], process: [], feedback: [] },
  { id: 'social', title: 'ArtFlow Creative Platform', category: 'Interiors', tags: ['Creative', 'Collaboration', 'SaaS'], icon: '🎨', placeholderGradient: 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(124,58,237,0.2))', gallery: [], stats: [], process: [], feedback: [] },
  { id: 'fintech', title: 'PayWise Finance App', category: 'Packaging', tags: ['Fintech', 'Payments', 'Security'], icon: '💰', placeholderGradient: 'linear-gradient(135deg, rgba(34,197,94,0.3), rgba(6,182,212,0.2))', gallery: [], stats: [], process: [], feedback: [] },
  { id: 'ecommerce', title: 'FoodieHub Delivery Platform', category: 'Events', tags: ['Food Tech', 'Marketplace', 'UX'], icon: '🍔', placeholderGradient: 'linear-gradient(135deg, rgba(251,146,60,0.3), rgba(236,72,153,0.2))', gallery: [], stats: [], process: [], feedback: [] },
];

const getBackendBaseUrl = (): string => process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || '';

export const fallbackImpactMetrics: PortfolioImpactMetric[] = [
  { value: 10, displayValue: '10+', suffix: '+', label: 'Years of Experience', sub: 'Delivering results since 2018' },
  { value: 200, displayValue: '200+', suffix: '+', label: 'Clients Served', sub: 'Across 8+ industries globally' },
  { value: 50, displayValue: '50+', suffix: '+', label: 'Projects Delivered', sub: 'On time, on budget, on point' },
  { value: 8, displayValue: '8+', suffix: '+', label: 'Industries Covered', sub: 'Focused expertise across growth sectors' },
];

export const fallbackHomeHeroContent: HomeHeroContent = {
  eyebrow: 'Digital Agency · Est. 2018',
  title: 'We Make Digital Matter.',
  highlight: 'Digital',
  subtitle: 'From SEO-driven growth strategies to full-scale enterprise software — Revti Digital builds things that perform.',
  primaryLabel: 'View Our Work',
  primaryHref: '#portfolio',
  primaryIcon: 'fa-arrow-down',
  secondaryLabel: 'Start a Project',
  secondaryHref: '#contact',
  secondaryIcon: 'fa-paper-plane',
};

export const fallbackContactSectionContent: ContactSectionContent = {
  heading: "Let's Create Something Together",
  highlight: 'Together',
  buttonLabel: 'Get In Touch!',
  buttonHref: 'mailto:hello@revtidigital.com',
};

export const fallbackClientLogos: ClientLogo[] = [
  'Apollo Health',
  'Zenith Realty',
  'LuxeStore',
  'OrganicBoost',
  'FinEdge',
  'IndustrIQ',
  'NovaBrand',
  'FoodieHub',
].map((name) => ({ id: name, name, image: '' }));

export const fallbackSocialLinks: SocialLink[] = [
  { id: 'instagram', platform: 'Instagram', href: '#', icon: 'fa-instagram' },
  { id: 'twitter', platform: 'Twitter/X', href: '#', icon: 'fa-twitter' },
  { id: 'linkedin', platform: 'LinkedIn', href: '#', icon: 'fa-linkedin' },
];

const getStringValue = (source: any, keys: string[]): string => {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number') return String(value);
    if (value && typeof value === 'object') {
      const nestedValue = getStringValue(value, ['url', 'src', 'path', 'secure_url', 'location', 'name', 'title', 'label', 'text']);
      if (nestedValue) return nestedValue;
    }
  }
  return '';
};

const resolveAssetUrl = (value: string): string => {
  if (!value) return '';
  if (/^(https?:|data:|blob:|\/)/.test(value)) {
    if (value.startsWith('/uploads') || value.startsWith('/media') || value.startsWith('/storage')) {
      const apiBaseUrl = getBackendBaseUrl();
      return apiBaseUrl ? `${apiBaseUrl}${value}` : value;
    }
    return value;
  }

  const apiBaseUrl = getBackendBaseUrl();
  return apiBaseUrl ? `${apiBaseUrl}/${value.replace(/^\/+/, '')}` : value;
};

const splitMetricDisplayValue = (displayValue: string) => {
  const match = displayValue.trim().match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { value: 0, suffix: '' };
  return { value: Number(match[1]), suffix: match[2] || '' };
};

const getNumberValue = (source: any, keys: string[]): number | null => {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
      const parsed = Number(value.replace(/[^0-9.-]/g, ''));
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
};

const asStringArray = (value: any): string[] => {
  if (Array.isArray(value)) {
    return value
      .map(item => typeof item === 'string' ? item : getStringValue(item, ['url', 'src', 'path', 'secure_url', 'location', 'name', 'title', 'label', 'text']))
      .filter(Boolean);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    if (trimmed.startsWith('[')) {
      try {
        return asStringArray(JSON.parse(trimmed));
      } catch {
        return [];
      }
    }

    return trimmed.split(',').map(item => item.trim()).filter(Boolean);
  }
  return [];
};

const asJsonArray = <T>(value: any): T[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

const getRawPortfolioProjects = (payload: any): any[] => {
  const candidates = [
    payload,
    payload?.data,
    payload?.portfolio,
    payload?.projects,
    payload?.items,
    payload?.results,
    payload?.data?.data,
    payload?.data?.portfolio,
    payload?.data?.projects,
    payload?.data?.items,
    payload?.data?.results,
    payload?.data?.docs,
    payload?.docs,
  ];

  return candidates.find(Array.isArray) || [];
};

export const normalizePortfolioProject = (item: any, index: number): PortfolioProject | null => {
  const title = getStringValue(item, ['title', 'name', 'projectTitle', 'clientName']);
  if (!title) return null;

  const id = getStringValue(item, ['slug', 'id', '_id']) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `portfolio-${index + 1}`;
  const category = getStringValue(item, ['cat', 'category', 'type', 'portfolioCategory']) || 'Portfolio';
  const tags = asStringArray(item?.tags || item?.technologies || item?.services || item?.skills).slice(0, 4);
  const image = resolveAssetUrl(getStringValue(item, ['thumb', 'image', 'imageUrl', 'thumbnail', 'thumbnailUrl', 'coverImage', 'coverImageUrl']));
  const gallery = asStringArray(item?.gallery).map(resolveAssetUrl);
  const categoryName = getStringValue(item, ['category_name', 'categoryName']) || getStringValue(item?.category, ['name', 'title', 'label']);

  return {
    id,
    title,
    category: categoryName || category,
    year: getStringValue(item, ['year']),
    client: getStringValue(item, ['client', 'clientName']),
    tagline: getStringValue(item, ['tagline']),
    headline: getStringValue(item, ['headline']),
    description: getStringValue(item, ['desc', 'description']),
    shortDescription: getStringValue(item, ['shortDesc', 'shortDescription', 'excerpt']),
    tags: tags.length ? tags : ['Case Study'],
    image,
    imageAlt: getStringValue(item, ['imageAlt', 'alt']) || title,
    gallery: gallery.length ? gallery : (image ? [image] : []),
    stats: asJsonArray<PortfolioStat>(item?.stats),
    industry: getStringValue(item, ['industry']),
    sprint: getStringValue(item, ['sprint']),
    overviewTitle: getStringValue(item, ['overview_title', 'overviewTitle']),
    challenge: getStringValue(item, ['challenge']),
    approach: getStringValue(item, ['approach']),
    impact: getStringValue(item, ['impact']),
    compliance: getStringValue(item, ['compliance']),
    process: asJsonArray<any>(item?.process).map((p: any) => ({
      icon: p?.icon || '✨',
      step: getStringValue(p, ['phase', 'step']),
      title: getStringValue(p, ['title']),
      text: getStringValue(p, ['description', 'text']),
    })),
    feedback: asJsonArray<PortfolioFeedback>(item?.feedback).map((f: any) => ({
      name: getStringValue(f, ['name']),
      role: getStringValue(f, ['role', 'designation', 'title']),
      text: getStringValue(f, ['text', 'quote', 'feedback']),
    })).filter(f => f.name || f.text),
    clientLogo: resolveAssetUrl(getStringValue(item, ['client_logo', 'clientLogo'])),
    videoType: getStringValue(item, ['video_type', 'videoType']),
    videoUrl: resolveAssetUrl(getStringValue(item, ['video_url', 'videoUrl'])),
    icon: '✨',
    placeholderGradient: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
  };
};

export const extractPortfolioProjects = (payload: any) => {
  const rawProjects = getRawPortfolioProjects(payload);
  return rawProjects.map(normalizePortfolioProject).filter((project): project is PortfolioProject => Boolean(project));
};

export const getPortfolioApiUrl = (path = '/api/portfolio') => {
  const apiBaseUrl = getBackendBaseUrl();
  return apiBaseUrl ? `${apiBaseUrl}${path}` : path;
};

export const fetchPortfolioProjects = async (): Promise<PortfolioProject[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('sequence', { ascending: true });

    if (error) {
      console.error('Error fetching projects from Supabase:', error);
      return [];
    }

    if (!data || data.length === 0) return [];

    const { data: categories } = await supabase
      .from('project_categories')
      .select('name, slug');
    const categoryNames = new Map((categories || []).map((category: any) => [category.slug, category.name]));

    return data
      .map((item, index) => normalizePortfolioProject({
        ...item,
        category_name: categoryNames.get(item?.cat) || item?.category_name,
      }, index))
      .filter((project): project is PortfolioProject => Boolean(project));
  } catch (err) {
    console.error('Unexpected error fetching projects from Supabase:', err);
    return [];
  }
};

export const fetchImpactMetrics = async (projects: PortfolioProject[] = []): Promise<PortfolioImpactMetric[]> => {
  const normalizeMetric = (item: any): PortfolioImpactMetric | null => {
    const label = getStringValue(item, ['label', 'title', 'name']);
    const rawDisplayValue = getStringValue(item, ['value', 'num', 'number', 'count']);
    const parsedDisplayValue = splitMetricDisplayValue(rawDisplayValue);
    const value = getNumberValue(item, ['target', 'numeric_value', 'numericValue']) ?? parsedDisplayValue.value;
    const suffix = getStringValue(item, ['suffix']) || parsedDisplayValue.suffix;
    if (!label || !rawDisplayValue) return null;
    return {
      value,
      displayValue: `${value}${suffix}` || rawDisplayValue,
      suffix,
      label,
      sub: getStringValue(item, ['short_desc', 'shortDesc', 'sub', 'subtitle', 'description', 'text']),
    };
  };

  for (const { table, order } of [
    { table: 'impact_numbers', order: 'display_order' },
    { table: 'homepage_stats', order: 'sequence' },
    { table: 'impact_metrics', order: 'sequence' },
  ]) {
    try {
      const { data, error } = await supabase.from(table).select('*').order(order, { ascending: true });

      if (!error && data?.length) {
        const metrics = data
          .filter((item: any) => item?.is_active !== false && item?.active !== false && !item?.deleted_at)
          .map(normalizeMetric)
          .filter((metric): metric is PortfolioImpactMetric => Boolean(metric));
        if (metrics.length) return metrics;
      }
    } catch {
      // Try the next known stats table name, then fall back below.
    }
  }

  if (!projects.length) return fallbackImpactMetrics;

  const currentYear = new Date().getFullYear();
  const years = projects.map(project => Number(project.year)).filter(year => Number.isFinite(year) && year > 1900);
  const earliestYear = years.length ? Math.min(...years) : 2018;
  const clients = new Set(projects.map(project => project.client).filter(Boolean));
  const industries = new Set(projects.map(project => project.industry || project.category).filter(Boolean));

  return [
    { value: Math.max(1, currentYear - earliestYear + 1), displayValue: `${Math.max(1, currentYear - earliestYear + 1)}+`, suffix: '+', label: 'Years of Experience', sub: `Delivering results since ${earliestYear}` },
    { value: clients.size || projects.length, displayValue: `${clients.size || projects.length}+`, suffix: '+', label: 'Clients Served', sub: `Across ${industries.size || 1}+ industries globally` },
    { value: projects.length, displayValue: `${projects.length}+`, suffix: '+', label: 'Projects Delivered', sub: 'On time, on budget, on point' },
    { value: industries.size || 1, displayValue: `${industries.size || 1}+`, suffix: '+', label: 'Industries Covered', sub: 'Focused expertise across growth sectors' },
  ];
};

const getSiteSettingValue = async (key: string): Promise<any | null> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single();

  if (error) return null;
  return data?.value || null;
};

export const fetchHomeHeroContent = async (): Promise<HomeHeroContent> => {
  const value = await getSiteSettingValue('hero_section');
  if (!value) return fallbackHomeHeroContent;

  const buttons = Array.isArray(value.buttons) ? value.buttons : [];
  const primaryButton = buttons[0] || {};
  const secondaryButton = buttons[1] || {};

  return {
    eyebrow: getStringValue(value, ['tagline', 'eyebrow', 'kicker', 'badge']) || fallbackHomeHeroContent.eyebrow,
    title: getStringValue(value, ['heading', 'title', 'headline']) || fallbackHomeHeroContent.title,
    highlight: getStringValue(value, ['heading_highlight', 'highlight', 'title_highlight']) || fallbackHomeHeroContent.highlight,
    subtitle: getStringValue(value, ['sub_heading', 'subtitle', 'subTitle', 'description', 'text']) || fallbackHomeHeroContent.subtitle,
    primaryLabel: getStringValue(primaryButton, ['text', 'label', 'title']) || fallbackHomeHeroContent.primaryLabel,
    primaryHref: getStringValue(primaryButton, ['link', 'href', 'url']) || fallbackHomeHeroContent.primaryHref,
    primaryIcon: getStringValue(primaryButton, ['icon']) || fallbackHomeHeroContent.primaryIcon,
    secondaryLabel: getStringValue(secondaryButton, ['text', 'label', 'title']) || fallbackHomeHeroContent.secondaryLabel,
    secondaryHref: getStringValue(secondaryButton, ['link', 'href', 'url']) || fallbackHomeHeroContent.secondaryHref,
    secondaryIcon: getStringValue(secondaryButton, ['icon']) || fallbackHomeHeroContent.secondaryIcon,
  };
};

export const fetchContactSectionContent = async (): Promise<ContactSectionContent> => {
  const value = await getSiteSettingValue('contact_section');
  if (!value) return fallbackContactSectionContent;
  const button = value.button || {};

  return {
    heading: getStringValue(value, ['heading', 'title']) || fallbackContactSectionContent.heading,
    highlight: getStringValue(value, ['heading_highlight', 'highlight']) || fallbackContactSectionContent.highlight,
    buttonLabel: getStringValue(button, ['text', 'label', 'title']) || fallbackContactSectionContent.buttonLabel,
    buttonHref: getStringValue(button, ['link', 'href', 'url']) || fallbackContactSectionContent.buttonHref,
  };
};

export const fetchClientLogos = async (): Promise<ClientLogo[]> => {
  const { data, error } = await supabase
    .from('client_logos')
    .select('id, client_name, logo_image, display_order, is_active, deleted_at')
    .order('display_order', { ascending: true });

  if (error || !data?.length) return fallbackClientLogos;

  const logos = data
    .filter((item: any) => item?.is_active !== false && !item?.deleted_at)
    .map((item: any) => ({
      id: getStringValue(item, ['id']) || getStringValue(item, ['client_name']),
      name: getStringValue(item, ['client_name']) || 'Client logo',
      image: resolveAssetUrl(getStringValue(item, ['logo_image'])),
    }))
    .filter(logo => logo.id && (logo.name || logo.image));

  return logos.length ? logos : fallbackClientLogos;
};

export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  const { data, error } = await supabase
    .from('social_links')
    .select('id, platform, profile_url, icon, display_order, is_active, deleted_at')
    .order('display_order', { ascending: true });

  if (error || !data?.length) return fallbackSocialLinks;

  const links = data
    .filter((item: any) => item?.is_active !== false && !item?.deleted_at)
    .map((item: any) => ({
      id: getStringValue(item, ['id']) || getStringValue(item, ['platform']),
      platform: getStringValue(item, ['platform']),
      href: getStringValue(item, ['profile_url']),
      icon: getStringValue(item, ['icon']),
    }))
    .filter(link => link.id && link.platform && link.href);

  return links.length ? links : fallbackSocialLinks;
};

