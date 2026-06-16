export default function RootLayout({ children }: { children: Readonly<React.ReactNode> }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
