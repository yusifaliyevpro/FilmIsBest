"use client";

import { BASE_URL } from "../lib/constants";
import { Locales } from "@/i18n/routing";
import type { MOVIE_QUERYResult } from "@/sanity/types";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal";
import { Snippet } from "@heroui/snippet";
import { addToast, closeAll } from "@heroui/toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { BiDotsVerticalRounded, BiImageAlt, BiLogoTelegram, BiLogoWhatsapp, BiSolidShareAlt } from "react-icons/bi";
import { BsCardText } from "react-icons/bs";

export default function Share({ movie, locale }: { movie: MOVIE_QUERYResult; locale: Locales }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [canShareFiles, setCanShareFiles] = useState(false);
  const [canShareText, setCanShareText] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.canShare) {
      setCanShareFiles(navigator.canShare({ files: [new File([], "test.png", { type: "image/png" })] }));
      setCanShareText(navigator.canShare({ text: "Test" }));
    }
  }, []);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Movie");
  if (!movie) return null;
  const translatedGenres = movie.genre.map((genre) => t(`Genres.${genre.toLowerCase()}` as "Genres.action") || genre);

  const whatsappBody =
    `🍿 *${t("movieName")}* ` +
    movie.filmName +
    `\n\n⭐ *${t("stars")}* ` +
    movie.actors.trim().replace(/!/g, "•") +
    `\n\n🎭 *${t("category")}* ` +
    translatedGenres?.join(", ") +
    `\n\n🎬 *${t("director")}* ` +
    movie.directed?.trim().replace(/!/g, "•") +
    `\n\n🥇 *${t("imdbScore")}* ` +
    movie.imdbpuan +
    `\n\n *${t("Share.ctaText")}* ⬇️` +
    "\n\n" +
    `${BASE_URL}` +
    pathname;

  const telegramBody =
    `🍿 **${t("movieName")}** ` +
    movie.filmName +
    `\n\n⭐ **${t("stars")}** ` +
    movie.actors?.trim().replace(/!/g, "•") +
    `\n\n🎭 **${t("category")}** ` +
    translatedGenres?.join(", ") +
    `\n\n🎬 **${t("director")}** ` +
    movie.directed?.trim().replace(/!/g, "•") +
    `\n\n🥇 **${t("imdbScore")}** ` +
    movie.imdbpuan +
    `\n\n **${t("Share.ctaText")}** ⬇️` +
    "\n\n" +
    `${BASE_URL}` +
    pathname;

  const copyBody =
    `🍿 ${t("movieName")} ` +
    movie.filmName +
    `\n\n⭐ ${t("stars")} ` +
    movie.actors?.trim().replace(/!/g, "•") +
    `\n\n🎭 ${t("category")} ` +
    translatedGenres?.join(", ") +
    `\n\n🎬 ${t("director")} ` +
    movie.directed?.trim().replace(/!/g, "•") +
    `\n\n🥇 ${t("imdbScore")} ` +
    movie.imdbpuan +
    `\n\n ${t("Share.ctaText")} ⬇️` +
    "\n\n" +
    `${BASE_URL}` +
    pathname;

  const handleShare = (platform: string) => {
    if (platform === "whatsapp") {
      router.push(`whatsapp://send?text=${encodeURIComponent(whatsappBody)}`);
    } else if (platform === "telegram") {
      router.push(`tg://msg?text=${encodeURIComponent(telegramBody)}`);
    } else if (platform === "copy") {
      navigator.clipboard.writeText(copyBody);
      closeAll();
      addToast({ title: t("Share.copied"), color: "success" });
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    } else if (platform === "other") {
      const shareData = {
        title: `FilmIsBest | ${movie.filmName}`,
        text: copyBody,
      };
      closeAll();
      addToast({ title: t("Share.inProgress"), timeout: 1000 });
      navigator.share(shareData);
    }
  };

  async function handlePoster() {
    try {
      const response = await fetch(movie?.poster as string);

      if (!response.ok) {
        throw new Error("Şəkil yüklənə bilmədi.");
      }

      const blob = await response.blob();
      const filesArray = [
        new File([blob], `poster.jpg`, {
          type: "image/jpeg",
          lastModified: new Date().getTime(),
        }),
      ];
      const shareData = {
        title: `FilmIsBest | ${movie?.filmName}`,
        files: filesArray,
      };
      closeAll();
      addToast({ title: t("Share.imageBeingPrepared") });
      return navigator
        .share(shareData)
        .then(() => {
          closeAll();
          addToast({ title: t("Share.pictureIsReady"), color: "success" });
        })
        .catch(() => {
          throw new Error(t("Share.anErrorOccurred"));
        });
    } catch (error: unknown) {
      addToast({ title: error instanceof Error ? error.message : (error as string), color: "danger" });
    }
  }

  return (
    <div className="relative mx-3 my-6 flex w-auto flex-row justify-end sm:w-200">
      <Button
        className="relative flex flex-row items-center justify-center gap-1 text-xl font-bold"
        color="primary"
        size="lg"
        onPress={onOpen}
      >
        <BiSolidShareAlt className="mt-1 text-3xl" />
        <p>{t("Share.share")}</p>
      </Button>
      <Modal
        className="light:text-white dark:text-white"
        classNames={{ base: "bg-gray-200" }}
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex w-full flex-row items-center justify-center gap-3 font-bold">
            <BiSolidShareAlt className="mt-1 text-4xl" />
            <h6 className="text-3xl font-bold">{t("Share.share")}</h6>
          </ModalHeader>
          <ModalBody className="p-8">
            <div className="no-scrollbar relative mb-10 flex flex-1 flex-row items-center gap-4 overflow-x-scroll">
              <div
                className="relative flex w-fit cursor-pointer flex-col items-center rounded-10 p-2 hover:shadow-medium"
                onClick={() => handleShare("whatsapp")}
              >
                <BiLogoWhatsapp className="text-7xl text-blue-600" />
                <p className="font-bold">WhatsApp</p>
              </div>
              {isMobileOnly && (
                <div
                  className="relative flex w-fit cursor-pointer flex-col items-center p-2 hover:shadow-medium"
                  onClick={() => handleShare("telegram")}
                >
                  <BiLogoTelegram className="text-7xl text-blue-600" />
                  <p className="font-bold">Telegram</p>
                </div>
              )}
              <div
                className="relative flex w-fit cursor-pointer flex-col items-center rounded-10 p-2 hover:shadow-medium"
                onClick={() => handleShare("copy")}
              >
                <BsCardText className="text-7xl text-blue-600" />
                <p className="text-nowrap font-bold">Copy Text</p>
              </div>
              {canShareFiles && (
                <div
                  className="relative flex w-fit cursor-pointer flex-col items-center rounded-10 p-2 hover:shadow-medium"
                  onClick={handlePoster}
                >
                  <BiImageAlt className="text-nowrap text-7xl text-blue-600" />
                  <p className="font-bold">Poster</p>
                </div>
              )}
              {canShareText ? (
                <div
                  className="relative flex w-fit cursor-pointer flex-col items-center rounded-10 p-2 hover:shadow-medium"
                  onClick={() => handleShare("other")}
                >
                  <BiDotsVerticalRounded className="text-7xl text-blue-600" />
                  <p className="font-bold">{t("Share.other")}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mx-auto">
              <Snippet codeString={`${BASE_URL}/${locale}/movies/${movie.slug}`} symbol="" variant="bordered">
                <div className="line-clamp-1 w-48 flex-row truncate text-wrap lg:w-auto">
                  {`${BASE_URL}/${locale}/movies/${movie.slug}`}
                </div>
              </Snippet>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
