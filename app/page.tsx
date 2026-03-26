export const dynamic = "force-dynamic";
// app/page.tsx
import RepairForm from "@/app/gestion/Components/RepairForm";
import RepairList from "@/app/travaux/Components/RepairList";
import SearchBar from "@/app/travaux/Components/SearchBar"; // Importe la barre de recherche
import { Suspense } from "react";


export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const query = params.query || "";

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
          Gestion Atelier 🛠️
        </h1>
        
        <RepairForm />

        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Liste des travaux</h2>
          
          {/* Affiche la barre de recherche */}
          <SearchBar />

          {/* On passe la query à la liste sans Suspense pour tester le rafraîchissement */}
          <RepairList query={query} />
        </div>
      </div>
    </main>
  );
}