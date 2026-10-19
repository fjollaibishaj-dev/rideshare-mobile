
"use client";

import Link from "next/link";

type Props = {
  id: number;
  vende: number;
};

export default function RezervoVendin({ id, vende }: Props) {
  return (
    <div className="mt-6">
      {vende > 0 ? (
        <Link
          href={`/udhetimi/${id}/kerkesa`}
          className="inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Rezervo vendin
        </Link>
      ) : (
        <p className="rounded-lg bg-red-100 p-4 text-red-800">
          Nuk ka vende të lira për rezervim.
        </p>
      )}
    </div>
  );
}
