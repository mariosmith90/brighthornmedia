import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';

// Credentials come from .env.local (or Vercel env vars in production).
// The private key is stored with escaped \n; restore real newlines here.
const storage = new Storage({
  projectId: 'organic-spirit-488116-e2',
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL!,
    private_key: (process.env.GCS_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
  },
});

const BUCKET = process.env.GCS_BUCKET_NAME ?? 'brighthornmedia-images';

// Signed URLs expire in 15 minutes — plenty of time for a page session.
const EXPIRY_MS = 15 * 60 * 1000;

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Missing ?key param' }, { status: 400 });
  }

  // Sanitize: strip leading slashes and reject path traversal
  const sanitized = key.replace(/\.\./g, '').replace(/^\/+/, '');

  if (!sanitized) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

  try {
    const [url] = await storage
      .bucket(BUCKET)
      .file(sanitized)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + EXPIRY_MS,
      });

    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    console.error('[/api/media] Failed to sign URL for key:', sanitized, err);
    return NextResponse.json(
      { error: 'Could not generate signed URL' },
      { status: 500 },
    );
  }
}
