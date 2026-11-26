import { ensureSchema, query } from "@/lib/db";

export type Comment = {
  id: number;
  postSlug: string;
  author: string;
  body: string;
  /** ISO 8601 timestamp. */
  createdAt: string;
};

type CommentRow = {
  id: string;
  post_slug: string;
  author: string;
  body: string;
  created_at: Date;
};

function toComment(row: CommentRow): Comment {
  return {
    id: Number(row.id),
    postSlug: row.post_slug,
    author: row.author,
    body: row.body,
    createdAt: row.created_at.toISOString(),
  };
}

export async function getComments(slug: string): Promise<Comment[]> {
  await ensureSchema();
  const rows = await query<CommentRow>(
    `SELECT id, post_slug, author, body, created_at
       FROM comments
      WHERE post_slug = $1
      ORDER BY created_at DESC, id DESC`,
    [slug],
  );
  return rows.map(toComment);
}

export async function addComment(
  slug: string,
  author: string,
  body: string,
): Promise<Comment> {
  await ensureSchema();
  const rows = await query<CommentRow>(
    `INSERT INTO comments (post_slug, author, body)
     VALUES ($1, $2, $3)
     RETURNING id, post_slug, author, body, created_at`,
    [slug, author, body],
  );
  return toComment(rows[0]);
}
