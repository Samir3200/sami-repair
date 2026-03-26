export const dynamic = "force-dynamic";

import RepairList from "@/app/travaux/Components/RepairList";
import SearchBar from "@/app/travaux/Components/SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function TravauxPage({ searchParams }: { searchParams?: Promise<{ query?: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const params = searchParams ? await searchParams : {};
  const query = params.query || "";
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Liste des Travaux</h1>
      <SearchBar />
      <RepairList query={query} />
    </main>
  );
}
