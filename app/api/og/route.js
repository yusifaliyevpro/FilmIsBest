import { ImageResponse } from "next/og";
import { BASE_URL } from "@/constants";

export const runtime = "edge";
export const alt = "FilmIsBest OpenGraph-Image";
export const size = {
  width: 1200,
  height: 1000,
};
export const contentType = "image/png";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Default title";
    const interSemiBold = fetch(
      new URL("/public/fonts/Inter-Bold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div tw="relative flex flex-col w-full bg-white h-full items-center justify-start">
          <div tw="relative flex inset-0 justify-center items-start mt-28">
            <img
              src={`${BASE_URL}/icon.png`}
              height={550}
              width={550}
              alt="FilmIsBest Logo"
            />
            <div tw="absolute flex inset-0" />
          </div>
          <div tw="relative flex items-start justify-center mt-10 text-black">
            <div tw="text-8xl font-bold">{title}</div>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Inter",
            data: await interSemiBold,
            style: "normal",
            weight: 700,
          },
        ],
        height: 1000,
        width: 1200,
        alt: `FilmIsBest | OpenGraph-Image`,
      },
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
