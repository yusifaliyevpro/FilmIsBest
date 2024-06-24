import { DeleteButton } from "@/app/components/DeleteButton";
import RefreshButton from "@/app/components/RefreshButton";
import { UpdateButton } from "@/app/components/UpdateButton";
import { getRequests } from "@/lib/utils";
import Link from "next/link";

export default async function AdminPage({ searchParams }) {
  const password =
    typeof searchParams.password === "string"
      ? searchParams.password
      : undefined;
  const requests = await getRequests({ password });
  function title(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  if (password !== process.env.ADMIN_PASSWORD)
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <p className="text-xl font-bold">You have no access to Admin Page</p>
      </div>
    );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start bg-white">
      <h1 className="mt-12 text-3xl font-bold">All Movie Requests</h1>
      <div className="flex flex-col gap-y-4 py-12">
        <div className="flex w-[65rem] flex-row items-center justify-end">
          <RefreshButton />
        </div>
        {requests &&
          requests.results.map((request) => (
            <div
              key={request._id}
              className={`flex w-[65rem] flex-row gap-x-10 rounded-xl p-4 py-5 shadow-medium ${request.added && "text-gray-300"}`}
            >
              <div className="line-clamp-1 flex w-[14rem] flex-row gap-x-2 text-nowrap">
                <p className="font-bold">Requester:</p>
                <p className="flex truncate">{title(request.fullName)}</p>
              </div>
              <div className="line-clamp-1 flex w-[20rem] flex-row gap-x-2 text-nowrap">
                <p className="font-bold">Email:</p>
                <Link
                  href={encodeURI(
                    `mailto:${request.email.toLowerCase()}?subject=${title(request.movieName)} filmi FilmIsBest-ə əlavə edildi!&body=Salam Hörmətli ${request.fullName !== "" ? title(request.fullName) : "FilmIsBest istifadəçisi"},\n\n${request.createdAt.slice(0, 10)} tarixində ${title(request.movieName)} filmi üçün göndərdiyiniz sorğu emal olunaraq, FilmIsBest-ə əlavə olunmuşdur. Saytımız sizin soğrulanırızı daima dəyərləndirir. Keyifli izləmələr!\n\nHörmətlə,\nFilmIsBest CEO-su`,
                  )}
                  target="_blank"
                  className={`truncate text-blue-600 ${request.added && "text-gray-300"}`}
                >
                  {request.email.toLowerCase()}
                </Link>
              </div>
              <div className="line-clamp-1 flex w-[17rem] flex-row gap-x-2 text-nowrap">
                <p className="font-bold">Movie Name:</p>
                <p title={title(request.movieName)} className="truncate">
                  {title(request.movieName)}
                </p>
              </div>
              <div className="flex w-[5rem] flex-row items-center gap-x-3">
                <UpdateButton id={request._id} added={!request.added} />
                <DeleteButton id={request._id} />
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
