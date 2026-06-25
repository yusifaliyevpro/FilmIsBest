import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { isSanityProjectMember } from "@/sanity/lib/verifyUser";

const bodySchema = z.object({ prompt: z.string().min(1).max(200), token: z.string().min(3) });

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export async function POST(req: NextRequest) {
  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) return new NextResponse("Invalid film name", { status: 400 });
  const { prompt: filmName, token } = parsed.data;

  const isMember = await isSanityProjectMember(token);
  if (!isMember) return new NextResponse("Unauthorized", { status: 401 });

  const result = streamText({
    model: openrouter.completion("deepseek/deepseek-chat-v3.1"),
    prompt:
      `${filmName} filmi haqqında 60-70 sözdən ibarət Azərbaycan dilində description yaz.` +
      "Filmin adını tərcümə etmə. Heç bir markdown işlətmə sadəcə düz mətni yaz.",
    system:
      "Sən sadəcə düz mətn yazmalısan. Heç bir markdown, stil, HTML və ya formatlaşdırma istifadə etmə. " +
      "Cavabın sadəcə Azərbaycan dilində, 60-70 söz arası qədər olmalıdır. " +
      "Description film haqqında kiçik məlumat və ana sujetdən bəhs etməlidir. əsas detallar və filmin hekayəsi" +
      'Filmin adını tərcümə etmə. Film adını dırnaq içinə al (misal üçün "Movie Name").' +
      "Bu Description bir film websaytında film haqqında kiçik məlumat vermək üçün istifadə olunacaq.",
  });

  return result.toTextStreamResponse();
}
