import "./studio.css";
import { ReactNode } from "react";

export default async function RootLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
