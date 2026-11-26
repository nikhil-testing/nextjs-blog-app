import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {post.author}
          </span>
          <span aria-hidden>&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 transition group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
          {post.title}
        </h2>
        <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Read more <span aria-hidden>&rarr;</span>
        </span>
      </Link>
    </article>
  );
}
