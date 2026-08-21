"use client";

import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BiCheck,
  BiCopy,
  BiDotsVerticalRounded,
  BiImageAlt,
  BiLogoTelegram,
  BiLogoWhatsapp,
  BiSolidShareAlt,
} from "react-icons/bi";
import { BsCardText } from "react-icons/bs";
import { toast } from "sonner";
import type { Locale } from "@/i18n/routing";
import type { MovieQueryResult } from "@/sanity/types";
import { BASE_URL } from "../lib/constants";

export default function Share({ movie, locale }: { movie: MovieQueryResult; locale: Locale }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [canShareFiles] = useState(() =>
    navigator && navigator.canShare
      ? navigator.canShare({ files: [new File([], "test.png", { type: "image/png" })] })
      : false,
  );
  const [canShareText] = useState(() =>
    navigator && navigator.canShare ? navigator.canShare({ text: "Test" }) : false,
  );
  const [copied, setCopied] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Movie");
  if (!movie) return null;

  const buildShareBody = (platform: "whatsapp" | "telegram" | "copy") => {
    const translatedGenres = movie.genre.map((genre) => t(`Genres.${genre.toLowerCase()}`) || genre);

    const bold = platform === "telegram" ? "**" : platform === "whatsapp" ? "*" : "";

    return (
      `🍿 ${bold}${t("movieName")}${bold} ` +
      movie.filmName +
      `\n\n⭐ ${bold}${t("stars")}${bold} ` +
      movie.actors?.join(" • ") +
      `\n\n🎭 ${bold}${t("category")}${bold} ` +
      translatedGenres?.join(", ") +
      `\n\n🎬 ${bold}${t("director")}${bold} ` +
      movie.directed?.join(" • ") +
      `\n\n🥇 ${bold}${t("imdbScore")}${bold} ` +
      movie.imdbpuan +
      `\n\n ${bold}${t("Share.ctaText")}${bold} ⬇️` +
      "\n\n" +
      BASE_URL +
      pathname
    );
  };

  const handleShare = async (platform: string) => {
    if (platform === "whatsapp") {
      router.push(`whatsapp://send?text=${encodeURIComponent(buildShareBody("whatsapp"))}`);
    } else if (platform === "telegram") {
      router.push(`tg://msg?text=${encodeURIComponent(buildShareBody("telegram"))}`);
    } else if (platform === "copy") {
      await navigator.clipboard.writeText(buildShareBody("copy"));
      toast.dismiss();
      toast.success(t("Share.copied"));
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    } else if (platform === "other") {
      const shareData = {
        title: `FilmIsBest | ${movie.filmName}`,
        text: buildShareBody("copy"),
      };
      toast.dismiss();
      toast(t("Share.inProgress"), { duration: 1000 });
      await navigator.share(shareData);
    }
  };

  async function handlePoster() {
    const shareData = {
      title: `FilmIsBest | ${movie?.filmName}`,
      files: [] as File[],
    };
    try {
      const response = await fetch(movie!.poster);

      if (!response.ok) {
        toast.error(t("Share.anErrorOccurred"));
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
      toast.dismiss();
      toast(t("Share.imageBeingPrepared"));
      return navigator
        .share(shareData)
        .then(() => {
          toast.dismiss();
          toast.success(t("Share.pictureIsReady"));
        })
        .catch(() => {
          throw new Error(t("Share.anErrorOccurred"));
        });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }

  const shareUrl = `${BASE_URL}/${locale}/movies/${movie.slug}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative flex">
      <Button
        className="relative flex flex-row items-center justify-center gap-1 text-base font-bold"
        color="primary"
        size="md"
        onPress={onOpen}
      >
        <BiSolidShareAlt className="mt-0.5 text-2xl" />
        <p>{t("Share.share")}</p>
      </Button>
      <Modal
        className="dark:text-white light:text-white"
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
            <div className="relative mb-10 scrollbar-hide flex flex-1 flex-row items-center gap-4 overflow-x-scroll">
              <button
                type="button"
                className="relative flex w-fit cursor-pointer flex-col items-center rounded-xl p-2 hover:shadow-medium"
                onClick={() => handleShare("whatsapp")}
              >
                <BiLogoWhatsapp className="text-7xl text-blue-600" />
                <p className="font-bold">WhatsApp</p>
              </button>
              <button
                type="button"
                className="relative flex w-fit cursor-pointer flex-col items-center p-2 hover:shadow-medium"
                onClick={() => handleShare("telegram")}
              >
                <BiLogoTelegram className="text-7xl text-blue-600" />
                <p className="font-bold">Telegram</p>
              </button>
              <button
                type="button"
                className="relative flex w-fit cursor-pointer flex-col items-center rounded-xl p-2 hover:shadow-medium"
                onClick={() => handleShare("copy")}
              >
                <BsCardText className="text-7xl text-blue-600" />
                <p className="font-bold text-nowrap">Copy Text</p>
              </button>
              {canShareFiles && (
                <button
                  type="button"
                  className="relative flex w-fit cursor-pointer flex-col items-center rounded-xl p-2 hover:shadow-medium"
                  onClick={handlePoster}
                >
                  <BiImageAlt className="text-7xl text-nowrap text-blue-600" />
                  <p className="font-bold">Poster</p>
                </button>
              )}
              {canShareText ? (
                <button
                  type="button"
                  className="relative flex w-fit cursor-pointer flex-col items-center rounded-xl p-2 hover:shadow-medium"
                  onClick={() => handleShare("other")}
                >
                  <BiDotsVerticalRounded className="text-7xl text-blue-600" />
                  <p className="font-bold">{t("Share.other")}</p>
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="mx-auto flex w-full max-w-sm items-center gap-2 rounded-xl border border-gray-700 bg-gray-800/40 py-2 pr-2 pl-3.5">
              <span className="line-clamp-1 flex-1 truncate text-sm text-gray-300">{shareUrl}</span>
              <button
                type="button"
                aria-label="Copy link"
                onClick={copyLink}
                className="shrink-0 cursor-pointer rounded-lg p-1.5 text-blue-500 transition-colors hover:bg-gray-700 hover:text-blue-400"
              >
                {copied ? <BiCheck className="text-xl" /> : <BiCopy className="text-xl" />}
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
