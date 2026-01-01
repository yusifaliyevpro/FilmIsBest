"use client";

import { BASE_URL } from "../lib/constants";
import { Locale } from "@/i18n/routing";
import { MovieQueryResult } from "@/sanity/types";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal";
import { Snippet } from "@heroui/snippet";
import { addToast, closeAll } from "@heroui/toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";
import {
  BiDotsVerticalRounded,
  BiImageAlt,
  BiLogoTelegram,
  BiLogoWhatsapp,
  BiSolidShareAlt,
} from "react-icons/bi";
import { BsCardText } from "react-icons/bs";

export default function Share({ movie, locale }: { movie: MovieQueryResult; locale: Locale }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [canShareFiles, setCanShareFiles] = useState(false);
  const [canShareText, setCanShareText] = useState(false);

  const onCanShareFiles = useEffectEvent(() => {
    if (typeof navigator !== "undefined" && navigator.canShare) {
      setCanShareFiles(navigator.canShare({ files: [new File([], "test.png", { type: "image/png" })] }));
      setCanShareText(navigator.canShare({ text: "Test" }));
    }
  });

  useEffect(() => {
    onCanShareFiles();
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Movie");
  if (!movie) return null;
  const translatedGenres = movie.genre.map(
    (genre) => t(`Genres.${genre.toLowerCase()}` as "Genres.action") || genre,
  );

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
    const shareData = {
      title: `FilmIsBest | ${movie?.filmName}`,
      files: [] as File[],
    };
    try {
      const response = await fetch(movie!.poster as string);

      if (!response.ok) {
        addToast({ title: t("Share.anErrorOccurred"), color: "danger" });
        return;
      }

      const blob = await response.blob();
      const filesArray = [
        new File([blob], `poster.jpg`, {
          type: "image/jpeg",
          lastModified: new Date().getTime(),
        }),
      ];
      shareData.files = filesArray;
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
    <div className="relative mx-3 my-6 flex w-auto flex-row justify-end sm:w-209">
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
        classNames={{ base: "bg-gray-900" }}
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
            <div className="scrollbar-hide relative mb-10 flex flex-1 flex-row items-center gap-4 overflow-x-scroll">
              <div
                className="hover:shadow-medium relative flex w-fit cursor-pointer flex-col items-center rounded-xl p-2"
                onClick={() => handleShare("whatsapp")}
              >
                <BiLogoWhatsapp className="text-7xl text-blue-600" />
                <p className="font-bold">WhatsApp</p>
              </div>
              <div
                className="hover:shadow-medium relative flex w-fit cursor-pointer flex-col items-center p-2"
                onClick={() => handleShare("telegram")}
              >
                <BiLogoTelegram className="text-7xl text-blue-600" />
                <p className="font-bold">Telegram</p>
              </div>
              <div
                className="hover:shadow-medium relative flex w-fit cursor-pointer flex-col items-center rounded-xl p-2"
                onClick={() => handleShare("copy")}
              >
                <BsCardText className="text-7xl text-blue-600" />
                <p className="font-bold text-nowrap">Copy Text</p>
              </div>
              {canShareFiles && (
                <div
                  className="hover:shadow-medium relative flex w-fit cursor-pointer flex-col items-center rounded-xl p-2"
                  onClick={handlePoster}
                >
                  <BiImageAlt className="text-7xl text-nowrap text-blue-600" />
                  <p className="font-bold">Poster</p>
                </div>
              )}
              {canShareText ? (
                <div
                  className="hover:shadow-medium relative flex w-fit cursor-pointer flex-col items-center rounded-xl p-2"
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
