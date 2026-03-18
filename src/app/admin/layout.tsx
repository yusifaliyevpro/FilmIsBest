import "@/lib/env.server";
import Providers from "@/components/providers";
import { inter, poppins } from "@/lib/fonts";
import "../globals.css";

export default async function RootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable} min-h-screen bg-gray-800 text-white`}>
      <body>
        <Providers>
          <main className="relative flex min-h-screen flex-col items-center justify-start bg-white text-black">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
