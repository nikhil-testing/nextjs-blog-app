import { Pool, type QueryResultRow } from "pg";

const globalForDb = globalThis as unknown as {
  __pgPool?: Pool;
  __schemaPromise?: Promise<void>;
};

function getPool(): Pool {
  if (!globalForDb.__pgPool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    globalForDb.__pgPool = new Pool({
      connectionString,
      // Supabase requires TLS; the pooler cert chain is not in Node's CA store.
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }
  return globalForDb.__pgPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await getPool().query<T>(text, params);
  return result.rows;
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS comments (
  id          BIGSERIAL PRIMARY KEY,
  post_slug   TEXT NOT NULL,
  author      TEXT NOT NULL,
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_comments_post_slug_created ON comments (post_slug, created_at DESC);
`;

/** Idempotently creates the schema; runs at most once per process. */
export function ensureSchema(): Promise<void> {
  if (!globalForDb.__schemaPromise) {
    globalForDb.__schemaPromise = getPool()
      .query(SCHEMA_SQL)
      .then(() => undefined)
      .catch((err) => {
        // Allow a retry on the next call if setup failed.
        globalForDb.__schemaPromise = undefined;
        throw err;
      });
  }
  return globalForDb.__schemaPromise;
}
