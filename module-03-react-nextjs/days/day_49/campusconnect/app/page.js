import Link from "next/link";

const resources = [
  {
    icon: "💻",
    category: "PROGRAMMING",
    title: "Web Development Basics",
    description:
      "Explore HTML, CSS, JavaScript, and the foundations of building websites.",
    color: "bg-violet-100",
    href: "/resources",
  },
  {
    icon: "📘",
    category: "STUDY GUIDES",
    title: "Your Study Toolkit",
    description:
      "Discover helpful study materials and organize your learning journey.",
    color: "bg-blue-100",
    href: "/resources",
  },
  {
    icon: "🎯",
    category: "CAREER GROWTH",
    title: "Prepare for Your Future",
    description:
      "Build practical skills and explore resources for your next opportunity.",
    color: "bg-amber-100",
    href: "/resources",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navigation */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-700 text-xl text-white shadow-md">
              C
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Campus<span className="text-violet-700">Connect</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link href="/" className="font-semibold text-violet-700">
              Home
            </Link>
            <Link
              href="/resources"
              className="text-slate-600 transition hover:text-violet-700"
            >
              Learning Resources
            </Link>
            <Link
              href="/announcements"
              className="text-slate-600 transition hover:text-violet-700"
            >
              Announcements
            </Link>
            <Link
              href="/events"
              className="text-slate-600 transition hover:text-violet-700"
            >
              Events
            </Link>
          </div>

          <Link
            href="/signin"
            className="rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800"
          >
            Sign in <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-700 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-violet-100">
              <span aria-hidden="true">✦</span>
              Your campus, your community
            </span>

            <h1 className="mt-7 max-w-2xl text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
              Learn more.
              <br />
              Connect more.
              <br />
              <span className="text-violet-300">Grow together.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-violet-100 sm:text-lg">
              Your central place for learning materials, campus news, events,
              and opportunities to grow as a student.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/resources"
                className="rounded-xl bg-white px-6 py-4 font-bold text-violet-800 shadow-lg transition hover:bg-violet-100"
              >
                Explore resources <span aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/announcements"
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/20"
              >
                Campus updates
              </Link>
            </div>

            <p className="mt-7 text-sm text-violet-200">
              A better way to stay connected with campus life.
            </p>
          </div>

          {/* Decorative learning panel */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -top-8 -right-4 h-32 w-32 rounded-full bg-fuchsia-400/30 blur-3xl" />
            <div className="absolute -bottom-8 -left-4 h-32 w-32 rounded-full bg-blue-400/30 blur-3xl" />

            <div className="relative rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-violet-200">YOUR LEARNING SPACE</p>
                  <h2 className="mt-1 text-2xl font-bold">Keep exploring ✨</h2>
                </div>
                <span className="text-3xl" aria-hidden="true">
                  🎓
                </span>
              </div>

              <div className="mt-7 space-y-4">
                <Link
                  href="/resources"
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 text-slate-800 transition hover:-translate-y-0.5"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
                    📚
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">Learning resources</span>
                    <span className="mt-1 block text-sm text-slate-500">
                      Materials for your next lesson
                    </span>
                  </span>
                  <span className="text-xl text-violet-700">→</span>
                </Link>

                <Link
                  href="/announcements"
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 text-slate-800 transition hover:-translate-y-0.5"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                    📣
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">
                      Campus announcements
                    </span>
                    <span className="mt-1 block text-sm text-slate-500">
                      Stay up to date
                    </span>
                  </span>
                  <span className="text-xl text-violet-700">→</span>
                </Link>

                <Link
                  href="/events"
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 text-slate-800 transition hover:-translate-y-0.5"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                    🌱
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">
                      Student opportunities
                    </span>
                    <span className="mt-1 block text-sm text-slate-500">
                      Discover events and activities
                    </span>
                  </span>
                  <span className="text-xl text-violet-700">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning resources */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-bold tracking-widest text-violet-700 uppercase">
              Learn something new
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Your learning starts here.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Find helpful materials, build your skills, and discover resources
              that support your academic journey.
            </p>
          </div>

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 font-bold text-violet-700 hover:text-violet-900"
          >
            View all resources <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${resource.color} text-3xl`}
                aria-hidden="true"
              >
                {resource.icon}
              </div>

              <p className="mt-6 text-xs font-extrabold tracking-widest text-violet-700">
                {resource.category}
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-900">
                {resource.title}
              </h3>

              <p className="mt-3 min-h-20 leading-7 text-slate-600">
                {resource.description}
              </p>

              <Link
                href={resource.href}
                className="mt-5 inline-flex items-center gap-2 font-bold text-violet-700 transition group-hover:gap-3"
              >
                Explore resource <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Announcements callout */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8">
        <div className="grid gap-8 overflow-hidden rounded-3xl bg-violet-100 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="inline-block rounded-full bg-white px-3 py-1.5 text-sm font-bold text-violet-700">
              CAMPUS BULLETIN
            </span>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Never miss an important update.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Visit the announcements page for campus news, notices, and
              important information shared with students.
            </p>
          </div>

          <Link
            href="/announcements"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-violet-700 px-6 py-4 font-bold text-white transition hover:bg-violet-800"
          >
            Read announcements <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Sign-in callout */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8">
        <div className="flex flex-col gap-6 rounded-3xl bg-slate-900 p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-semibold text-violet-300">
              READY TO GET CONNECTED?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">
              Make CampusConnect your space.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              Sign in to access the student features available in your account.
            </p>
          </div>

          <Link
            href="/signin"
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-bold text-violet-800 transition hover:bg-violet-100"
          >
            Sign in to continue <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="font-extrabold text-violet-700">
            CampusConnect
          </Link>

          <div className="flex flex-wrap gap-5 text-sm text-slate-600">
            <Link href="/resources" className="hover:text-violet-700">
              Resources
            </Link>
            <Link href="/announcements" className="hover:text-violet-700">
              Announcements
            </Link>
            <Link href="/events" className="hover:text-violet-700">
              Events
            </Link>
            <Link href="/signin" className="hover:text-violet-700">
              Sign in
            </Link>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CampusConnect
          </p>
        </div>
      </footer>
    </main>
  );
}
