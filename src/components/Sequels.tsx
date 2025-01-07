import { Motion } from "./Motion";
import { Link } from "@/i18n/routing";
import SanityImage from "./SanityImage";
import { getSequel } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function Sequels({
  movieID,
  currentSlug,
}: {
  currentSlug: string | null;
  movieID: string;
}) {
  const sequel = await getSequel(movieID);
  const t = await getTranslations("Movie.Sequels");
  if (!sequel) return null;
  return (
    <section className="mx-3 mb-8 flex min-h-56 flex-col rounded-10 shadow-medium sm:mx-auto sm:w-[836px]">
      <p className="rounded-t-10 bg-gray-200 p-3 pl-7 text-lg font-bold text-white">
        {sequel.name + " " + t("name")}
      </p>
      <div className="custom-scroolbar mx-5 my-2 flex flex-1 flex-row gap-x-2 overflow-x-scroll">
        {sequel.movies.map((movie, index) => (
          <Motion
            key={index}
            className="mx-3 my-5"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 110 }}
          >
            <Link
              href={`${movie.slug}`}
              className={`${movie.slug === currentSlug && "border-3 border-solid border-blue-600"} justify-content-center relative inline-block min-h-[240px] w-[160px] select-none items-center justify-center rounded-xl text-center`}
            >
              <div>
                <div className="relative">
                  <SanityImage
                    src={movie.poster as string}
                    alt={movie.filmName + " movie poster"}
                    width={160}
                    height={240}
                    placeholder="blur"
                    blurDataURL={movie.posterlqip as string}
                    className="h-[240px] rounded-10"
                  />
                </div>
              </div>
            </Link>
          </Motion>
        ))}
      </div>
    </section>
  );
}
