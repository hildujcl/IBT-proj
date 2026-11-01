import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: "Create an Account",
};

export default function SignupPage() {
  return (
    <section className="section">
      <div className="container">
        <SignupForm />

        <p className="empty-state">
          Already have an account?{" "}
          <Link href="/signin" className="text-link">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
