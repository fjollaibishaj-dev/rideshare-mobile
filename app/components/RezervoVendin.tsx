"use client";

import { useEffect, useState } from "react";

type Props = {
  vende: number;
};

export default function RezervoVendin({ vende }: Props) {
  const [rezervuar, setRezervuar] = useState(false);
  const [gati, setGati] = useState(false);

  useEffect(() => {
    const ruajtja = localStorage.getItem("rideshare-rezervimi");

    if (ruajtja === "po") {
      setRezervuar(true);
    }

    setGati(true);
  }, []);

  function rezervo() {
    localStorage.setItem("rideshare-rezervimi", "po");
    setRezervuar(true);
  }

  function anuloRezervimin() {
    localStorage.removeItem("rideshare-rezervimi");
    setRezervuar(false);
  }

  if (!gati) {
    return (
      <div className="mt-6 rounded-xl bg-gray-100 p-4">
        Duke kontrolluar rezervimin...
      </div>
    );
  }

  if (rezervuar) {
    return (
      <div className="mt-6 rounded-xl bg-green-100 p-4 text-green-800">
        <p className="font-bold">
          Rezervimi u ruajt me sukses!
        </p>

        <button
          onClick={anuloRezervimin}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Anulo rezervimin
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {vende > 0 ? (
        <button
          onClick={rezervo}
          className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Rezervo vendin
        </button>
      ) : (
        <p className="rounded-lg bg-red-100 p-4 text-red-800">
          Nuk ka vende të lira për rezervim.
        </p>
      )}
    </div>
  );
}