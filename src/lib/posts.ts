export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** Body as a list of plain-text paragraphs. */
  content: string[];
  author: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
};

export const posts: Post[] = [
  {
    slug: "shipping-small-changes-fast",
    title: "Shipping Small Changes, Fast",
    excerpt:
      "Why tiny, frequent deploys beat big-bang releases, and how to make them the default for your team.",
    author: "Ava Morgan",
    date: "2026-03-12",
    content: [
      "Every team I have worked on eventually learns the same lesson: the size of a change is the best predictor of how badly it can go wrong. A twenty-line diff is easy to review, easy to reason about, and easy to roll back. A two-thousand-line diff is none of those things.",
      "Small changes shorten the feedback loop. When you deploy several times a day, a failure points to a handful of commits instead of a whole sprint's worth of work. Debugging becomes a matter of minutes rather than an afternoon of bisecting.",
      "Getting there takes some groundwork. Invest in a fast, trustworthy CI pipeline, use feature flags to decouple deploy from release, and make rollbacks boring. When shipping is cheap, people stop hoarding changes and start sharing them.",
      "Start by measuring your current lead time from merge to production. Then pick the single biggest source of delay and remove it. Repeat until deploying feels like saving a file.",
    ],
  },
  {
    slug: "a-gentle-intro-to-observability",
    title: "A Gentle Introduction to Observability",
    excerpt:
      "Logs, metrics, and traces explained without the buzzwords, plus what to instrument first.",
    author: "Liam Chen",
    date: "2026-02-27",
    content: [
      "Monitoring tells you that something is broken. Observability helps you understand why. The difference is whether you can ask new questions of your system without shipping new code.",
      "Metrics give you cheap, aggregated numbers: request rate, error rate, latency. Logs give you the detailed story of individual events. Traces stitch the two together by following a single request across services.",
      "You do not need all three on day one. Begin with the golden signals for your most important endpoints, add structured logging with a request ID, and introduce tracing once you have more than a couple of services talking to each other.",
      "The goal is not pretty dashboards. The goal is being able to answer, at three in the morning, the question: what changed, and who is affected?",
    ],
  },
  {
    slug: "typescript-patterns-that-scale",
    title: "TypeScript Patterns That Scale",
    excerpt:
      "Discriminated unions, branded types, and a few other tricks that keep large codebases honest.",
    author: "Priya Nair",
    date: "2026-01-19",
    content: [
      "TypeScript shines when the types describe your domain, not just your data. Discriminated unions are the clearest example: model each state of a feature explicitly and let the compiler force you to handle every case.",
      "Branded types are another quiet win. A UserId and an OrderId are both strings at runtime, but mixing them up is a bug. A thin brand makes the compiler catch it for you at no runtime cost.",
      "Finally, prefer inference over annotation where you can, and put types at the boundaries: function signatures, API responses, and module exports. Inside a function, let the compiler do the work.",
    ],
  },
  {
    slug: "writing-docs-people-actually-read",
    title: "Writing Docs People Actually Read",
    excerpt:
      "Practical habits for documentation that stays accurate and gets used instead of ignored.",
    author: "Marcus Webb",
    date: "2025-12-05",
    content: [
      "Most documentation fails for a simple reason: it is written once and never touched again. Within a few months it describes a system that no longer exists, and readers learn to distrust it.",
      "The fix is to keep docs close to the code. Put a README next to every service, link to runbooks from alerts, and treat a docs update as part of the definition of done for a change.",
      "Write for the reader who is in a hurry. Lead with what the thing is and how to run it, show a working example before the theory, and use headings so people can skim.",
      "When someone asks you a question twice, that is a documentation bug. Answer it once, in writing, and link to it forever after.",
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
