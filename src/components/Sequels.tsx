import SanityImage from "./SanityImage";
import { Link } from "@/i18n/routing";
import { getSequel } from "@/lib/utils";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";

export default async function Sequels({ movieID, currentSlug }: { currentSlug: string | null; movieID: string }) {
  const sequel = await getSequel(movieID);
  const t = await getTranslations("Movie.Sequels");
  if (!sequel) return null;
  return (
    <section className="mx-3 mb-8 flex min-h-56 flex-col rounded-10 shadow-medium sm:mx-auto sm:w-[836px]">
      <p className="rounded-t-10 bg-gray-200 p-3 pl-7 text-lg font-bold text-white">{sequel.name + " " + t("name")}</p>
      <ol className="custom-scroolbar mx-5 my-2 flex flex-1 flex-row gap-x-2 overflow-x-scroll">
        {sequel.movies.map((movie, index) => (
          <motion.li
            key={index}
            className="mx-3 my-5"
            initial={{ scale: 1 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 110 }}
            whileHover={{ scale: 1.08 }}
          >
            <Link
              className={`${movie.slug === currentSlug && "border-3 border-solid border-blue-600"} justify-content-center relative inline-block min-h-[240px] w-[160px] select-none items-center justify-center rounded-xl text-center`}
              href={`${movie.slug}`}
            >
              <div>
                <div className="relative">
                  <SanityImage
                    alt={movie.filmName + " movie poster"}
                    blurDataURL={movie.posterlqip as string}
                    className="h-[240px] rounded-10"
                    height={240}
                    placeholder="blur"
                    src={movie.poster as string}
                    width={160}
                  />
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
