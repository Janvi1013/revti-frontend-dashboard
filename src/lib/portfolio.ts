export type PortfolioStat = {
  num?: string;
  label?: string;
  before?: string;
  after?: string;
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
  icon?: string;
  placeholderGradient?: string;
};

export const fallbackPortfolioProjects: PortfolioProject[] = [
  { id: 'branding', title: 'Zenith Realty Rebrand', category: 'Branding', tags: ['Brand Identity', 'Visual Design', 'Guidelines'], image: '/Images/Gemini_Generated_Image_9hy5999hy5999hy5.png', imageAlt: 'Zenith Realty', gallery: [], stats: [], process: [] },
  { id: 'websites', title: 'Healthcare Platform', category: 'Websites', tags: ['Healthcare', 'SaaS', 'Dashboard'], image: '/Images/Gemini_Generated_Image_9y2spc9y2spc9y2s.png', imageAlt: 'HealthCore Platform', gallery: [], stats: [], process: [] },
  { id: 'events', title: 'LuxeStore Commerce', category: 'Events', tags: ['E-Commerce', 'UX Research', 'Design System'], image: '/Images/Gemini_Generated_Image_56kvyt56kvyt56kv.png', imageAlt: 'LuxeStore Commerce', gallery: [], stats: [], process: [] },
  { id: 'nova', title: 'FitTrack Pro', category: 'Publication', tags: ['iOS', 'Android', 'Health'], icon: '📱', placeholderGradient: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))', gallery: [], stats: [], process: [] },
  { id: 'mfg', title: 'IndustrIQ IoT Dashboard', category: 'Publication', tags: ['React', 'IoT', 'Real-time'], icon: '🏭', placeholderGradient: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.2))', gallery: [], stats: [], process: [] },
  { id: 'seo', title: 'OrganicBoost SEO Campaign', category: 'Websites', tags: ['SEO', 'Marketing', 'Growth'], image: '/Images/Gemini_Generated_Image_7pjuoj7pjuoj7pju.png', imageAlt: 'OrganicBoost', gallery: [], stats: [], process: [] },
  { id: 'social', title: 'ArtFlow Creative Platform', category: 'Interiors', tags: ['Creative', 'Collaboration', 'SaaS'], icon: '🎨', placeholderGradient: 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(124,58,237,0.2))', gallery: [], stats: [], process: [] },
  { id: 'fintech', title: 'PayWise Finance App', category: 'Packaging', tags: ['Fintech', 'Payments', 'Security'], icon: '💰', placeholderGradient: 'linear-gradient(135deg, rgba(34,197,94,0.3), rgba(6,182,212,0.2))', gallery: [], stats: [], process: [] },
  { id: 'ecommerce', title: 'FoodieHub Delivery Platform', category: 'Events', tags: ['Food Tech', 'Marketplace', 'UX'], icon: '🍔', placeholderGradient: 'linear-gradient(135deg, rgba(251,146,60,0.3), rgba(236,72,153,0.2))', gallery: [], stats: [], process: [] },
];

const getStringValue = (source: any, keys: string[]) => {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number') return String(value);
  }
  return '';
};

const asStringArray = (value: any) => {
  if (Array.isArray(value)) return value.map(item => typeof item === 'string' ? item : getStringValue(item, ['name', 'title', 'label', 'text'])).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map(item => item.trim()).filter(Boolean);
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

export const normalizePortfolioProject = (item: any, index: number): PortfolioProject | null => {
  const title = getStringValue(item, ['title', 'name', 'projectTitle', 'clientName']);
  if (!title) return null;

  const id = getStringValue(item, ['slug', 'id', '_id']) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `portfolio-${index + 1}`;
  const category = getStringValue(item, ['cat', 'category', 'type', 'portfolioCategory']) || 'Portfolio';
  const tags = asStringArray(item?.tags || item?.technologies || item?.services || item?.skills).slice(0, 4);
  const image = getStringValue(item, ['thumb', 'image', 'imageUrl', 'thumbnail', 'thumbnailUrl', 'coverImage', 'coverImageUrl']);

  return {
    id,
    title,
    category,
    year: getStringValue(item, ['year']),
    client: getStringValue(item, ['client', 'clientName']),
    tagline: getStringValue(item, ['tagline']),
    headline: getStringValue(item, ['headline']),
    description: getStringValue(item, ['desc', 'description']),
    shortDescription: getStringValue(item, ['shortDesc', 'shortDescription', 'excerpt']),
    tags: tags.length ? tags : ['Case Study'],
    image,
    imageAlt: getStringValue(item, ['imageAlt', 'alt']) || title,
    gallery: asStringArray(item?.gallery).length ? asStringArray(item?.gallery) : (image ? [image] : []),
    stats: asJsonArray<PortfolioStat>(item?.stats),
    industry: getStringValue(item, ['industry']),
    sprint: getStringValue(item, ['sprint']),
    overviewTitle: getStringValue(item, ['overview_title', 'overviewTitle']),
    challenge: getStringValue(item, ['challenge']),
    approach: getStringValue(item, ['approach']),
    impact: getStringValue(item, ['impact']),
    compliance: getStringValue(item, ['compliance']),
    process: asJsonArray<PortfolioProcessStep>(item?.process),
    icon: '✨',
    placeholderGradient: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
  };
};

export const extractPortfolioProjects = (payload: any) => {
  const rawProjects = Array.isArray(payload) ? payload : payload?.data || payload?.portfolio || payload?.projects || [];
  return Array.isArray(rawProjects)
    ? rawProjects.map(normalizePortfolioProject).filter((project): project is PortfolioProject => Boolean(project))
    : [];
};

export const getPortfolioApiUrl = (path = '/api/portfolio') => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '');
  return apiBaseUrl ? `${apiBaseUrl}${path}` : '';
};
