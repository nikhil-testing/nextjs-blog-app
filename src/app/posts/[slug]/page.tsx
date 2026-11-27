import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Vibe Blog`, description: post.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-14">
      <Link
        href="/"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        <span aria-hidden>&larr;</span> Back to all posts
      </Link>

      <header className="mt-8 border-b border-slate-200 pb-8 dark:border-slate-800">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {post.author}
          </span>
          <span aria-hidden>&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </header>

      <div className="mt-8 space-y-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <section
        aria-labelledby="comments-heading"
        className="mt-14 border-t border-slate-200 pt-10 dark:border-slate-800"
      >
        <h2
          id="comments-heading"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        >
          Comments
        </h2>
        <CommentForm slug={slug} />
        {/* Static shell prerenders; comments stream in at request time. */}
        <Suspense
          fallback={
            <p className="mt-6 text-slate-500 dark:text-slate-400">
              Loading comments...
            </p>
          }
        >
          <CommentList slug={slug} />
        </Suspense>
      </section>
    </article>
  );
}
