

import { lexoUdhetimet } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

// Kthen vetëm të dhënat publike të udhëtimeve.
export async function GET() {
  try {
    const rows = await lexoUdhetimet();

    const trips = rows.map(
      ({ id, nisja, destinacioni, ora, vendiNisjes, vendeLira }) => ({
        id,
        nisja,
        destinacioni,
        ora,
        vendtakimi: vendiNisjes,
        vende: vendeLira,
      })
    );

    return Response.json(
      { trips },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return Response.json(
      { error: "Lista nuk mund të lexohet tani." },
      { status: 503 }
    );
  }
}
