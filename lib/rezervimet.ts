
import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getSql } from "./db";

export async function lexoKerkesatEShoferit() {
  const session = await getServerSession(authOptions);
  const githubId = session?.user?.id;

  if (!githubId) {
    return [];
  }

  const sql = getSql();

  const kerkesat = await sql`
    SELECT
      r.id,
      r.udhetimi_id AS "udhetimiId",
      r.emri_studentit AS "emri",
      r.statusi,
      r.krijuar_me AS "krijuarMe",
      u.nisja,
      u.destinacioni,
      u.vende AS "vendeLira"
    FROM rezervimet r
    INNER JOIN udhetimet u
      ON u.id = r.udhetimi_id
    WHERE u.shofer_id = ${githubId}
    ORDER BY r.krijuar_me DESC
  `;

  return kerkesat;
}

export async function lexoKerkesatEUdhetarit() {
  const session = await getServerSession(authOptions);
  const githubId = session?.user?.id;

  if (!githubId) {
    return [];
  }

  const sql = getSql();

  const kerkesat = await sql`
    SELECT
      r.id,
      r.udhetimi_id AS "udhetimiId",
      r.statusi,
      r.krijuar_me AS "krijuarMe",
      u.nisja,
      u.destinacioni,
      u.ora,
      u.vende AS "vendeLira"
    FROM rezervimet r
    INNER JOIN udhetimet u
      ON u.id = r.udhetimi_id
    WHERE r.github_id = ${githubId}
    ORDER BY r.krijuar_me DESC
  `;

  return kerkesat;
}

// Pranimi i kërkesës nga shoferi pronar
export async function pranoKerkesen(rezervimiId: number) {
  const session = await getServerSession(authOptions);
  const githubId = session?.user?.id;

  if (!githubId) {
    return {
      sukses: false,
      mesazhi: "Duhet të kyçesh në llogarinë tënde.",
    };
  }

  if (!Number.isInteger(rezervimiId) || rezervimiId <= 0) {
    return {
      sukses: false,
      mesazhi: "ID e rezervimit nuk është e vlefshme.",
    };
  }

  const sql = getSql();

  // Përditësimi kryhet në mënyrë atomike.
  // Rezervimi bllokohet për të parandaluar pranimin e dyfishtë.
  const rezultat = await sql`
    WITH kerkesa AS MATERIALIZED (
      SELECT
        r.id,
        r.udhetimi_id
      FROM rezervimet r
      INNER JOIN udhetimet u
        ON u.id = r.udhetimi_id
      WHERE r.id = ${rezervimiId}
        AND u.shofer_id = ${githubId}
        AND r.statusi = 'Ne pritje'
      FOR UPDATE OF r
    ),
    udhetimi_perditesuar AS (
      UPDATE udhetimet u
      SET vende = u.vende - 1
      FROM kerkesa k
      WHERE u.id = k.udhetimi_id
        AND u.shofer_id = ${githubId}
        AND u.vende > 0
      RETURNING u.id
    ),
    rezervimi_perditesuar AS (
      UPDATE rezervimet r
      SET statusi = 'E pranuar'
      FROM kerkesa k
      INNER JOIN udhetimi_perditesuar up
        ON up.id = k.udhetimi_id
      WHERE r.id = k.id
      RETURNING r.id
    )
    SELECT id
    FROM rezervimi_perditesuar
  `;

  if (rezultat.length > 0) {
    return {
      sukses: true,
      mesazhi: "Kërkesa u pranua me sukses!",
    };
  }

  // Kontrollojmë pse nuk u pranua kërkesa.
  const kontrolli = await sql`
    SELECT
      r.statusi,
      u.vende AS "vendeLira"
    FROM rezervimet r
    INNER JOIN udhetimet u
      ON u.id = r.udhetimi_id
    WHERE r.id = ${rezervimiId}
      AND u.shofer_id = ${githubId}
    LIMIT 1
  `;

  if (kontrolli.length === 0) {
    return {
      sukses: false,
      mesazhi: "Nuk ke leje për ta pranuar këtë kërkesë.",
    };
  }

  if (kontrolli[0].statusi !== "Ne pritje") {
    return {
      sukses: false,
      mesazhi: "Kjo kërkesë është trajtuar më parë.",
    };
  }

  if (Number(kontrolli[0].vendeLira) <= 0) {
    return {
      sukses: false,
      mesazhi: "Nuk ka vende të lira për këtë udhëtim.",
    };
  }

  return {
    sukses: false,
    mesazhi: "Kërkesa nuk mund të pranohej. Provo përsëri.",
  };
}
