"use server";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export async function generateDescription(filmName: string) {
  if (typeof filmName !== "string") return { error: "Invalid film name" };
  const prompt =
    `${filmName} filmi haqqında 60-70 sözdən ibarət Azərbaycan dilində description yaz.` +
    "Filmin adını tərcümə etmə. Heç bir markdown işlətmə sadəcə düz mətni yaz.";

  const { textStream } = streamText({
    model: openrouter("deepseek/deepseek-chat-v3.1"),
    prompt,
    system:
      "Sən sadəcə düz mətn yazmalısan. Heç bir markdown, stil, HTML və ya formatlaşdırma istifadə etmə. " +
      "Cavabın sadəcə Azərbaycan dilində, 60-70 söz arası qədər olmalıdır. " +
      "Description film haqqında kiçik məlumat və ana sujetdən bəhs etməlidir. əsas detallar və filmin hekayəsi" +
      'Filmin adını tərcümə etmə. Film adını dırnaq içinə al (misal üçün "Movie Name").' +
      "Bu Description bir film websaytında film haqqında kiçik məlumat vermək üçün istifadə olunacaq.",
  });

  return { textStream };
}
