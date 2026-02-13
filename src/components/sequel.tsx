"use client";

import SanityImage from "@/components/sanity-image";
import { Link } from "@/i18n/navigation";
import { SequelQueryResult } from "@/sanity/types";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function Sequel({
  currentSlug,
  sequel,
}: {
  currentSlug: string | null;
  sequel: SequelQueryResult;
}) {
  const t = useTranslations("Movie.Sequels");
  if (!sequel) return null;

  return (
    <section className="shadow-medium mx-3 mb-8 flex min-h-56 flex-col rounded-xl sm:mx-auto sm:w-209">
      <p className="rounded-t-10 bg-gray-900 p-3 pl-7 text-lg font-bold text-white">
        {sequel.name + " " + t("name")}
      </p>
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
              className={`${movie.slug === currentSlug && "border-3 border-solid border-blue-600"} justify-content-center relative inline-block min-h-60 w-40 items-center justify-center rounded-xl text-center select-none`}
              href={`${movie.slug}`}
              prefetch={false}
            >
              <div>
                <div className="relative">
                  <SanityImage
                    src={movie.poster!}
                    width={625}
                    height={910}
                    quality={90}
                    alt={movie.filmName + " movie poster"}
                    placeholder="blur"
                    blurDataURL={movie.posterlqip!}
                    className="h-60 rounded-xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 264px"
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
