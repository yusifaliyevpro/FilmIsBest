import "@/lib/env.server";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Providers } from "@/components/providers";
import { inter } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

// Match the toast surface to the admin panel's zinc cards (admin only).
// oxlint-disable-next-line typescript/no-unsafe-type-assertion
const adminToasterStyle = { "--normal-bg": "#27272a", "--normal-border": "#3f3f46" } as CSSProperties;

export default async function RootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`dark ${inter.variable} min-h-screen scrollbar-none bg-[#111113] text-white`}>
      <body>
        <Providers toasterStyle={adminToasterStyle}>
          <main className="relative flex min-h-screen flex-col items-center justify-start bg-[#111113] text-foreground">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
