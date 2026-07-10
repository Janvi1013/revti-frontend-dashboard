import { proxyPortfolioRequest } from '../proxy';

export const dynamic = 'force-dynamic';

type PortfolioRouteContext = {
  params: Promise<{ path?: string[] }>;
};

const proxyNestedPortfolioRequest = async (request: Request, context: PortfolioRouteContext) => {
  const { path = [] } = await context.params;
  return proxyPortfolioRequest(request, path);
};

export const GET = proxyNestedPortfolioRequest;
export const POST = proxyNestedPortfolioRequest;
export const PUT = proxyNestedPortfolioRequest;
export const PATCH = proxyNestedPortfolioRequest;
export const DELETE = proxyNestedPortfolioRequest;
