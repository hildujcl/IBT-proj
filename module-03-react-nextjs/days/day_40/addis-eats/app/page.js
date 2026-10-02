import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[620px] overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=80')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20">
          <div className="max-w-xl text-white">
            <p className="mb-4 font-semibold uppercase tracking-[0.25em] text-yellow-400">
              Welcome to Addis Eats
            </p>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Authentic Ethiopian
              <span className="block text-yellow-400">Food, Delivered</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/85 sm:text-lg">
              Discover delicious Ethiopian food and order your favorite dishes
              from the comfort of your home.
            </p>

            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-bold text-emerald-950 shadow-lg hover:bg-yellow-300"
            >
              View Menu
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
          Taste Ethiopia
        </p>

        <h2 className="mt-2 text-3xl font-bold text-emerald-950">
          Delicious food, made for you
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          From spicy Doro Wot to traditional Kitfo, enjoy Ethiopian favorites
          wherever you are.
        </p>
      </section>
    </main>
  );
}
