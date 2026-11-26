
import { NextResponse } from "next/server";
import { profiliIm } from "@/lib/lejet";
import { pranoKerkesen } from "@/lib/rezervimet";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const profili = await profiliIm();

    if (!profili) {
      return NextResponse.json(
        { error: "Hyr në llogarinë tënde GitHub." },
        { status: 401 }
      );
    }

    if (profili.roli !== "shofer") {
      return NextResponse.json(
        { error: "Vetëm shoferët mund të pranojnë kërkesa." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const rezervimiId = Number(body.rezervimiId);

    if (!Number.isInteger(rezervimiId) || rezervimiId <= 0) {
      return NextResponse.json(
        { error: "ID e rezervimit nuk është e vlefshme." },
        { status: 400 }
      );
    }

    const rezultat = await pranoKerkesen(rezervimiId);

    if (!rezultat.sukses) {
      return NextResponse.json(
        { error: rezultat.mesazhi },
        { status: 409 }
      );
    }

    return NextResponse.json({
      message: rezultat.mesazhi,
    });
  } catch (error) {
    console.error("Gabim gjatë pranimit të rezervimit:", error);

    return NextResponse.json(
      { error: "Kërkesa nuk mund të pranohej. Provo përsëri." },
      { status: 500 }
    );
  }
}
