import { createI18nMiddleware } from "next-international/middleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "az", "tr"],
  defaultLocale: "en",
  urlMappingStrategy: "redirect",
});

export function middleware(request) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|studio|robots.txt|admin).*)",
  ],
};
