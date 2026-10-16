
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export const instant = false;

export default async function KerkesaPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-100 p-8 text-gray-900">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
        <p className="font-semibold text-blue-700">
          AAB College — UniRide
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Kërkesë për vend në udhëtim
        </h1>

        <p className="mt-6">
          Kërkesa për udhëtimin #{id} është në pritje.
        </p>

        <p className="mt-3 text-gray-600">
          Ky është vetëm një demonstrim. Nuk kryhet rezervim real
          dhe kërkesa nuk ruhet në databazë.
        </p>

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
