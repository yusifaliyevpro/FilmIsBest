import "../globals.css";
import Providers from "@/components/providers";
import "@/lib/env";
import { inter, poppins } from "@/lib/fonts";

export default async function RootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${poppins.variable} min-h-screen bg-gray-100 text-white`}
    >
      <Providers>
        <main className="relative flex min-h-screen flex-col items-center justify-start bg-white text-black">
          {children}
        </main>
      </Providers>
    </html>
  );
}
