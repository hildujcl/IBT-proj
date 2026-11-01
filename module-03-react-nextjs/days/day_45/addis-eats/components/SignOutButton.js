"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Unable to sign out.");
      }

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="button button-secondary"
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
