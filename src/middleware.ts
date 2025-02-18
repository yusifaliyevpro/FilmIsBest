import { NextRequest } from "next/server";
import { locales, routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const shouldHandle = pathname === "/" || new RegExp(`^/(${locales.join("|")})/:path`).test(request.nextUrl.pathname);
  if (!shouldHandle) return;

  return handleI18nRouting(request);
}
