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
  suffix: string;
  label: string;
  sub: string;
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
  { value: 10, suffix: '+', label: 'Years of Experience', sub: 'Delivering results since 2018' },
  { value: 200, suffix: '+', label: 'Clients Served', sub: 'Across 8+ industries globally' },
  { value: 50, suffix: '+', label: 'Projects Delivered', sub: 'On time, on budget, on point' },
  { value: 8, suffix: '+', label: 'Industries Covered', sub: 'Focused expertise across growth sectors' },
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
    const value = getNumberValue(item, ['value', 'num', 'number', 'count']);
    if (!label || value === null) return null;
    return {
      value,
      suffix: getStringValue(item, ['suffix']) || '',
      label,
      sub: getStringValue(item, ['sub', 'subtitle', 'description', 'text']),
    };
  };

  try {
    const { data, error } = await supabase
      .from('impact_metrics')
      .select('*')
      .order('sequence', { ascending: true });

    if (!error && data?.length) {
      const metrics = data.map(normalizeMetric).filter((metric): metric is PortfolioImpactMetric => Boolean(metric));
      if (metrics.length) return metrics;
    }
  } catch (err) {
    console.warn('Unable to fetch impact_metrics from Supabase; deriving home impact metrics from projects.', err);
  }

  if (!projects.length) return fallbackImpactMetrics;

  const currentYear = new Date().getFullYear();
  const years = projects.map(project => Number(project.year)).filter(year => Number.isFinite(year) && year > 1900);
  const earliestYear = years.length ? Math.min(...years) : 2018;
  const clients = new Set(projects.map(project => project.client).filter(Boolean));
  const industries = new Set(projects.map(project => project.industry || project.category).filter(Boolean));

  return [
    { value: Math.max(1, currentYear - earliestYear + 1), suffix: '+', label: 'Years of Experience', sub: `Delivering results since ${earliestYear}` },
    { value: clients.size || projects.length, suffix: '+', label: 'Clients Served', sub: `Across ${industries.size || 1}+ industries globally` },
    { value: projects.length, suffix: '+', label: 'Projects Delivered', sub: 'On time, on budget, on point' },
    { value: industries.size || 1, suffix: '+', label: 'Industries Covered', sub: 'Focused expertise across growth sectors' },
  ];
};
