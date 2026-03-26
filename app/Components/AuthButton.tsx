"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="ml-auto">...</span>;
  }

  if (session) {
    return (
      <button
        className="font-semibold text-slate-700 hover:text-blue-600 ml-auto"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Se déconnecter
      </button>
    );
  }

  return (
    <Link href="/login" className="font-semibold text-slate-700 hover:text-blue-600 ml-auto">
      Connexion
    </Link>
  );
}
