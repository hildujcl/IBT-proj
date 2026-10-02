"use client";

export default function MenuError({ reset }) {
  return (
    <main className="flex min-h-[65vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
          !
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Something went wrong.
        </h1>

        <p className="mt-2 text-slate-500">We could not load the menu.</p>

        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
