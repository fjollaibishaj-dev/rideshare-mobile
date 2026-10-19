import Link from "next/link";
import { notFound } from "next/navigation";
import { lexoUdhetimet } from "@/lib/udhetimet";
import FormulariRezervimit from "@/app/components/FormulariRezervimit";

type Props = {
  params: Promise<{ id: string }>;
};

export const instant = false;

export default async function KerkesaPage({ params }: Props) {
  const { id } = await params;

  const udhetimet = await lexoUdhetimet();

  const udhetimi = udhetimet.find(
    (u) => String(u.id) === id
  );

  if (!udhetimi) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8 text-gray-900">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
        <p className="font-semibold text-blue-700">
          AAB College — UniRide
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Kërkesë për rezervim
        </h1>

        <div className="mt-5 rounded-lg bg-slate-50 p-4">
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
            <strong>Vendet e lira:</strong>{" "}
            {udhetimi.vendeLira}
          </p>
        </div>

        <FormulariRezervimit
          udhetimiId={String(udhetimi.id)}
          vende={udhetimi.vendeLira}
        />

        <Link
          href={`/udhetimi/${id}`}
          className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 text-white hover:bg-blue-800"
        >
          Kthehu te detajet e udhëtimit
        </Link>
      </div>
    </main>
  );
}
