// components/RepairList.tsx
import { sql } from "../../lib/db";
import { 
  toggleRepairStatusAction, 
  togglePaymentStatusAction, 
  toggleDeliveryStatusAction 
} from "@/app/actions/repair-actions";
import ToggleStatusForm from "@/app/Components/ToggleStatusForm";

interface Repair {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  telephone?: string;
  appareil: string;
  reparation_description: string;
  date_reception: Date;
  est_repare: boolean;
  est_paye: boolean;
  est_livre: boolean;
  prix: number;
}

export default async function RepairList({ query }: { query?: string }) {
  let repairs: Repair[];
  if (query && query.trim() !== "") {
    const q = `%${query.trim()}%`;
    repairs = (await sql`
      SELECT * FROM repairs
      WHERE nom ILIKE ${q}
         OR prenom ILIKE ${q}
         OR appareil ILIKE ${q}
         OR adresse ILIKE ${q}
         OR telephone ILIKE ${q}
      ORDER BY id DESC
    `) as Repair[];
  } else {
    repairs = (await sql`
      SELECT * FROM repairs ORDER BY id DESC
    `) as Repair[];
  }

  return (
    <div className="mt-10 overflow-x-auto bg-white shadow-md rounded-xl border border-slate-200">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Client & Appareil</th>
            <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Prix</th>
            <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Problème(s)</th>
            <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-center">Réparation</th>
            <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-center">Paiement</th>
            <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-center">Livraison</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {repairs.map((repair) => (
            <tr key={repair.id} className="hover:bg-slate-50/50 transition-colors">
              {/* Infos Client & Machine */}
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">
                    {repair.prenom} {repair.nom}
                  </span>
                  <span className="text-xs text-slate-700">
                    {repair.adresse}
                  </span>
                  {repair.telephone && (
                    <span className="text-xl text-slate-500">
                      📞 {repair.telephone}
                    </span>
                  )}
                  <span className="text-sm text-blue-600 font-medium">
                    {repair.appareil}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 uppercase">
                    Reçu le : {new Date(repair.date_reception).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </td>

              {/* Prix */}
              <td className="p-4">
                <span className="font-semibold text-slate-700">
                  {Number(repair.prix).toFixed(2)} <small className="text-[10px]">DT</small>
                </span>
              </td>

              {/* Description du problème */}
              <td className="p-4">
                <span className="text-sm text-slate-700">
                  {repair.reparation_description}
                </span>
              </td>

              {/* État Réparation (formulaire client) */}
              <td className="p-4 text-center">
                <ToggleStatusForm
                  id={repair.id}
                  currentStatus={repair.est_repare}
                  action={toggleRepairStatusAction}
                  labelActive="RÉPARÉ"
                  labelInactive="À RÉPARER"
                  colorActive="bg-green-100 text-green-700 border border-green-200"
                  colorInactive="bg-orange-100 text-orange-700 border border-orange-200"
                />
              </td>

              {/* État Paiement (formulaire client) */}
              <td className="p-4 text-center">
                <ToggleStatusForm
                  id={repair.id}
                  currentStatus={repair.est_paye}
                  action={togglePaymentStatusAction}
                  labelActive="PAYÉ"
                  labelInactive="IMPAYÉ"
                  colorActive="bg-blue-100 text-blue-700 border border-blue-200"
                  colorInactive="bg-slate-100 text-slate-500 border border-slate-200"
                />
              </td>

              {/* État Livraison (formulaire client) */}
              <td className="p-4 text-center">
                <ToggleStatusForm
                  id={repair.id}
                  currentStatus={repair.est_livre}
                  action={toggleDeliveryStatusAction}
                  labelActive="LIVRÉ"
                  labelInactive="EN ATELIER"
                  colorActive="bg-purple-100 text-purple-700 border border-purple-200"
                  colorInactive="bg-slate-50 text-slate-400 border border-slate-100"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Message si vide */}
      {repairs.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-slate-400 italic">Aucune réparation en cours.</p>
        </div>
      )}
    </div>
  );
}
