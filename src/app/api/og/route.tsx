/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/lib/constants";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "Default title";
    const interSemiBold = await readFile(join(process.cwd(), "public/fonts/Poppins-SemiBold.ttf"));

    return new ImageResponse(
      (
        <div tw="relative flex h-full w-full flex-col items-center justify-start bg-white">
          <div tw="relative inset-0 mt-28 flex items-start justify-center">
            <img alt="FilmIsBest Logo" height={550} src={`${BASE_URL}/icon.png`} width={550} />
            <div tw="absolute inset-0 flex" />
          </div>
          <div tw="relative mt-10 flex items-start justify-center text-black">
            <div tw="text-9xl font-bold">{title}</div>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Inter",
            data: interSemiBold,
            style: "normal",
            weight: 400,
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
