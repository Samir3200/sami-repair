"use server"

import { sql } from "../lib/db";
import { revalidatePath } from "next/cache";
// Server actions compatibles formulaire pour RepairList

export async function toggleRepairStatusAction(formData: FormData): Promise<void> {
  'use server';
  const id = Number(formData.get('id'));
  const currentStatus = formData.get('currentStatus') === 'true';
  await toggleRepairStatus(id, currentStatus);
}


export async function togglePaymentStatusAction(formData: FormData): Promise<void> {
  'use server';
  const id = Number(formData.get('id'));
  const currentStatus = formData.get('currentStatus') === 'true';
  await togglePaymentStatus(id, currentStatus);
}


export async function toggleDeliveryStatusAction(formData: FormData): Promise<void> {
  'use server';
  const id = Number(formData.get('id'));
  const currentStatus = formData.get('currentStatus') === 'true';
  await toggleDeliveryStatus(id, currentStatus);
}


export async function createRepair(formData: FormData) {
  // 1. Extraction des données du formulaire
  const nom = formData.get("nom") as string;
  const prenom = formData.get("prenom") as string;
  const adresse = formData.get("adresse") as string;
  const telephone = formData.get("telephone") as string;
  const appareil = formData.get("appareil") as string;
  const reparation = formData.get("reparation") as string;
  const prix = parseFloat(formData.get("prix") as string) || 0;

  try {
    // 2. Insertion dans Neon
    await sql`
      INSERT INTO repairs (nom, prenom, adresse, telephone, appareil, reparation_description, prix)
      VALUES (${nom}, ${prenom}, ${adresse}, ${telephone}, ${appareil}, ${reparation}, ${prix})
    `;

    // 3. Rafraîchir la page pour voir la nouvelle réparation
    revalidatePath("/dashboard"); 
    
    return { success: true };
  } catch (error) {
    console.error("Erreur d'insertion:", error);
    return { success: false, error: "Impossible d'enregistrer la réparation" };
  }
}

// app/actions/repair-actions.ts

export async function toggleRepairStatus(id: number, currentStatus: boolean) {
  try {
    await sql`UPDATE repairs SET est_repare = ${!currentStatus} WHERE id = ${id}`;
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export async function togglePaymentStatus(id: number, currentStatus: boolean) {
  try {
    await sql`UPDATE repairs SET est_paye = ${!currentStatus} WHERE id = ${id}`;
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export async function toggleDeliveryStatus(id: number, currentStatus: boolean) {
  try {
    await sql`UPDATE repairs SET est_livre = ${!currentStatus} WHERE id = ${id}`;
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}