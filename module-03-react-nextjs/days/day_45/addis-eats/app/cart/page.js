import CartClient from "@/components/CartClient";

export const metadata = {
  title: "Your Cart",
  description: "Review your Addis Eats shopping cart.",
};

export default function CartPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <h1>Your Shopping Cart ♡</h1>

          <p>Review your selected dishes before checkout.</p>
        </div>

        <CartClient />
      </div>
    </section>
  );
}
