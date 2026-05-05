import type { NextRequest } from 'next/server';
import type { Scene, Stage } from '@/lib/types/stage';

// ---------------------------------------------------------------------------
// Vercel Blob storage for persistent classroom sessions.
// Falls back to in-memory cache for local development (no BLOB_READ_WRITE_TOKEN).
// ---------------------------------------------------------------------------

// Lazy-load @vercel/blob only when the token is present to avoid import errors
// in local dev environments that don't have the package configured.
async function getBlobClient() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const blob = await import('@vercel/blob');
    return blob;
  } catch {
    return null;
  }
}

// In-memory fallback for local development
const memoryStore = new Map<string, PersistedClassroomData>();

export interface PersistedClassroomData {
  id: string;
  stage: Stage;
  scenes: Scene[];
  createdAt: string;
}

export function isValidClassroomId(id: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

export function buildRequestOrigin(req: NextRequest): string {
  return req.headers.get('x-forwarded-host')
    ? `${req.headers.get('x-forwarded-proto') || 'http'}://${req.headers.get('x-forwarded-host')}`
    : req.nextUrl.origin;
}

export async function readClassroom(id: string): Promise<PersistedClassroomData | null> {
  const blob = await getBlobClient();

  if (blob) {
    // Vercel Blob: fetch the stored JSON by its well-known path
    try {
      const blobUrl = `${process.env.BLOB_BASE_URL || ''}/classrooms/${id}.json`;
      // List blobs to find the one matching this id
      const { blobs } = await blob.list({ prefix: `classrooms/${id}.json`, token: process.env.BLOB_READ_WRITE_TOKEN });
      if (blobs.length === 0) return null;
      const response = await fetch(blobs[0].url);
      if (!response.ok) return null;
      return (await response.json()) as PersistedClassroomData;
    } catch {
      return null;
    }
  }

  // Local dev fallback
  return memoryStore.get(id) ?? null;
}

export async function persistClassroom(
  data: {
    id: string;
    stage: Stage;
    scenes: Scene[];
  },
  baseUrl: string,
): Promise<PersistedClassroomData & { url: string }> {
  const classroomData: PersistedClassroomData = {
    id: data.id,
    stage: data.stage,
    scenes: data.scenes,
    createdAt: new Date().toISOString(),
  };

  const blob = await getBlobClient();

  if (blob) {
    // Vercel Blob: store as JSON blob with a deterministic path
    const content = JSON.stringify(classroomData);
    await blob.put(`classrooms/${data.id}.json`, content, {
      access: 'public', // public so we can fetch it without auth in readClassroom
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false, // deterministic URL so we can overwrite on re-publish
    });
  } else {
    // Local dev fallback
    memoryStore.set(data.id, classroomData);
  }

  return {
    ...classroomData,
    url: `${baseUrl}/classroom/${data.id}`,
  };
}

// Legacy exports kept for compatibility with any code that still imports these
export const CLASSROOMS_DIR = '/tmp/data/classrooms';
export const CLASSROOM_JOBS_DIR = '/tmp/data/classroom-jobs';
export async function ensureClassroomsDir() {}
export async function ensureClassroomJobsDir() {}
export async function writeJsonFileAtomic(_filePath: string, _data: unknown) {}
