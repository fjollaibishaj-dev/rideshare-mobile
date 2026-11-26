
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Kerkesa = {
  id: number;
  udhetimiId: string;
  statusi: string;
  krijuarMe: string;
  emri?: string;
  nisja: string;
  destinacioni: string;
  ora?: string;
  vendeLira: number;
};

type Props = {
  roli: "shofer" | "udhetar";
};

export default function KerkesatLive({ roli }: Props) {
  const [kerkesat, setKerkesat] = useState<Kerkesa[]>([]);
  const [dukeNgarkuar, setDukeNgarkuar] = useState(true);
  const [poRilidhemi, setPoRilidhemi] = useState(false);
  const [dukePranuar, setDukePranuar] = useState<number | null>(null);
  const [mesazhi, setMesazhi] = useState("");
  const neProces = useRef(false);

  const kontrolloKerkesat = useCallback(async () => {
    if (neProces.current || !navigator.onLine) {
      setPoRilidhemi(true);
      setDukeNgarkuar(false);
      return;
    }

    neProces.current = true;

    try {
      const response = await fetch("/api/rezervimet", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Leximi dështoi.");
      }

      const data = await response.json();

      setKerkesat(data.kerkesat ?? []);
      setPoRilidhemi(false);
    } catch {
      setPoRilidhemi(true);
    } finally {
      neProces.current = false;
      setDukeNgarkuar(false);
    }
  }, []);

  async function pranoKerkesen(id: number) {
    setDukePranuar(id);
    setMesazhi("");

    try {
      const response = await fetch("/api/prano-rezervimin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rezervimiId: id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMesazhi(data.error ?? "Kërkesa nuk u pranua.");
        return;
      }

      setMesazhi(data.message ?? "Kërkesa u pranua me sukses!");

      await kontrolloKerkesat();
    } catch {
      setMesazhi("Nuk u lidhëm me serverin. Provo përsëri.");
    } finally {
      setDukePranuar(null);
    }
  }

  useEffect(() => {
    void kontrolloKerkesat();

    const interval = window.setInterval(() => {
      void kontrolloKerkesat();
    }, 5000);

    function kurRikthehetInterneti() {
      void kontrolloKerkesat();
    }

    function kurHumbetInterneti() {
      setPoRilidhemi(true);
    }

    window.addEventListener("online", kurRikthehetInterneti);
    window.addEventListener("offline", kurHumbetInterneti);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("online", kurRikthehetInterneti);
      window.removeEventListener("offline", kurHumbetInterneti);
    };
  }, [kontrolloKerkesat]);

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        {roli === "shofer"
          ? "Kërkesat për udhëtimet e mia"
          : "Rezervimet e mia"}
      </h2>

      {poRilidhemi && (
        <p
          role="status"
          className="mt-3 rounded-lg bg-yellow-100 p-3 text-yellow-800"
        >
          Po rilidhemi me serverin. Po ruajmë të dhënat e fundit.
        </p>
      )}

      {mesazhi && (
        <p role="status" className="mt-3 rounded-lg bg-blue-50 p-3 text-blue-800">
          {mesazhi}
        </p>
      )}

      {dukeNgarkuar ? (
        <p className="mt-4 text-gray-600">
          Duke ngarkuar kërkesat...
        </p>
      ) : kerkesat.length === 0 ? (
        <p className="mt-4 text-gray-600">
          Ende nuk ka kërkesa për t'u shfaqur.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {kerkesat.map((kerkesa) => (
            <article
              key={kerkesa.id}
              className="rounded-lg border border-gray-200 p-4"
            >
              <p className="font-semibold text-gray-900">
                {kerkesa.nisja} → {kerkesa.destinacioni}
              </p>

              {roli === "shofer" && (
                <p className="mt-1 text-gray-700">
                  Udhëtari: {kerkesa.emri}
                </p>
              )}

              {kerkesa.ora && (
                <p className="mt-1 text-gray-700">
                  Ora: {kerkesa.ora}
                </p>
              )}

              <p className="mt-1 text-gray-700">
                Statusi: <strong>{kerkesa.statusi}</strong>
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Vende të lira: {kerkesa.vendeLira}
              </p>

              {roli === "shofer" &&
                kerkesa.statusi === "Ne pritje" && (
                  <button
                    type="button"
                    onClick={() => pranoKerkesen(kerkesa.id)}
                    disabled={
                      dukePranuar !== null ||
                      kerkesa.vendeLira <= 0
                    }
                    className="mt-3 rounded-lg bg-green-700 px-5 py-2 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {dukePranuar === kerkesa.id
                      ? "Duke pranuar..."
                      : "Prano kërkesën"}
                  </button>
                )}
            </article>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500">
        Lista kontrollohet automatikisht çdo 5 sekonda.
      </p>
    </section>
  );
}
