"use server";

import { revalidatePath } from "next/cache";
import { addComment } from "@/lib/comments";
import { getPostBySlug } from "@/lib/posts";

export type CommentFormState = {
  error?: string;
  success?: boolean;
};

export async function addCommentAction(
  slug: string,
  _prev: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  if (!getPostBySlug(slug)) return { error: "Post not found." };

  const author = String(formData.get("author") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (author.length < 1 || author.length > 80) {
    return { error: "Name is required (1-80 characters)." };
  }
  if (body.length < 1 || body.length > 2000) {
    return { error: "Comment is required (1-2000 characters)." };
  }

  try {
    await addComment(slug, author, body);
  } catch (err) {
    console.error("Failed to add comment", err instanceof Error ? err.message : err);
    return { error: "Could not save your comment. Please try again." };
  }

  revalidatePath(`/posts/${slug}`);
  return { success: true };
}
