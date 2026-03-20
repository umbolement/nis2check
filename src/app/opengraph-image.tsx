import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NIS2Check — Ist Ihr Unternehmen NIS2-pflichtig?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0B1D3A 0%, #142D54 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "#0E7490",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            ✓
          </div>
          <span style={{ color: "#94A3B8", fontSize: "24px", fontWeight: 600 }}>
            NIS2Check
          </span>
        </div>

        <h1
          style={{
            color: "white",
            fontSize: "56px",
            fontWeight: "bold",
            lineHeight: 1.15,
            margin: 0,
            maxWidth: "800px",
          }}
        >
          Ist Ihr Unternehmen{" "}
          <span style={{ color: "#22D3EE" }}>NIS2-pflichtig?</span>
        </h1>

        <p
          style={{
            color: "#94A3B8",
            fontSize: "24px",
            marginTop: "24px",
            lineHeight: 1.5,
            maxWidth: "700px",
          }}
        >
          Kostenloser Schnellcheck in 2 Minuten. Basierend auf den offiziellen
          EU- und BSI-Kriterien.
        </p>

        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "40px",
          }}
        >
          {[
            { value: "~30.000", label: "Betroffene Firmen" },
            { value: "€10 Mio.", label: "Max. Bußgeld" },
            { value: "18", label: "Sektoren" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#22D3EE", fontSize: "28px", fontWeight: "bold" }}>
                {stat.value}
              </span>
              <span style={{ color: "#64748B", fontSize: "14px", marginTop: "4px" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
