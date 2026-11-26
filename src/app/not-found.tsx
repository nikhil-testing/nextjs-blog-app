import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
        Post not found
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        The post you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
      >
        &larr; Back to all posts
      </Link>
    </div>
  );
}
