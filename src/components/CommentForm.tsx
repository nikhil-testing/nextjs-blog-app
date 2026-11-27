"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  addCommentAction,
  type CommentFormState,
} from "@/app/posts/[slug]/actions";

const inputClass =
  "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500";

export default function CommentForm({ slug }: { slug: string }) {
  const [state, formAction, pending] = useActionState<CommentFormState, FormData>(
    addCommentAction.bind(null, slug),
    {},
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <label
          htmlFor="author"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Name
        </label>
        <input
          id="author"
          name="author"
          type="text"
          required
          maxLength={80}
          disabled={pending}
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="body"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Comment
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          required
          maxLength={2000}
          disabled={pending}
          className={inputClass}
        />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
      {state.success && !pending && (
        <p role="status" className="text-sm text-emerald-600 dark:text-emerald-400">
          Thanks! Your comment was posted.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
      >
        {pending ? "Posting..." : "Post comment"}
      </button>
    </form>
  );
}
