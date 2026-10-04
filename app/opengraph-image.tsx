import { ImageResponse } from "next/og";
import { data } from "@/lib/data";

export const alt = data.site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { personal, education } = data;
  const degree = education[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f8f6",
          borderLeft: "24px solid #17324d",
          padding: "72px 80px",
          color: "#1e2933",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#315c72", fontWeight: 600, letterSpacing: 2 }}>
          ACADEMIC PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: "#17324d" }}>{personal.name}</div>
          <div style={{ fontSize: 36, marginTop: 16, color: "#315c72" }}>{personal.title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#55636f" }}>
          {`${degree.degree} · ${degree.institution} · CGPA ${degree.cgpa}`}
        </div>
      </div>
    ),
    size,
  );
}
