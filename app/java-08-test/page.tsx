

import Vendtakimi from "../components/Vendtakimi";

export default function Java08TestPage() {
  const udhetimiTest = {
    shoferi: "Driton",
    nisja: "Prishtinë",
    destinacioni: "AAB",
    ora: "08:00",
    vendtakimi: "Stacioni i autobusëve",
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8 text-gray-900">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
        <p className="font-semibold text-blue-700">
          Java 8 — Testimi
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Testimi i vendtakimit
        </h1>

        <div className="mt-6 space-y-3">
          <p>
            <strong>Shoferi:</strong> {udhetimiTest.shoferi}
          </p>

          <p>
            <strong>Nisja:</strong> {udhetimiTest.nisja}
          </p>

          <p>
            <strong>Destinacioni:</strong> {udhetimiTest.destinacioni}
          </p>

          <p>
            <strong>Ora:</strong> {udhetimiTest.ora}
          </p>

          <p>
            <strong>Vendtakimi aktual:</strong> {udhetimiTest.vendtakimi}
          </p>
        </div>

        <Vendtakimi />
      </div>
    </main>
  );
}
