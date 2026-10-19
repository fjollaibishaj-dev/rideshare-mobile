"use client";

import { useState } from "react";

type Props = {
  udhetimiId: string;
  vende: number;
};

export default function FormulariRezervimit({
  udhetimiId,
  vende,
}: Props) {
  const [emri, setEmri] = useState("");
  const [email, setEmail] = useState("");
  const [mesazhi, setMesazhi] = useState("");
  const [dukeDerguar, setDukeDerguar] = useState(false);

  async function dergoKerkesen(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMesazhi("");
    setDukeDerguar(true);

    try {
      const response = await fetch("/api/rezervimet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          udhetimiId,
          emri,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMesazhi(data.error ?? "Kërkesa nuk u ruajt.");
        return;
      }

      setMesazhi(
        data.message ?? "Kërkesa u ruajt me sukses."
      );
      setEmri("");
      setEmail("");
    } catch {
      setMesazhi(
        "Nuk u lidhëm me serverin. Provo përsëri."
      );
    } finally {
      setDukeDerguar(false);
    }
  }

  if (vende <= 0) {
    return (
      <p className="mt-6 rounded-lg bg-red-100 p-4 text-red-800">
        Nuk ka vende të lira për rezervim.
      </p>
    );
  }

  return (
    <form
      onSubmit={dergoKerkesen}
      className="mt-6 space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-gray-900">
        Kërko rezervim
      </h2>

      <div>
        <label
          htmlFor="emri"
          className="mb-1 block font-medium text-gray-700"
        >
          Emri dhe mbiemri
        </label>

        <input
          id="emri"
          type="text"
          value={emri}
          onChange={(event) => setEmri(event.target.value)}
          required
          maxLength={100}
          autoComplete="name"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-700"
          placeholder="Shkruaj emrin tënd"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          maxLength={255}
          autoComplete="email"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-700"
          placeholder="emri@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={dukeDerguar}
        className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {dukeDerguar
          ? "Duke dërguar..."
          : "Dërgo kërkesën"}
      </button>

      {mesazhi && (
        <p role="status" className="text-sm text-gray-700">
          {mesazhi}
        </p>
      )}
    </form>
  );
}