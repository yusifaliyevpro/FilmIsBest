import { Inter, Poppins } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
