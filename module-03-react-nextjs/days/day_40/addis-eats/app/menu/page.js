import Link from "next/link";
import { getDishes } from "../../lib/dishes";

export default async function MenuPage({ searchParams }) {
  const dishes = await getDishes();

  const params = await searchParams;
  const category = params?.category;

  const filteredDishes =
    category && category !== "all"
      ? dishes.filter((dish) => dish.category === category)
      : dishes;

  return (
    <div>
      {filteredDishes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="text-5xl">🍽️</div>

          <h2 className="mt-4 text-2xl font-bold text-emerald-950">
            No dishes found
          </h2>

          <p className="mt-2 text-slate-500">
            There are no dishes in this category yet.
          </p>

          <Link
            href="/menu"
            className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            View All Dishes
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {filteredDishes.map((dish) => (
            <article
              key={dish.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid sm:grid-cols-[145px_1fr]">
                {/* Image */}
                <div className="h-44 sm:h-full">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-4">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-bold text-emerald-950">
                        {dish.name}
                      </h2>

                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold capitalize text-emerald-700">
                        {dish.category}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-5 text-slate-500">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="font-bold text-emerald-700">
                      {dish.price} ETB
                    </p>

                    <Link
                      href={`/menu/${dish.id}`}
                      className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      View Dish
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
