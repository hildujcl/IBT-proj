import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Addis Eats
        </p>

        <h1 className="mt-1 text-3xl font-bold text-emerald-950 sm:text-4xl">
          Our Menu
        </h1>

        <p className="mt-2 text-slate-600">
          Explore our delicious selection of Ethiopian dishes.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
        {/* Categories */}
        <aside className="h-fit rounded-xl bg-emerald-50 p-4">
          <h2 className="mb-3 font-bold text-emerald-950">Categories</h2>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            <Link
              href="/menu"
              className="whitespace-nowrap rounded-lg bg-emerald-700 px-3 py-2 text-sm font-medium text-white"
            >
              ◉ All
            </Link>

            <Link
              href="/menu?category=traditional"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-white hover:text-emerald-700"
            >
              ♢ Traditional
            </Link>

            <Link
              href="/menu?category=fast-food"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-white hover:text-emerald-700"
            >
              ♢ Fast Food
            </Link>

            <Link
              href="/menu?category=vegetarian"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-white hover:text-emerald-700"
            >
              ♢ Vegetarian
            </Link>
          </nav>
        </aside>

        {/* Page */}
        <div>{children}</div>
      </div>
    </section>
  );
}
