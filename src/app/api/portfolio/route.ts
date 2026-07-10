import { proxyPortfolioRequest } from './proxy';

export const dynamic = 'force-dynamic';

const proxyRootPortfolioRequest = async (request: Request) => proxyPortfolioRequest(request);

export const GET = proxyRootPortfolioRequest;
export const POST = proxyRootPortfolioRequest;
export const PUT = proxyRootPortfolioRequest;
export const PATCH = proxyRootPortfolioRequest;
export const DELETE = proxyRootPortfolioRequest;
