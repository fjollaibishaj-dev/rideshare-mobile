
"use client";

import { useState } from "react";
import KartaUdhetimi from "../components/KartaUdhetimi";
import type { Udhetim } from "../lib/udhetimet";

function normalizoTekstin(teksti: string) {
  return teksti
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function FaqjaKryesore({
  udhetimet,
}: {
  udhetimet: Udhetim[];
}) {
  const [kerko, setKerko] = useState("");

  const udhetimetEFiltuara = udhetimet.filter((udhetimi) => {
    const qyteti = normalizoTekstin(udhetimi.nisja);
    const kerkimi = normalizoTekstin(kerko);

    return qyteti.includes(kerkimi);
  });

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 rounded-2xl bg-blue-700 p-6 text-white">
          <p className="text-sm font-medium">AAB College</p>

          <h1 className="mt-2 text-3xl font-bold">
            UniRide
          </h1>

          <p className="mt-2">
            Gjej udhëtimin tënd drejt universitetit.
          </p>
        </header>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <label
            htmlFor="kerko"
            className="mb-2 block font-semibold"
          >
            Kërko sipas qytetit të nisjes
          </label>

          <input
            id="kerko"
            type="text"
            value={kerko}
            onChange={(e) => setKerko(e.target.value)}
            placeholder="Shembull: Prishtinë"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </section>

        <h2 className="mb-4 text-2xl font-bold">
          Udhëtimet e disponueshme
        </h2>

        {udhetimetEFiltuara.length > 0 ? (
          <div className="grid gap-4">
            {udhetimetEFiltuara.map((udhetimi) => (
              <KartaUdhetimi
                key={udhetimi.id}
                id={String(udhetimi.id)}
                nisja={udhetimi.nisja}
                destinacioni={udhetimi.destinacioni}
                ora={udhetimi.ora}
                vendtakimi={udhetimi.vendiNisjes}
                vende={udhetimi.vendeLira}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="font-semibold">
              Nuk u gjet asnjë udhëtim.
            </p>

            <p className="mt-2 text-gray-500">
              Provo Prishtinë, Fushë Kosovë ose Lipjan.
            </p>

            <button
              onClick={() => setKerko("")}
              className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-white"
            >
              Shfaq të gjitha udhëtimet
            </button>
          </div>
        )}

        <footer className="mt-8 text-center text-sm text-slate-500">
          UniRide — projekt demonstrues për studentët e AAB College.
          <br />
          Të dhënat janë fiktive.
        </footer>
      </div>
    </main>
  );
}
