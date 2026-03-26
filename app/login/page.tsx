"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);


  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError("");
    const form = e.currentTarget;
    const identifiant = (form.elements.namedItem("identifiant") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const res = await signIn("credentials", {
      redirect: false,
      identifiant,
      password
    });
    setIsPending(false);
    if (res?.ok) {
      window.location.href = "/gestion";
    } else {
      setError("Identifiant ou mot de passe incorrect");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Connexion</h1>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md border w-full max-w-sm flex flex-col gap-4">
        <input name="identifiant" placeholder="Identifiant" className="p-2 border rounded-md" required />
        <input name="password" type="password" placeholder="Mot de passe" className="p-2 border rounded-md" required />
        <button type="submit" disabled={isPending} className="bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-all cursor-pointer">
          {isPending ? "Connexion..." : "Se connecter"}
        </button>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </form>
    </main>
  );
}
