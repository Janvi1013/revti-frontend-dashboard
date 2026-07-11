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

const isDevelopment = process.env.NODE_ENV !== 'production';

export const getBackendBaseUrl = (): string => {
  const configuredUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '');

  if (configuredUrl) return configuredUrl;
  if (isDevelopment) return '';

  throw new Error('NEXT_PUBLIC_BACKEND_URL is required in production to load live website content.');
};

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

const logPortfolioDiagnostics = (details: {
  backendUrl: string;
  requestUrl: string;
  responseStatus?: number;
  success?: boolean;
  data?: PortfolioApiData;
}) => {
  if (!isDevelopment) return;

  console.info('[portfolio-api]', {
    backendUrl: details.backendUrl || '(same-origin development fallback)',
    requestUrl: details.requestUrl,
    responseStatus: details.responseStatus,
    success: details.success,
    projectCount: details.data?.projects.length ?? 0,
    categoryCount: details.data?.categories.length ?? 0,
    impactCount: details.data?.impactNumbers.length ?? 0,
    logoCount: details.data?.clientLogos.length ?? 0,
    socialCount: details.data?.socialLinks.length ?? 0,
  });
};

const createCorsDiagnostic = (error: unknown, requestUrl: string) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'server-render';
  return new Error(
    `Unable to request live portfolio content from ${requestUrl}. ` +
    `If this is a browser CORS failure, backend PUBLIC_FRONTEND_ORIGIN must match ${origin}. ` +
    `Original error: ${error instanceof Error ? error.message : String(error)}`
  );
};

export async function fetchPortfolioApiData(init?: RequestInit): Promise<PortfolioApiData> {
  const backendUrl = getBackendBaseUrl();
  const requestUrl = getPortfolioEndpoint();

  let response: Response;
  try {
    response = await fetch(requestUrl, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...init?.headers,
      },
      ...(typeof window === 'undefined'
        ? { next: { tags: [...PORTFOLIO_TAGS] } }
        : { cache: 'no-store' as RequestCache }),
    });
  } catch (error) {
    throw createCorsDiagnostic(error, requestUrl);
  }

  logPortfolioDiagnostics({ backendUrl, requestUrl, responseStatus: response.status });

  if (!response.ok) {
    throw new Error(`Portfolio API request failed with ${response.status} for ${requestUrl}`);
  }

  const payload = (await response.json()) as ApiResponse<PortfolioApiData>;

  if (!payload.data || typeof payload.data !== 'object') {
    throw new Error('Portfolio API returned an invalid data payload.');
  }

  const data = normalizePortfolioApiData(payload.data);

  logPortfolioDiagnostics({ backendUrl, requestUrl, responseStatus: response.status, success: payload.success, data });

  if (!payload.success) {
    throw new Error(payload.message || payload.error || 'Portfolio API returned success=false');
  }

  return data;
}
