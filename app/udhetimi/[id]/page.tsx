import { gjejUdhetimin } from "../../lib/udhetimet";
import Link from "next/link";
import RezervoVendin from "../../components/RezervoVendin";

export const instant = false;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const udhetimi = gjejUdhetimin(id);

  if (!udhetimi) {
    return (
      <main className="min-h-screen bg-slate-100 p-8 text-gray-900">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold">
            Udhëtimi nuk u gjet
          </h1>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 text-white"
          >
            Kthehu te faqja kryesore
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8 text-gray-900">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
        <p className="font-semibold text-blue-700">
          AAB College — UniRide
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Detajet e udhëtimit
        </h1>

        <div className="mt-6 space-y-4">
          <p>
            <strong>Nisja:</strong> {udhetimi.nisja}
          </p>

          <p>
            <strong>Destinacioni:</strong>{" "}
            {udhetimi.destinacioni}
          </p>

          <p>
            <strong>Ora:</strong> {udhetimi.ora}
          </p>

          <p>
            <strong>Vendtakimi:</strong>{" "}
            {udhetimi.vendtakimi}
          </p>

          <p>
            <strong>Vende të lira:</strong> {udhetimi.vende}
          </p>
        </div>

        <RezervoVendin vende={udhetimi.vende} />

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-gray-700 px-5 py-3 text-white hover:bg-gray-800"
        >
          Kthehu te udhëtimet
        </Link>
      </div>
    </main>
  );
}