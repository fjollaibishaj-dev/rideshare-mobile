import { Suspense } from "react";
import { lexoUdhetimet } from "../lib/udhetimet";
import { lexoPreferimet } from "../lib/preferimet";
import FaqjaKryesore from "./FaqjaKryesore";

async function ListaUdhetimeve() {
  const udhetimet = await lexoUdhetimet();
  const preferimet = await lexoPreferimet();

  return (
    <FaqjaKryesore
      udhetimet={udhetimet}
      preferimetFillestare={preferimet}
    />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<p className="p-8">Duke ngarkuar udhëtimet...</p>}>
      <ListaUdhetimeve />
    </Suspense>
  );
}