import { getComments } from "@/lib/comments";

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

/** Dynamic (per-request) DB read; render inside a <Suspense> boundary. */
export default async function CommentList({ slug }: { slug: string }) {
  const comments = await getComments(slug);

  if (comments.length === 0) {
    return (
      <p className="mt-6 text-slate-500 dark:text-slate-400">
        No comments yet. Be the first to share your thoughts.
      </p>
    );
  }

  return (
    <ul className="mt-6 space-y-4">
      {comments.map((c) => (
        <li
          key={c.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {c.author}
            </span>
            <span aria-hidden>&middot;</span>
            <time dateTime={c.createdAt}>{formatTimestamp(c.createdAt)}</time>
          </div>
          <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed text-slate-700 dark:text-slate-300">
            {c.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
