export const metadata = {
  title: "Sanity & NextJS",
  description: "FilmIsBest Sanity Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
