import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { PORTFOLIO_TAGS } from '@/lib/api/portfolio';

const allowedTags = new Set<string>(PORTFOLIO_TAGS);

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.REVALIDATE_SECRET;
  const providedSecret = request.headers.get('x-revalidation-secret');

  if (!configuredSecret || providedSecret !== configuredSecret) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const tags = Array.isArray((body as { tags?: unknown }).tags)
    ? (body as { tags: unknown[] }).tags
    : [(body as { tag?: unknown }).tag];

  const requestedTags = tags.filter((tag): tag is string => typeof tag === 'string' && tag.length > 0);
  const invalidTags = requestedTags.filter((tag) => !allowedTags.has(tag));

  if (!requestedTags.length) {
    return NextResponse.json({ success: false, error: 'At least one tag is required' }, { status: 400 });
  }

  if (invalidTags.length) {
    return NextResponse.json({ success: false, error: 'Invalid revalidation tag', invalidTags }, { status: 400 });
  }

  requestedTags.forEach((tag) => revalidateTag(tag, 'max'));

  return NextResponse.json({ success: true, revalidated: requestedTags });
}
