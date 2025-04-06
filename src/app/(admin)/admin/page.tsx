import { DeleteButton } from "@/components/DeleteButton";
import RefreshButton from "@/components/RefreshButton";
import { UpdateButton } from "@/components/UpdateButton";
import { Link } from "@/i18n/routing";
import { isInDevelopment } from "@/lib/constants";
import { getAllMovieRequests } from "@/lib/utils";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { isEnabled } = await draftMode();
  const title = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  if (!isEnabled && !isInDevelopment) redirect("/admin?__vercel_draft=1");
  const requests = await getAllMovieRequests();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start bg-white">
      <h1 className="mt-12 text-3xl font-bold">All Movie Requests</h1>
      <div className="flex flex-col gap-y-4 py-12">
        <div className="flex w-[65rem] flex-row items-center justify-end">
          <RefreshButton />
        </div>
        {requests?.map((request) => (
          <div
            key={request.id}
            className={`flex w-[65rem] flex-row gap-x-10 rounded-xl p-4 py-5 shadow-medium ${request.added && "text-gray-300"}`}
          >
            <div className="line-clamp-1 flex w-[14rem] flex-row gap-x-2 text-nowrap">
              <p className="font-bold">Requester:</p>
              <p className="flex truncate">{title(request.fullName)}</p>
            </div>
            <div className="line-clamp-1 flex w-[20rem] flex-row gap-x-2 text-nowrap">
              <p className="font-bold">Email:</p>
              <Link
                className={`truncate text-blue-600 ${request.added && "text-gray-300"}`}
                href={encodeURI(
                  `mailto:${request.email.toLowerCase()}?subject=${title(request.movieName)} filmi FilmIsBest-ə əlavə edildi!&body=Salam Hörmətli ${request.fullName !== "" ? title(request.fullName) : "FilmIsBest istifadəçisi"},\n\n${String(request.createdAt).slice(0, 10)} tarixində ${title(request.movieName)} filmi üçün göndərdiyiniz sorğu emal olunaraq, FilmIsBest-ə əlavə olunmuşdur. Saytımız sizin soğrulanırızı daima dəyərləndirir. Keyifli izləmələr!\n\nHörmətlə,\nFilmIsBest CEO-su`,
                )}
                target="_blank"
              >
                {request.email.toLowerCase()}
              </Link>
            </div>
            <div className="line-clamp-1 flex w-[17rem] flex-row gap-x-2 text-nowrap">
              <p className="font-bold">Movie Name:</p>
              <p className="truncate" title={title(request.movieName)}>
                {title(request.movieName)}
              </p>
            </div>
            <div className="flex w-[5rem] flex-row items-center gap-x-3">
              <UpdateButton added={!request.added} id={request.id} />
              <DeleteButton id={request.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
