import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
          Latest posts
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Short, practical writing on shipping software, running it in
          production, and keeping teams happy along the way.
        </p>
      </section>

      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
