import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  // ImageResponse cannot resolve CSS variables; these match the accent/surface tokens.
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#3246ee", color: "#ffffff", fontFamily: "sans-serif", fontWeight: 700, fontSize: 72, borderRadius: 16, paddingTop: 12 }}>*</div>, size);
}
