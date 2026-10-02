import CartClient from "../../components/CartClient";

export default function CartPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
          Addis Eats
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-emerald-950 sm:text-4xl">
          Your Cart
        </h1>

        <p className="mt-2 text-slate-500">
          Review your items before checkout.
        </p>
      </div>

      <CartClient />
    </main>
  );
}
