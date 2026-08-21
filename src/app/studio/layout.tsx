import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function RootLayout({ children }: { children: Readonly<React.ReactNode> }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
