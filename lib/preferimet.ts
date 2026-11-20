"use server";

import { profiliIm } from "./lejet";
import { getSql } from "./db";

export async function lexoPreferimet(): Promise<string[]> {
  const profili = await profiliIm();

  if (!profili) return [];

  const sql = getSql();

  const rows = await sql`
    SELECT udhetimi_id
    FROM preferimet
    WHERE github_id = ${profili.id}
  `;

  return rows.map((row) => String(row.udhetimi_id));
}

export async function ruajPreferimin(udhetimiId: string) {
  try {
    const profili = await profiliIm();
    console.log("A u gjet profili:", Boolean(profili));

    if (!profili) {
      return { sukses: false, mesazhi: "Duhet të kyçesh me GitHub." };
    }

    if (!udhetimiId) {
      return { sukses: false, mesazhi: "Udhëtimi nuk është valid." };
    }

    const sql = getSql();

    await sql`
      INSERT INTO preferimet (github_id, udhetimi_id)
      VALUES (${profili.id}, ${udhetimiId})
      ON CONFLICT (github_id, udhetimi_id) DO NOTHING
    `;

        return { sukses: true };
  } catch (error) {
    console.error("Gabim gjatë ruajtjes së preferimit:", error);

    return {
      sukses: false,
      mesazhi: "Preferimi nuk u ruajt. Provo përsëri.",
    };
  }
}