import Link from "next/link";
import { resources } from "@/lib/data";

export const metadata = {
  title: "Learning Resources",
  description:
    "Explore study guides, programming notes, and career resources on CampusConnect.",
};

const icons = {
  Programming: "💻",
  "Computer Science": "🧠",
  Career: "🚀",
  Design: "🎨",
  Academic: "📚",
};

const colors = [
  "bg-violet-100",
  "bg-blue-100",
  "bg-emerald-100",
  "bg-amber-100",
  "bg-pink-100",
];

export default function ResourcesPage() {
  const categories = [
    "All resources",
    ...new Set(resources.map((resource) => resource.category)),
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
          <Link
            href="/"
            className="text-sm font-semibold text-violet-200 hover:text-white"
          >
            ← Back to home
          </Link>

          <p className="mt-8 text-sm font-bold tracking-[0.2em] text-violet-300">
            YOUR STUDENT LIBRARY
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Learn at your own pace.
            <span className="block text-violet-300">Grow your skills.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-violet-100 sm:text-lg">
            Explore study notes, programming guides, and practical resources to
            support your academic journey.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <span className="text-2xl font-bold">{resources.length}</span>
              <span className="ml-2 text-sm text-violet-100">
                learning resources
              </span>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <span className="text-2xl font-bold">
                {new Set(resources.map((r) => r.category)).size}
              </span>
              <span className="ml-2 text-sm text-violet-100">
                study categories
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-bold text-violet-700">THE RESOURCE COLLECTION</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              Find your next learning tool
            </h2>
            <p className="mt-3 text-slate-600">
              Choose a resource that fits your learning goals.
            </p>
          </div>

          <Link
            href="/announcements"
            className="font-semibold text-violet-700 hover:text-violet-900"
          >
            View campus updates →
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span
              key={category}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                index === 0
                  ? "bg-violet-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <article
              key={resource.id}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    colors[index % colors.length]
                  } text-2xl`}
                  aria-hidden="true"
                >
                  {icons[resource.category] || "📖"}
                </div>

                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                  {resource.type}
                </span>
              </div>

              <p className="mt-6 text-xs font-extrabold tracking-widest text-violet-700">
                {resource.category}
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {resource.title}
              </h2>

              <p className="mt-3 flex-1 leading-7 text-slate-600">
                {resource.description}
              </p>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-500">
                  File type: {resource.type} · {resource.size}
                </p>

                <a
                  href={`mailto:library@campusconnect.test?subject=${encodeURIComponent(
                    `Request resource: ${resource.title}`,
                  )}`}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-3 font-bold text-white transition hover:bg-violet-800"
                >
                  Request resource <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-violet-100 bg-violet-50 p-7 sm:p-9">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Keep exploring ✨
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Learning is a journey. Stay connected with your campus to discover
            more opportunities and helpful updates.
          </p>
          <Link
            href="/events"
            className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-violet-700 shadow-sm hover:bg-violet-100"
          >
            Discover campus events →
          </Link>
        </div>
      </section>
    </main>
  );
}
