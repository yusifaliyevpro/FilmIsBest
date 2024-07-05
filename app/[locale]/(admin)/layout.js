import "./admin.css";
import { Providers } from "@/app/components/Providers";
import { BASE_URL } from "@/lib/constants";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FilmIsBest",
    template: "FilmIsBest | %s",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="az" className="bg-gray-100 dark">
      <body className={inter.className}>
        <Providers>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                borderRadius: "30px",
                border: "2px solid #007bff",
                color: "#fff",
                background: "#191e25",
              },
              iconTheme: {
                primary: "#007bff",
                secondary: "#FFFAEE",
              },
            }}
            position="bottom-right"
            reverseOrder={false}
          />
          <main className="min-h-screen bg-white text-black">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
