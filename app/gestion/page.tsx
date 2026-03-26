import RepairForm from "@/app/gestion/Components/RepairForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function GestionPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Gestion Atelier</h1>
      <RepairForm />
    </main>
  );
}
