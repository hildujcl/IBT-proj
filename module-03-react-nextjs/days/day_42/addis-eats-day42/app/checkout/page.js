import Link from "next/link";
import { menuItems } from "@/lib/data";
import { placeOrder } from "./actions";

export const metadata = {
  title: "Checkout | Addis Eats",
  description: "Choose your favorite Ethiopian dish and place your order.",
};

export default function CheckoutPage() {
  return (
    <main className="content">
      <Link href="/menu">← Back to menu</Link>

      <section className="panel">
        <p className="eyebrow">ALMOST THERE</p>
        <h1>Checkout</h1>
        <p>Select a dish to place your order.</p>

        <form action={placeOrder}>
          <label htmlFor="itemId">Choose a dish</label>

          <select id="itemId" name="itemId" defaultValue="" required>
            <option value="" disabled>
              Select a dish
            </option>

            {menuItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — {item.price} ETB
              </option>
            ))}
          </select>

          <button type="submit">Place Order</button>
        </form>
      </section>
    </main>
  );
}
