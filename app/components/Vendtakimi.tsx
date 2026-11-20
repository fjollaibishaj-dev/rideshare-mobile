
"use client";

import { useState } from "react";

type LocationState =
  | "idle"
  | "loading"
  | "success"
  | "denied"
  | "timeout"
  | "unavailable";

export default function Vendtakimi() {
  const [draft, setDraft] = useState("");
  const [vendtakimiKonfirmuar, setVendtakimiKonfirmuar] = useState("");
  const [gabimi, setGabimi] = useState("");
  const [locationState, setLocationState] =
    useState<LocationState>("idle");
  const [locationMessage, setLocationMessage] = useState("");
  const [saktesia, setSaktesia] = useState<number | null>(null);

  function konfirmoVendtakimin() {
    const vendi = draft.trim();

    if (!vendi) {
      setGabimi("Shkruaj vendtakimin para konfirmimit.");
      return;
    }

    setVendtakimiKonfirmuar(vendi);
    setGabimi("");
  }

  function perdorVendndodhjen() {
    if (!navigator.geolocation) {
      setLocationState("unavailable");
      setLocationMessage(
        "Vendndodhja nuk është e disponueshme. Shkruaj vendtakimin vetë."
      );
      return;
    }

    setLocationState("loading");
    setLocationMessage("Po kërkojmë vendndodhjen…");
    setSaktesia(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSaktesia(position.coords.accuracy);
        setLocationState("success");
        setLocationMessage("Pozicioni u mor.");
      },
      (error) => {
        if (error.code === 1) {
          setLocationState("denied");
          setLocationMessage(
            "Leja u refuzua. Shkruaj vendtakimin vetë."
          );
        } else if (error.code === 3) {
          setLocationState("timeout");
          setLocationMessage(
            "Kërkesa për vendndodhje përfundoi me kohë. Shkruaj vendtakimin vetë."
          );
        } else {
          setLocationState("unavailable");
          setLocationMessage(
            "Vendndodhja nuk mund të përcaktohet. Shkruaj vendtakimin vetë."
          );
        }
      },
      { timeout: 10000 }
    );
  }

  return (
    <section className="mt-8 space-y-4 rounded-xl border border-slate-200 p-5">
      <h2 className="text-xl font-bold">Vendtakimi</h2>

      <label htmlFor="vendtakimi" className="block font-medium">
        Shkruaj vendtakimin
      </label>

      <input
        id="vendtakimi"
        data-testid="meeting-input"
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="P.sh. Biblioteka"
        className="w-full rounded-lg border border-gray-300 p-3"
      />

      <button
        type="button"
        data-testid="confirm-meeting"
        onClick={konfirmoVendtakimin}
        className="rounded-lg bg-blue-700 px-5 py-3 text-white hover:bg-blue-800"
      >
        Konfirmo në telefon
      </button>

      <p data-testid="confirmed-meeting">
        {vendtakimiKonfirmuar}
      </p>

      <p data-testid="meeting-error" role="alert">
        {gabimi}
      </p>

      <button
        type="button"
        data-testid="locate-me"
        onClick={perdorVendndodhjen}
        disabled={locationState === "loading"}
        className="block rounded-lg bg-green-700 px-5 py-3 text-white hover:bg-green-800 disabled:opacity-50"
      >
        {locationState === "loading"
          ? "Po kërkojmë vendndodhjen…"
          : "Përdor vendndodhjen time"}
      </button>

      <p
        data-testid="location-status"
        data-state={locationState}
        role="status"
      >
        {locationMessage}
      </p>

      <p data-testid="location-accuracy">
        {saktesia !== null
          ? `Saktësia: ${Math.round(saktesia)} metra.`
          : ""}
      </p>
    </section>
  );
}
