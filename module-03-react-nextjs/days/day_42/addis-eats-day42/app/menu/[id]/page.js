import Link from "next/link";
import { notFound } from "next/navigation";
import { menuItems, getMenuItem } from "@/lib/data";

export function generateStaticParams() {
  return menuItems.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getMenuItem(id);

  return {
    title: item ? `${item.name} | Addis Eats` : "Dish not found",
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const item = getMenuItem(id);

  if (!item) notFound();

  return (
    <main className="content">
      <Link href="/menu">← Back to menu</Link>

      <article className="dish-detail">
        <img src={item.image} alt={item.name} className="dish-image" />

        <p className="eyebrow">{item.category}</p>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <h2>{item.price} ETB</h2>

        <Link className="button-link" href="/checkout">
          Continue to checkout
        </Link>
      </article>
    </main>
  );
}
