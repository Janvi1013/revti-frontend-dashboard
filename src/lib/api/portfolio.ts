import type { ApiResponse, PortfolioApiData } from './types';

export const PORTFOLIO_TAGS = [
  'portfolio',
  'project-categories',
  'site-settings',
  'client-logos',
  'impact-numbers',
  'social-links',
  'site-content',
] as const;

export const getBackendBaseUrl = (): string => process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || '';

export const getPortfolioEndpoint = (): string => {
  const baseUrl = getBackendBaseUrl();
  return baseUrl ? `${baseUrl}/api/portfolio` : '/api/portfolio';
};

const normalizePortfolioApiData = (data: Partial<PortfolioApiData> | null | undefined): PortfolioApiData => ({
  projects: Array.isArray(data?.projects) ? data.projects : [],
  categories: Array.isArray(data?.categories) ? data.categories : [],
  siteSettings: data?.siteSettings && typeof data.siteSettings === 'object' ? data.siteSettings : {},
  clientLogos: Array.isArray(data?.clientLogos) ? data.clientLogos : [],
  impactNumbers: Array.isArray(data?.impactNumbers) ? data.impactNumbers : [],
  socialLinks: Array.isArray(data?.socialLinks) ? data.socialLinks : [],
});

export async function fetchPortfolioApiData(init?: RequestInit): Promise<PortfolioApiData> {
  const response = await fetch(getPortfolioEndpoint(), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
    next: typeof window === 'undefined' ? { tags: [...PORTFOLIO_TAGS] } : undefined,
  });

  if (!response.ok) {
    throw new Error(`Portfolio API request failed with ${response.status}`);
  }

  const payload = (await response.json()) as ApiResponse<PortfolioApiData>;

  if (!payload.success) {
    throw new Error(payload.message || payload.error || 'Portfolio API returned success=false');
  }

  return normalizePortfolioApiData(payload.data);
}
