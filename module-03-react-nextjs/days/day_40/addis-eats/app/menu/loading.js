export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
        <div className="hidden h-48 animate-pulse rounded-xl bg-slate-100 lg:block" />

        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-44 animate-pulse bg-slate-100" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-1/2 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                  <div className="h-9 w-28 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>

          <div className="py-8 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-700" />

            <p className="mt-4 font-semibold text-emerald-950">
              Loading Menu...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please wait while the dishes load.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
