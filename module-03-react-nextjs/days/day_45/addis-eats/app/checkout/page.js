import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout",
  description: "Complete your Addis Eats demo order.",
};

export default function CheckoutPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <h1>Almost there ♡</h1>

          <p>Add your delivery information to complete your order.</p>
        </div>

        <CheckoutForm />
      </div>
    </section>
  );
}
