import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishById, getDishes } from "../../../lib/dishes";
import AddToCartButton from "../../../components/AddToCartButton";

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
        {/* Image */}
        <div className="min-h-[380px] md:min-h-[500px]">
          <img
            src={dish.image}
            alt={dish.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold capitalize text-emerald-700">
            {dish.category}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold text-emerald-950 sm:text-5xl">
            {dish.name}
          </h1>

          <p className="mt-4 text-2xl font-bold text-emerald-700">
            {dish.price} ETB
          </p>

          <p className="mt-6 leading-7 text-slate-600">{dish.description}</p>

          <AddToCartButton dish={dish} />

          <Link
            href="/menu"
            className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            ← Back to Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
