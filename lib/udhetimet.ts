
import { getSql } from "./db";

export type Udhetim = {
  id: number;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendiNisjes: string;
  vendeLira: number;
};

export async function lexoUdhetimet(): Promise<Udhetim[]> {
  const sql = getSql();

  const udhetimet = await sql`
    SELECT
      id,
      nisja,
      destinacioni,
      ora,
      vendtakimi AS "vendiNisjes",
      vende AS "vendeLira"
    FROM udhetimet
    ORDER BY ora ASC
  `;

  return udhetimet as Udhetim[];
}
