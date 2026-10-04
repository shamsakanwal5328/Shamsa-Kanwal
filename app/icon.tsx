import { ImageResponse } from "next/og";
import { data } from "@/lib/data";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#17324d",
          color: "#ffffff",
          fontSize: 30,
          fontWeight: 700,
          borderRadius: 12,
        }}
      >
        {data.personal.initials}
      </div>
    ),
    size,
  );
}
