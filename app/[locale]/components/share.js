"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  BiDotsVerticalRounded,
  BiImageAlt,
  BiLink,
  BiLogoTelegram,
  BiLogoWhatsapp,
  BiSolidShareAlt,
} from "react-icons/bi";
import { Snippet } from "@nextui-org/snippet";
import { baseURL } from "../lib/bases";
import { useTranslations } from "next-intl";

export default function Share({ movie, locale }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Movie");
  const translatedGenres = movie.genre.map(
    (genre) => t(`Genres.${genre.toLowerCase()}`) || genre,
  );

  const whatsappBody =
    `🍿 *${t("movieName")}* ` +
    movie.filmName +
    `\n\n⭐ *${t("stars")}* ` +
    movie.actors.trim().replace(/!/g, "•") +
    `\n\n🎭 *${t("category")}* ` +
    translatedGenres.join(", ") +
    `\n\n🎬 *${t("director")}* ` +
    movie.directed.trim().replace(/!/g, "•") +
    `\n\n🥇 *${t("imdbScore")}* ` +
    movie.imdbpuan +
    `\n\n *${t("Share.ctaText")}* ⬇️` +
    "\n\n" +
    `${baseURL}` +
    pathname;

  const telegramBody =
    `🍿 **${t("movieName")}** ` +
    movie.filmName +
    `\n\n⭐ **${t("stars")}** ` +
    movie.actors.trim().replace(/!/g, "•") +
    `\n\n🎭 **${t("category")}** ` +
    translatedGenres.join(", ") +
    `\n\n🎬 **${t("director")}** ` +
    movie.directed.trim().replace(/!/g, "•") +
    `\n\n🥇 **${t("imdbScore")}** ` +
    movie.imdbpuan +
    `\n\n **${t("Share.ctaText")}** ⬇️` +
    "\n\n" +
    `${baseURL}` +
    pathname;

  const copyBody =
    `🍿 ${t("movieName")} ` +
    movie.filmName +
    `\n\n⭐ ${t("stars")} ` +
    movie.actors.trim().replace(/!/g, "•") +
    `\n\n🎭 ${t("category")} ` +
    translatedGenres.join(", ") +
    `\n\n🎬 ${t("director")} ` +
    movie.directed.trim().replace(/!/g, "•") +
    `\n\n🥇 ${t("imdbScore")} ` +
    movie.imdbpuan +
    `\n\n ${t("Share.ctaText")} ⬇️` +
    "\n\n" +
    `${baseURL}` +
    pathname;

  const handleShare = (platform) => {
    if (platform === "whatsapp") {
      router.push(`whatsapp://send?text=${encodeURIComponent(whatsappBody)}`);
    } else if (platform === "telegram") {
      router.push(`tg://msg?text=${encodeURIComponent(telegramBody)}`);
    } else if (platform === "copy") {
      navigator.clipboard.writeText(copyBody);
      toast.success(t("Share.copied"));
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    } else if (platform === "other") {
      const shareData = {
        title: `FilmIsBest | ${movie.filmName}`,
        text: copyBody,
      };
      toast.loading(t("Share.inProgress"), {
        duration: 1000,
      });
      navigator.share(shareData);
    }
  };

  async function handlePoster() {
    try {
      const posterURL = `https://filmisbest.com/_next/image?url=${encodeURI(movie.poster)}&w=640&q=75`;
      const response = await fetch(posterURL);

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
        title: `FilmIsBest | ${movie.filmName}`,
        files: filesArray,
      };
      toast.promise(Promise.resolve(), {
        // Change to Promise.resolve()
        loading: t("Share.imageBeingPrepared"),
        success: t("Share.pictureIsReady"),
        error: t("Share.anErrorOccurred"),
      });
      navigator.share(shareData);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Button
        size="lg"
        color="primary"
        className="relative flex flex-row items-center justify-center gap-1 text-xl font-bold"
        onPress={onOpen}
      >
        <BiSolidShareAlt className="mt-1 text-2xl" />
        <p>{t("Share.share")}</p>
      </Button>
      <Modal
        isOpen={isOpen}
        placement="center"
        className="light:text-white dark:text-white"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex w-full flex-row items-center justify-center gap-3 font-bold">
                <BiSolidShareAlt className="mt-1 text-4xl" />
                <h6 className="text-3xl font-bold">{t("Share.share")}</h6>
              </ModalHeader>
              <ModalBody className="p-8">
                <div className="no-scrollbar relative  mb-10 flex flex-1 flex-row items-center gap-4 overflow-x-scroll">
                  <div
                    className="relative flex w-fit cursor-pointer flex-col items-center rounded-10 p-2 hover:shadow-medium"
                    onClick={() => handleShare("whatsapp")}
                  >
                    <BiLogoWhatsapp className=" text-7xl text-blue-600" />
                    <p className="font-bold">WhatsApp</p>
                  </div>
                  {window.innerWidth < window.innerHeight ? (
                    <div
                      className="relative flex w-fit cursor-pointer flex-col items-center p-2 hover:shadow-medium"
                      onClick={() => handleShare("telegram")}
                    >
                      <BiLogoTelegram className="text-7xl text-blue-600" />
                      <p className="font-bold">Telegram</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className="relative flex w-fit cursor-pointer flex-col items-center rounded-10 p-2 hover:shadow-medium"
                    onClick={() => handleShare("copy")}
                  >
                    <BiLink className="text-7xl text-blue-600" />
                    <p className="text-nowrap font-bold">Copy Text</p>
                  </div>
                  {navigator.canShare ? (
                    <div
                      className="relative flex w-fit cursor-pointer flex-col items-center rounded-10 p-2 hover:shadow-medium"
                      onClick={handlePoster}
                    >
                      <BiImageAlt className="text-nowrap text-7xl text-blue-600" />
                      <p className="font-bold">Poster</p>
                    </div>
                  ) : (
                    ""
                  )}
                  {navigator.share ? (
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
                <div className=" mx-auto ">
                  <Snippet
                    symbol=""
                    variant="bordered"
                    codeString={`${baseURL}/${locale}/movie/${movie.slug}`}
                  >
                    <div className="line-clamp-1 w-48 flex-row truncate text-wrap lg:w-auto">
                      {`${baseURL}/${locale}/movie/${movie.slug}`}
                    </div>
                  </Snippet>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
