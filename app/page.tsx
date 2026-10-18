

import { Suspense } from "react";
import { lexoUdhetimet } from "../lib/udhetimet";
import FaqjaKryesore from "./FaqjaKryesore";

async function ListaUdhetimeve() {
  const udhetimet = await lexoUdhetimet();

  return <FaqjaKryesore udhetimet={udhetimet} />;
}

export default function Home() {
  return (
    <Suspense fallback={<p className="p-8">Duke ngarkuar udhëtimet...</p>}>
      <ListaUdhetimeve />
    </Suspense>
  );
}
