import Link from "next/link";
import SigninForm from "@/components/SigninForm";

export const metadata = {
  title: "Sign In",
};

export default function SigninPage() {
  return (
    <section className="section">
      <div className="container">
        <SigninForm />

        <p className="empty-state">
          Don't have an account?{" "}
          <Link href="/signup" className="text-link">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
