import { fetchPortfolioApiData, getBackendBaseUrl } from './api/portfolio';
import type { PortfolioApiData, ProjectCategory } from './api/types';

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
  primaryNewTab?: boolean;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryIcon: string;
  secondaryNewTab?: boolean;
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

export type WebsiteContent = {
  projects: PortfolioProject[];
  categories: string[];
  heroContent: HomeHeroContent | null;
  contactContent: ContactSectionContent | null;
  impactMetrics: PortfolioImpactMetric[];
  clientLogos: ClientLogo[];
  socialLinks: SocialLink[];
};

export type WebsiteContentLoadResult =
  | { ok: true; content: WebsiteContent; usedFallback: false }
  | { ok: false; content: WebsiteContent; usedFallback: true; error: Error };

export type PortfolioProcessStep = {
  icon?: string;
  step?: string;
  title?: string;
  text?: string;
};

export type ProjectReelSection = {
  enabled: boolean;
  title?: string;
  description?: string;
  videoUrl?: string;
  videoUploadUrl?: string;
  videoLinkUrl?: string;
  posterUrl?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export type ProjectSectionVisibility = {
  overview?: boolean;
  process?: boolean;
  impact?: boolean;
  gallery?: boolean;
  reel?: boolean;
  videoShowcase?: boolean;
  relatedProjects?: boolean;
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
  sectionVisibility?: ProjectSectionVisibility;
  clientLogo?: string;
  videoType?: string;
  videoUrl?: string;
  reelSection?: ProjectReelSection;
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

const looksLikeImageUrl = (value: string): boolean => {
  if (!value) return false;
  if (/^(data:(image|video)\/|blob:)/.test(value)) return true;
  if (/\.(avif|gif|jpe?g|png|svg|webp|m3u8|mov|mp4|mpeg|mpg|ogv|webm)(\?.*)?$/i.test(value)) return true;
  if (/\/storage\/v1\/object\/public\//.test(value)) return true;
  if (/\/object\/public\//.test(value)) return true;
  return false;
};

const resolveAssetUrl = (value: string): string => {
  if (!value) return '';
  const trimmed = value.trim();
  let resolved = '';
  // Already absolute URL (Supabase storage, CDN, external) — return as-is
  if (/^https?:\/\//.test(trimmed)) resolved = trimmed;
  // Data/blob URIs
  else if (/^(data:|blob:)/.test(trimmed)) resolved = trimmed;
  // Root-relative: only prepend backend if it looks like a server upload path
  else if (trimmed.startsWith('/')) {
    if (/^\/(uploads|media|storage|files|assets)/.test(trimmed)) {
      try {
        const apiBaseUrl = getBackendBaseUrl();
        resolved = apiBaseUrl ? `${apiBaseUrl}${trimmed}` : trimmed;
      } catch {
        resolved = trimmed;
      }
    } else {
      resolved = trimmed; // local public path — keep as-is
    }
  } else {
    // Relative path — assume it's a public asset
    resolved = `/${trimmed.replace(/^\/+/, '')}`;
  }

  return looksLikeImageUrl(resolved) ? resolved : '';
};

const resolveMediaUrl = (value: string): string => {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';

  if (/^https?:\/\//.test(trimmed) || /^(data:video\/|blob:)/.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    if (/^\/(uploads|media|storage|files|assets)/.test(trimmed)) {
      try {
        const apiBaseUrl = getBackendBaseUrl();
        return apiBaseUrl ? `${apiBaseUrl}${trimmed}` : trimmed;
      } catch {
        return trimmed;
      }
    }
    return trimmed;
  }

  return `/${trimmed.replace(/^\/+/, '')}`;
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

const getBooleanValue = (source: any, keys: string[], fallback: boolean): boolean => {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true;
      if (['false', '0', 'no', 'n', 'off'].includes(normalized)) return false;
    }
  }
  return fallback;
};

export function normalizeProjectReelSection(value: unknown): ProjectReelSection | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;

  const reel = value as Record<string, unknown>;
  const enabled = getBooleanValue(reel, ['enabled', 'is_enabled', 'isEnabled', 'active'], false);
  const videoUploadUrl = resolveMediaUrl(getStringValue(reel, [
    'videoUploadUrl',
    'video_upload_url',
    'uploadedVideoUrl',
    'uploaded_video_url',
    'videoFileUrl',
    'video_file_url',
    'uploadedVideo',
    'videoFile',
    'video_file',
    'upload',
    'file',
  ]));
  const videoLinkUrl = resolveMediaUrl(getStringValue(reel, [
    'videoLinkUrl',
    'video_link_url',
    'videoLink',
    'video_link',
    'linkUrl',
    'link_url',
    'externalVideoUrl',
    'external_video_url',
    'externalUrl',
    'external_url',
  ]));
  const videoUrl = videoUploadUrl || resolveMediaUrl(getStringValue(reel, ['videoUrl', 'video_url', 'video', 'url', 'src'])) || videoLinkUrl;

  if (!enabled || !videoUrl) return undefined;

  return {
    enabled,
    title: getStringValue(reel, ['title', 'heading']),
    description: getStringValue(reel, ['description', 'desc', 'text']),
    videoUrl,
    videoUploadUrl,
    videoLinkUrl,
    posterUrl: resolveAssetUrl(getStringValue(reel, ['posterUrl', 'poster_url', 'poster', 'thumbnail', 'thumbnailUrl'])),
    autoplay: getBooleanValue(reel, ['autoplay', 'autoPlay'], false),
    muted: getBooleanValue(reel, ['muted', 'mute'], true),
    loop: getBooleanValue(reel, ['loop'], true),
  };
};

const getOptionalBoolean = (source: any, key: string): boolean | undefined => (
  typeof source?.[key] === 'boolean' ? source[key] : undefined
);

export function normalizeProjectSectionVisibility(value: unknown): ProjectSectionVisibility | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;

  const rawVisibility = value as Record<string, unknown>;
  const sectionVisibility: ProjectSectionVisibility = {
    overview: getOptionalBoolean(rawVisibility, 'overview'),
    process: getOptionalBoolean(rawVisibility, 'process'),
    impact: getOptionalBoolean(rawVisibility, 'impact'),
    gallery: getOptionalBoolean(rawVisibility, 'gallery'),
    reel: getOptionalBoolean(rawVisibility, 'reel'),
    videoShowcase: getOptionalBoolean(rawVisibility, 'videoShowcase'),
    relatedProjects: getOptionalBoolean(rawVisibility, 'relatedProjects'),
  };
  const normalizedVisibility = Object.fromEntries(
    Object.entries(sectionVisibility).filter(([, sectionValue]) => typeof sectionValue === 'boolean')
  ) as ProjectSectionVisibility;

  return Object.keys(normalizedVisibility).length ? normalizedVisibility : undefined;
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
  const categorySlug = getStringValue(item, ['cat', 'category', 'type', 'portfolioCategory']);
  const category = categorySlug
    ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Portfolio';
  const tags = asStringArray(item?.tags || item?.technologies || item?.services || item?.skills).slice(0, 4);
  const image = resolveAssetUrl(getStringValue(item, ['thumb', 'image', 'imageUrl', 'thumbnail', 'thumbnailUrl', 'coverImage', 'coverImageUrl']));
  const gallery = asStringArray(item?.gallery).map(resolveAssetUrl);
  const categoryName = getStringValue(item, ['category_name', 'categoryName']) || getStringValue(item?.category, ['name', 'title', 'label']);
  const rawSectionVisibility = item?.sectionVisibility ?? item?.section_visibility;
  const sectionVisibility = normalizeProjectSectionVisibility(rawSectionVisibility);

  if (process.env.NODE_ENV !== 'production' && rawSectionVisibility) {
    console.log('Raw section_visibility:', rawSectionVisibility);
    console.log('Normalized sectionVisibility:', sectionVisibility);
  }

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
    stats: asJsonArray<any>(item?.stats).map((s: any) => ({
      ...s,
      num: s.num != null ? String(s.num) : undefined,
      before: s.before != null ? String(s.before) : undefined,
      after: s.after != null ? String(s.after) : undefined,
    })),
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
    sectionVisibility,
    clientLogo: resolveAssetUrl(getStringValue(item, ['client_logo', 'clientLogo'])),
    videoType: getStringValue(item, ['video_type', 'videoType']),
    videoUrl: resolveAssetUrl(getStringValue(item, ['video_url', 'videoUrl'])),
    reelSection: normalizeProjectReelSection(item?.reelSection ?? item?.reel_section),
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

const isPublishedProject = (item: any) => item?.status === 'published';

const isActiveRecord = (item: any) => item?.is_active !== false && item?.active !== false && !item?.deleted_at;

const sortByDisplayOrder = <T extends Record<string, any>>(items: T[]): T[] => [...items].sort(
  (a, b) => (Number(a?.display_order ?? a?.sequence) || 0) - (Number(b?.display_order ?? b?.sequence) || 0)
);

export const getCategoryLabel = (category: ProjectCategory): string => (
  getStringValue(category, ['name', 'title', 'label']) || getStringValue(category, ['slug', 'id'])
);

export const getCategorySlug = (category: ProjectCategory): string => (
  getStringValue(category, ['slug', 'cat', 'id']) || getCategoryLabel(category)
);

export const fetchPortfolioContent = async (init?: RequestInit): Promise<PortfolioApiData> => fetchPortfolioApiData(init);

const normalizeHeroContent = (value: any): HomeHeroContent | null => {
  if (!value || typeof value !== 'object') return null;

    const buttons = Array.isArray(value.buttons) ? value.buttons : [];
    const primaryButton = buttons[0] || {};
    const secondaryButton = buttons[1] || {};

  return {
    eyebrow: getStringValue(value, ['tagline', 'eyebrow', 'kicker', 'badge']),
    title: getStringValue(value, ['heading', 'title', 'headline']),
    highlight: getStringValue(value, ['heading_highlight', 'highlight', 'title_highlight']),
    subtitle: getStringValue(value, ['sub_heading', 'subtitle', 'subTitle', 'description', 'text']),
    primaryLabel: getStringValue(primaryButton, ['text', 'label', 'title']),
    primaryHref: getStringValue(primaryButton, ['link', 'href', 'url']),
    primaryIcon: getStringValue(primaryButton, ['icon']),
    primaryNewTab: primaryButton?.new_tab === true,
    secondaryLabel: getStringValue(secondaryButton, ['text', 'label', 'title']),
    secondaryHref: getStringValue(secondaryButton, ['link', 'href', 'url']),
    secondaryIcon: getStringValue(secondaryButton, ['icon']),
    secondaryNewTab: secondaryButton?.new_tab === true,
  };
};

const normalizeContactContent = (value: any): ContactSectionContent | null => {
  if (!value || typeof value !== 'object') return null;
  const button = value.button || {};

  return {
    heading: getStringValue(value, ['heading', 'title']),
    highlight: getStringValue(value, ['heading_highlight', 'highlight']),
    buttonLabel: getStringValue(button, ['text', 'label', 'title']),
    buttonHref: getStringValue(button, ['link', 'href', 'url']),
  };
};

const normalizeImpactMetric = (item: any): PortfolioImpactMetric | null => {
  const label = getStringValue(item, ['title', 'label', 'name']);
  const rawDisplayValue = getStringValue(item, ['number', 'value', 'num', 'count']);
  const parsedDisplayValue = splitMetricDisplayValue(rawDisplayValue);
  const value = getNumberValue(item, ['target', 'numeric_value', 'numericValue', 'number']) ?? parsedDisplayValue.value;
  const suffix = getStringValue(item, ['suffix']) || parsedDisplayValue.suffix;
  if (!label || !rawDisplayValue) return null;
  return {
    value,
    displayValue: `${value}${suffix}`,
    suffix,
    label,
    sub: getStringValue(item, ['short_desc', 'shortDesc', 'sub', 'subtitle', 'description', 'text']),
  };
};


export const normalizePortfolioProjectsFromApi = (data: PortfolioApiData): PortfolioProject[] => {
  const categoryNames = new Map<string, string>();
  data.categories.forEach((category) => {
    const label = getCategoryLabel(category);
    [getCategorySlug(category), getStringValue(category, ['id'])].filter(Boolean).forEach((key) => {
      if (label) categoryNames.set(key, label);
    });
  });

  return data.projects
    .filter(isPublishedProject)
    .sort((a: any, b: any) => (Number(a?.sequence) || 0) - (Number(b?.sequence) || 0))
    .map((item, index) => normalizePortfolioProject({
      ...item,
      category_name: categoryNames.get(getStringValue(item, ['cat', 'category', 'type', 'portfolioCategory'])) || item?.category_name,
    }, index))
    .filter((project): project is PortfolioProject => Boolean(project));
};

export const normalizePortfolioCategoriesFromApi = (data: PortfolioApiData): string[] => sortByDisplayOrder(data.categories as any[])
  .filter(isActiveRecord)
  .map(getCategoryLabel)
  .filter(Boolean);

export const normalizeImpactMetricsFromApi = (data: PortfolioApiData): PortfolioImpactMetric[] => sortByDisplayOrder(data.impactNumbers as any[])
  .filter(isActiveRecord)
  .map(normalizeImpactMetric)
  .filter((metric): metric is PortfolioImpactMetric => Boolean(metric));

const isImageUrl = (url: string): boolean => {
  if (!url) return false;
  if (url.includes('supabase.co/storage')) return true;
  return /\.(png|jpe?g|webp|gif|svg|avif|ico)(\?.*)?$/i.test(url);
};

export const normalizeClientLogosFromApi = (data: PortfolioApiData): ClientLogo[] => sortByDisplayOrder(data.clientLogos as any[])
  .filter(isActiveRecord)
  .map((item: any) => {
    const rawImage = resolveAssetUrl(getStringValue(item, ['logo_image', 'image', 'imageUrl']));
    return {
      id: getStringValue(item, ['id']) || getStringValue(item, ['client_name', 'name']),
      name: getStringValue(item, ['client_name', 'name']) || 'Client',
      image: isImageUrl(rawImage) ? rawImage : '',
    };
  })
  .filter(logo => logo.id && (logo.name || logo.image));

export const normalizeSocialLinksFromApi = (data: PortfolioApiData): SocialLink[] => sortByDisplayOrder(data.socialLinks as any[])
  .filter(isActiveRecord)
  .map((item: any) => ({
    id: getStringValue(item, ['id']) || getStringValue(item, ['platform']),
    platform: getStringValue(item, ['platform']),
    href: getStringValue(item, ['profile_url', 'href', 'url']),
    icon: getStringValue(item, ['icon']),
  }))
  .filter(link => link.id && link.platform && link.href);

export const normalizeWebsiteContentFromApi = (data: PortfolioApiData): WebsiteContent => ({
  projects: normalizePortfolioProjectsFromApi(data),
  categories: normalizePortfolioCategoriesFromApi(data),
  heroContent: normalizeHeroContent((data.siteSettings as any)?.hero_section),
  contactContent: normalizeContactContent((data.siteSettings as any)?.contact_section),
  impactMetrics: normalizeImpactMetricsFromApi(data),
  clientLogos: normalizeClientLogosFromApi(data),
  socialLinks: normalizeSocialLinksFromApi(data),
});

const fallbackWebsiteContent: WebsiteContent = {
  projects: fallbackPortfolioProjects,
  categories: ['Branding', 'Websites', 'Events', 'Publication', 'Interiors', 'Packaging'],
  heroContent: fallbackHomeHeroContent,
  contactContent: fallbackContactSectionContent,
  impactMetrics: fallbackImpactMetrics,
  clientLogos: fallbackClientLogos,
  socialLinks: fallbackSocialLinks,
};

export const loadWebsiteContent = async (init?: RequestInit): Promise<WebsiteContentLoadResult> => {
  try {
    return {
      ok: true,
      content: normalizeWebsiteContentFromApi(await fetchPortfolioContent(init)),
      usedFallback: false,
    };
  } catch (error) {
    const normalizedError = error instanceof Error ? error : new Error(String(error));
    if (!init?.signal?.aborted && process.env.NODE_ENV !== 'production') {
      console.error('Unable to load live website content.', normalizedError);
    }
    return {
      ok: false,
      content: fallbackWebsiteContent,
      usedFallback: true,
      error: normalizedError,
    };
  }
};
