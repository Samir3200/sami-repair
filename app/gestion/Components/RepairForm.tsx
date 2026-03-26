"use client";

import { createRepair } from "@/app/actions/repair-actions";
import { useState } from "react";

export default function RepairForm() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await createRepair(formData);
    setIsPending(false);

    if (result.success) {
      alert("Réparation enregistrée avec succès !");
      (document.getElementById("repair-form") as HTMLFormElement).reset();
    } else {
      alert("Erreur : " + result.error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Nouvelle Réparation</h2>
      
      <form id="repair-form" action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Client Info */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">Nom</label>
            <input name="nom" required className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Ben Salem" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">Prénom</label>
            <input name="prenom" required className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Ahmed" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-600">Adresse Client</label>
          <input name="adresse" className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Cité Ennasr, Tunis" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-600">Téléphone</label>
          <input name="telephone" className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: 22 123 456" />
        </div>

        <hr className="my-4" />

        {/* Device Info */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-600">Appareil</label>
          <input name="appareil" required className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: iPhone 13 Pro ou Laptop HP" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-600">Description du problème</label>
          <textarea name="reparation" required rows={3} className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Écran cassé, ne s'allume plus..." />
        </div>

        <div className="flex flex-col gap-1 w-full md:w-1/3">
          <label className="text-sm font-medium text-slate-600">Prix estimé (DT)</label>
          <input name="prix" type="number" step="0.01" required className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className={`w-full py-3 mt-4 text-white font-bold rounded-md transition-all ${isPending ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isPending ? "Enregistrement..." : "Enregistrer la fiche"}
        </button>
      </form>
    </div>
  );
}