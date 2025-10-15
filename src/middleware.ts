import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

export const config = {
  // Except /studio
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*|studio).*)",
};
