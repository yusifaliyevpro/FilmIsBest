import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not found",
  description: "The page you're looking for was not found!",
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURI("404 Not found")}`,
        width: 1200,
        height: 1000,
        alt: `FilmIsBest | 404 Not found | OpenGraph-Image`,
        type: "image/png",
      },
    ],
  },
};

export default async function NotFoundPage() {
  return (
    <main className="relative flex min-h-svh w-full flex-col items-center justify-center">
      <h1 className="relative mx-7 text-center text-2xl font-bold sm:text-3xl">
        The page you&apos;re looking for was not found!
      </h1>
    </main>
  );
}
