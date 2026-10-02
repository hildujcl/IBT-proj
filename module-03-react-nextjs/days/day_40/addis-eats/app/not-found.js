import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">
          ☹
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-emerald-950">
          Dish Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          Sorry, the dish you requested does not exist.
        </p>

        <Link
          href="/menu"
          className="mt-7 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          Return to Menu
        </Link>
      </div>
    </main>
  );
}
