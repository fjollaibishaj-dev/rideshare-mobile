
import { getSql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const udhetimiId = String(body.udhetimiId ?? "").trim();
    const emri = String(body.emri ?? "").trim();
    const email = String(body.email ?? "").trim();

    if (!udhetimiId || !emri || !email) {
      return NextResponse.json(
        { error: "Plotëso emrin dhe email-in." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email-i nuk është i vlefshëm." },
        { status: 400 }
      );
    }

    const sql = getSql();

    const udhetimet = await sql`
      SELECT id, vende
      FROM udhetimet
      WHERE id = ${udhetimiId}
      LIMIT 1
    `;

    if (udhetimet.length === 0) {
      return NextResponse.json(
        { error: "Udhëtimi nuk u gjet." },
        { status: 404 }
      );
    }

    if (Number(udhetimet[0].vende) <= 0) {
      return NextResponse.json(
        { error: "Nuk ka vende të lira." },
        { status: 409 }
      );
    }

    const rezultat = await sql`
      INSERT INTO rezervimet
        (udhetimi_id, emri_studentit, email_studentit)
      VALUES
        (${udhetimiId}, ${emri}, ${email})
      RETURNING id, statusi
    `;

    return NextResponse.json(
      {
        message: "Kërkesa u ruajt me sukses.",
        rezervimi: rezultat[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gabim gjatë ruajtjes së rezervimit:", error);

    return NextResponse.json(
      { error: "Kërkesa nuk mund të ruhej. Provo përsëri." },
      { status: 500 }
    );
  }
}
