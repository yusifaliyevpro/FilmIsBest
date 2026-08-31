import type { Metadata } from "next";
import { Suspense } from "react";
import AdminSignIn from "@/components/admin-signin";
import { DeleteButton } from "@/components/delete-button";
import { PasskeyManager } from "@/components/passkey-manager";
import { PasskeyToggleButton } from "@/components/passkey-toggle-button";
import { RefreshButton } from "@/components/refresh-button";
import { SignOutButton } from "@/components/sign-out-button";
import { UpdateButton } from "@/components/update-button";
import { getAllMovieSuggestions } from "@/data/prisma/suggestions/get";
import { getAdminSession } from "@/lib/admin-auth";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Admin Console",
  robots: { follow: false, index: false },
};

const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export default function AdminPage() {
  return (
    <Suspense>
      <AdminPageContent />
    </Suspense>
  );
}

export async function AdminPageContent() {
  const [session, result] = await Promise.all([getAdminSession(), getAllMovieSuggestions()]);
  if (!session?.isAdmin) return <AdminSignIn />;

  if (!result.ok)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-lg font-semibold text-red-400">Failed to load suggestions</p>
        <p className="text-sm text-gray-400">{result.error}</p>
      </div>
    );

  const suggestions = result.data ?? [];

  return (
    <div className="w-full max-w-6xl px-4 pb-20 sm:px-6">
      <header className="sticky top-0 z-10 -mx-4 mb-8 bg-[#111113]/80 px-4 py-5 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Movie Suggestions</h1>
            <p className="text-sm text-default-500">
              Signed in as <span className="font-medium text-default-300">{session.user.email}</span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <RefreshButton />
            <PasskeyToggleButton />
            <SignOutButton />
          </div>
        </div>
      </header>

      {suggestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 py-20 text-center">
          <p className="text-lg font-semibold text-default-300">No suggestions yet</p>
          <p className="text-sm text-default-500">New movie suggestions will appear here.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className={cn(
                "group flex flex-col gap-4 rounded-2xl border p-5 transition-colors sm:flex-row sm:items-center",
                suggestion.isAdded
                  ? "border-zinc-800 bg-zinc-900/50"
                  : "border-zinc-700 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800/60",
              )}
            >
              <div className="flex shrink-0 items-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                    suggestion.isAdded ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400",
                  )}
                >
                  <span
                    className={cn("size-1.5 rounded-full", suggestion.isAdded ? "bg-emerald-400" : "bg-amber-400")}
                  />
                  {suggestion.isAdded ? "Added" : "Pending"}
                </span>
              </div>

              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <p className="text-xs font-medium tracking-wide text-default-500 uppercase">Requester</p>
                  <p className="truncate font-medium text-default-100" title={capitalize(suggestion.fullName)}>
                    {suggestion.fullName !== "" ? capitalize(suggestion.fullName) : "—"}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <p className="text-xs font-medium tracking-wide text-default-500 uppercase">Movie</p>
                  <p className="truncate font-medium text-default-100" title={capitalize(suggestion.movieName)}>
                    {capitalize(suggestion.movieName)}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <p className="text-xs font-medium tracking-wide text-default-500 uppercase">Email</p>
                  <a
                    className="truncate font-medium text-sky-400 transition-colors hover:text-sky-300"
                    target="_blank"
                    title={suggestion.email.toLowerCase()}
                    href={encodeURI(
                      `mailto:${suggestion.email.toLowerCase()}?subject=${capitalize(suggestion.movieName)} filmi FilmIsBest-ə əlavə edildi!&body=Salam Hörmətli ${suggestion.fullName !== "" ? capitalize(suggestion.fullName) : "FilmIsBest istifadəçisi"},\n\n${String(suggestion.createdAt).slice(0, 10)} tarixində ${capitalize(suggestion.movieName)} filmi üçün göndərdiyiniz sorğu emal olunaraq, FilmIsBest-ə əlavə olunmuşdur. Saytımız sizin soğrulanırızı daima dəyərləndirir. Keyifli izləmələr!\n\nHörmətlə,\nFilmIsBest CEO-su`,
                    )}
                  >
                    {suggestion.email.toLowerCase()}
                  </a>
                </div>
              </div>

              <div className="flex shrink-0 flex-row items-center gap-2 border-t border-zinc-800 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                <UpdateButton added={!suggestion.isAdded} id={suggestion.id} />
                <DeleteButton id={suggestion.id} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <PasskeyManager />
    </div>
  );
}
