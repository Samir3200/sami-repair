"use client";
import Link from "next/link";
import AuthButton from "@/app/Components/AuthButton";

export default function NavBar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-6 items-center">
        <img
          src="https://res.cloudinary.com/dsybzvkmv/image/upload/v1774529949/reparation-symbole_efxqkn.avif"
          alt="Logo Sami Repair"
          width={32}
          height={32}
          className="mr-2"
        />
        <Link href="/gestion" className="font-semibold text-slate-700 hover:text-blue-600 cursor-pointer">Ajouter travaux</Link>
        <Link href="/travaux" className="font-semibold text-slate-700 hover:text-blue-600 cursor-pointer">Liste des travaux</Link>
        <AuthButton />
      </div>
    </nav>
  );
}
