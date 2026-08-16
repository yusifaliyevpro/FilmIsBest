import { Inter } from "next/font/google";

// `latin-ext` is required for the Azerbaijani/Turkish glyphs (ə, ğ, ş, ı, ç)
// that appear throughout the UI; without it those characters fall back to a
// system font and shift the layout.
export const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });
