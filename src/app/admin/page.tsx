import { UpdateButton, DeleteButton, RefreshButton } from "@/components/admin-buttons";
import AdminSignIn from "@/components/admin-signin";
import AvatarMenu from "@/components/avatar-menu";
import { getAllMovieRequests } from "@/data-access/prisma/requests/get";
import { Link } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { AdminEmail } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console",
  robots: { follow: false, index: false },
};

const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export default async function AdminPage() {
  const session = await auth();
  if (!session) return <AdminSignIn />;

  const { requests, error } = await getAllMovieRequests();

  if (error || session.user?.email !== AdminEmail)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>{error}</p>
      </div>
    );

  return (
    <>
      <div className="mt-12 mb-3 flex w-full flex-row items-center justify-center">
        <h1 className="text-3xl font-bold">Movie Requests</h1>
        <div className="absolute right-16">
          <AvatarMenu
            image={session.user.image || "/account_image_placeholder.jpg"}
            email={session.user.email}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-4 py-12">
        <div className="flex w-260 flex-row items-center justify-end">
          <RefreshButton />
        </div>
        {requests?.map((request) => (
          <div
            key={request.id}
            className={`shadow-medium flex w-260 flex-row gap-x-10 rounded-xl p-4 py-5 ${request.isAdded && "text-gray-300"}`}
          >
            <div className="line-clamp-1 flex w-56 flex-row gap-x-2 text-nowrap">
              <p className="font-bold">Requester:</p>
              <p className="flex truncate">{capitalize(request.fullName)}</p>
            </div>
            <div className="line-clamp-1 flex w-[20rem] flex-row gap-x-2 text-nowrap">
              <p className="font-bold">Email:</p>
              <Link
                className={`truncate text-blue-600 ${request.isAdded && "text-gray-300"}`}
                target="_blank"
                href={encodeURI(
                  `mailto:${request.email.toLowerCase()}?subject=${capitalize(request.movieName)} filmi FilmIsBest-ə əlavə edildi!&body=Salam Hörmətli ${request.fullName !== "" ? capitalize(request.fullName) : "FilmIsBest istifadəçisi"},\n\n${String(request.createdAt).slice(0, 10)} tarixində ${capitalize(request.movieName)} filmi üçün göndərdiyiniz sorğu emal olunaraq, FilmIsBest-ə əlavə olunmuşdur. Saytımız sizin soğrulanırızı daima dəyərləndirir. Keyifli izləmələr!\n\nHörmətlə,\nFilmIsBest CEO-su`,
                )}
              >
                {request.email.toLowerCase()}
              </Link>
            </div>
            <div className="line-clamp-1 flex w-68 flex-row gap-x-2 text-nowrap">
              <p className="font-bold">Movie Name:</p>
              <p className="truncate" title={capitalize(request.movieName)}>
                {capitalize(request.movieName)}
              </p>
            </div>
            <div className="flex w-20 flex-row items-center gap-x-3">
              <UpdateButton added={!request.isAdded} id={request.id} />
              <DeleteButton id={request.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
