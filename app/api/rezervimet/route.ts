
import { getSql } from "@/lib/db";
import { profiliIm } from "@/lib/lejet";
import {
  lexoKerkesatEShoferit,
  lexoKerkesatEUdhetarit,
} from "@/lib/rezervimet";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const profili = await profiliIm();

    if (!profili) {
      return NextResponse.json(
        { error: "Hyr në llogarinë GitHub." },
        { status: 401 }
      );
    }

    const kerkesat =
      profili.roli === "shofer"
        ? await lexoKerkesatEShoferit()
        : await lexoKerkesatEUdhetarit();

    return NextResponse.json({ kerkesat });
  } catch (error) {
    console.error("Gabim gjatë leximit të kërkesave:", error);

    return NextResponse.json(
      { error: "Kërkesat nuk mund të lexoheshin." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const profili = await profiliIm();

    if (!profili) {
      return NextResponse.json(
        { error: "Hyr në llogarinë GitHub para se të rezervosh." },
        { status: 401 }
      );
    }

    if (profili.roli !== "udhetar") {
      return NextResponse.json(
        { error: "Vetëm udhëtarët mund të dërgojnë kërkesa." },
        { status: 403 }
      );
    }

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

    if (
      emri.length > 100 ||
      email.length > 255 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Emri ose email-i nuk është i vlefshëm." },
        { status: 400 }
      );
    }

    const sql = getSql();

    const rezultat = await sql`
      INSERT INTO rezervimet (
        udhetimi_id,
        emri_studentit,
        email_studentit,
        github_id
      )
      SELECT
        u.id,
        ${emri},
        ${email},
        ${profili.id}
      FROM udhetimet u
      WHERE u.id = ${udhetimiId}
        AND u.vende > 0
        AND u.shofer_id <> ${profili.id}
      RETURNING id, statusi
    `;

    if (rezultat.length === 0) {
      return NextResponse.json(
        {
          error:
            "Udhëtimi nuk ekziston, nuk ka vende ose është udhëtimi yt.",
        },
        { status: 409 }
      );
    }

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
