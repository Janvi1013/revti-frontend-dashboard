import { NextResponse } from 'next/server';

const getBackendPortfolioUrl = () => {
  const configuredUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL)?.replace(/\/$/, '');
  return configuredUrl ? `${configuredUrl}/api/portfolio` : '';
};

export async function GET() {
  const requestUrl = getBackendPortfolioUrl();

  if (!requestUrl) {
    return NextResponse.json(
      { success: false, error: 'Backend portfolio URL is not configured.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(requestUrl, {
      headers: { Accept: 'application/json' },
      next: {
        tags: [
          'portfolio',
          'project-categories',
          'site-settings',
          'client-logos',
          'impact-numbers',
          'social-links',
          'site-content',
        ],
      },
    });

    const contentType = response.headers.get('content-type') || '';
    const body = contentType.includes('application/json')
      ? await response.json()
      : { success: false, error: await response.text() };

    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unable to load portfolio content.',
      },
      { status: 502 }
    );
  }
}
