
"use client";

import Link from "next/link";
import { useState } from "react";
import { ruajPreferimin } from "../../lib/preferimet";

type Props = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: number;
  preferuar: boolean;
};

export default function KartaUdhetimi({
  id,
  nisja,
  destinacioni,
  ora,
  vendtakimi,
  vende,
  preferuar,
}: Props) {
  const [eshtePreferuar, setEshtePreferuar] = useState(preferuar);
  const [nePritje, setNePritje] = useState(false);
  const [mesazhi, setMesazhi] = useState("");

  async function ruaj() {
    if (eshtePreferuar || nePritje) return;

    setEshtePreferuar(true);
    setNePritje(true);
    setMesazhi("Po ruhet…");

    try {
      const rezultati = await ruajPreferimin(id);

      if (!rezultati.sukses) {
        setEshtePreferuar(false);
        setMesazhi("Provo përsëri");
        return;
      }

      setMesazhi("I ruajtur");
    } catch {
      setEshtePreferuar(false);
      setMesazhi("Provo përsëri");
    } finally {
      setNePritje(false);
    }
  }

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: "14px",
        padding: "20px",
        marginBottom: "16px",
        backgroundColor: "#ffffff",
        color: "#222222",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>
        {nisja} → {destinacioni}
      </h2>

      <p style={{ marginTop: "10px" }}>🕒 Ora: {ora}</p>

      <p style={{ marginTop: "8px" }}>
        Vendtakimi: {vendtakimi}
      </p>

      <p style={{ marginTop: "8px" }}>
        Vende të lira: {vende}
      </p>

      <button
        type="button"
        onClick={ruaj}
        disabled={eshtePreferuar || nePritje}
        style={{
          marginTop: "14px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          backgroundColor: "#ffffff",
          color: "#222222",
          cursor: eshtePreferuar || nePritje ? "default" : "pointer",
        }}
      >
        {eshtePreferuar ? "⭐ I preferuar" : "☆ Ruaj si të preferuar"}
      </button>

      {mesazhi && (
        <p style={{ marginTop: "8px" }} role="status">
          {mesazhi}
        </p>
      )}

      {vende > 0 ? (
        <Link
          href={`/udhetimi/${id}`}
          style={{
            display: "inline-block",
            marginTop: "14px",
            padding: "10px 16px",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          Shiko udhëtimin
        </Link>
      ) : (
        <button
          type="button"
          disabled
          style={{
            marginTop: "14px",
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#aaaaaa",
            color: "#ffffff",
            cursor: "not-allowed",
          }}
        >
          Nuk ka vende të lira
        </button>
      )}
    </article>
  );
}
