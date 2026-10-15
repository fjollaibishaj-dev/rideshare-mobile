import Link from "next/link";

type Props = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: number;
};

export default function KartaUdhetimi({
  id,
  nisja,
  destinacioni,
  ora,
  vendtakimi,
  vende,
}: Props) {
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
            borderRadius: "8px",
            border: "none",
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