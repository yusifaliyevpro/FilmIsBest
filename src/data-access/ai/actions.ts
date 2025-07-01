"use server";

import { auth, signIn } from "../../lib/auth";
import { AdminEmail } from "@/lib/constants";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export async function generateDescription(filmName: string) {
  const session = await auth();
  if (!session || session.user?.email !== AdminEmail) await signIn("github");

  if (typeof filmName !== "string") return { error: "Invalid film name" };
  const prompt =
    `${filmName} filmi haqqında 60-70 sözdən ibarət Azərbaycan dilində description yaz.` +
    "Filmin adını tərcümə etmə. Heç bir markdown işlətmə sadəcə düz mətni yaz.";

  const { text } = await generateText({
    model: openrouter("deepseek/deepseek-chat-v3-0324:free"),
    prompt,
    system:
      "Sən sadəcə düz mətn yazmalısan. Heç bir markdown, stil, HTML və ya formatlaşdırma istifadə etmə. " +
      "Cavabın sadəcə Azərbaycan dilində, 60-70 söz arası qədər olmalıdır. " +
      "Description film haqqında kiçik məlumat və ana sujetdən bəhs etməlidir. əsas detallar və filmin hekayəsi" +
      'Filmin adını tərcümə etmə. Film adını dırnaq içinə al (misal üçün "Movie Name").' +
      "Bu Description bir film websaytında film haqqında kiçik məlumat vermək üçün istifadə olunacaq.",
  });

  return { text: text.trim() || "No description generated. Try again" };
}
