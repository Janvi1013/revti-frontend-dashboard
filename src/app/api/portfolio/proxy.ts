const getBackendBaseUrl = () =>
  (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/$/, '');

const buildBackendUrl = (request: Request, pathSegments: string[] = []) => {
  const apiBaseUrl = getBackendBaseUrl();
  if (!apiBaseUrl) return '';

  const requestUrl = new URL(request.url);
  const path = ['/api/portfolio', ...pathSegments.map(segment => encodeURIComponent(segment))].join('/');
  return `${apiBaseUrl}${path}${requestUrl.search}`;
};

const copyRequestHeaders = (request: Request) => {
  const headers = new Headers(request.headers);

  ['host', 'connection', 'content-length'].forEach(headerName => {
    headers.delete(headerName);
  });

  return headers;
};

export const proxyPortfolioRequest = async (request: Request, pathSegments: string[] = []) => {
  const backendUrl = buildBackendUrl(request, pathSegments);

  if (!backendUrl) {
    return Response.json(
      { error: 'Backend URL is not configured. Set BACKEND_URL or NEXT_PUBLIC_BACKEND_URL.' },
      { status: 503 },
    );
  }

  const method = request.method.toUpperCase();
  const response = await fetch(backendUrl, {
    method,
    headers: copyRequestHeaders(request),
    body: method === 'GET' || method === 'HEAD' ? undefined : await request.arrayBuffer(),
    cache: 'no-store',
  });

  const headers = new Headers(response.headers);
  headers.delete('content-encoding');
  headers.delete('content-length');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
