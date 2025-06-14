/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/lib/constants";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "Default title";
    const interSemiBold = fetch(new URL("./../../../../public/fonts/Inter-Bold.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    );

    return new ImageResponse(
      (
        <div tw="relative flex flex-col w-full bg-white h-full items-center justify-start">
          <div tw="relative flex inset-0 justify-center items-start mt-28">
            <img alt="FilmIsBest Logo" height={550} src={`${BASE_URL}/icon.png`} width={550} />
            <div tw="absolute flex inset-0" />
          </div>
          <div tw="relative flex items-start justify-center mt-10 text-black">
            <div tw="text-9xl font-bold">{title}</div>
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
      },
    );
  } catch (e) {
    console.log(e);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
