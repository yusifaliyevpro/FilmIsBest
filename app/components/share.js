"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import WhatsappIcon from "../../public/whatsapp.svg";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import React from "react";
import translationMap from "../lib/translationMap";

export default function Share({ movie }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();
  const translatedGenres = movie.genre.map(
    (genre) => translationMap[genre] || genre,
  );

  const whatsappBody =
    "🍿 *Filmin Adı:* " +
    movie.filmName +
    "\n\n⭐ *Ulduzlar:* " +
    movie.actors.trim().replace(/!/g, "•") +
    "\n\n🎭 *Kateqoriya:* " +
    translatedGenres.join(", ") +
    "\n\n🎬 *Rejissor:* " +
    movie.directed.trim().replace(/!/g, "•") +
    "\n\n🥇 *IMDb xalı:* " +
    movie.imdbpuan +
    "\n\n *Fraqmanı və ya filmi izləmək üçün linkə keçid edin* ⬇️" +
    "\n\n" +
    "https://filmisbest.com" +
    pathname;

  const telegramBody =
    "🍿 **Filmin Adı:** " +
    movie.filmName +
    "\n\n⭐ **Ulduzlar:** " +
    movie.actors.trim().replace(/!/g, "•") +
    "\n\n🎭 **Kateqoriya:** " +
    translatedGenres.join(", ") +
    "\n\n🎬 **Rejissor:** " +
    movie.directed.trim().replace(/!/g, "•") +
    "\n\n🥇 **IMDb xalı:** " +
    movie.imdbpuan +
    "\n\n **Fraqmanı və ya filmi izləmək üçün linkə keçid edin** ⬇️" +
    "\n\n" +
    "https://filmisbest.com" +
    pathname;

  const copyBody =
    "🍿 Filmin Adı: " +
    movie.filmName +
    "\n\n⭐ Ulduzlar: " +
    movie.actors.trim().replace(/!/g, "•") +
    "\n\n🎭 Kateqoriya: " +
    translatedGenres.join(", ") +
    "\n\n🎬 Rejissor: " +
    movie.directed.trim().replace(/!/g, "•") +
    "\n\n🥇 IMDb xalı: " +
    movie.imdbpuan +
    "\n\n Fraqmanı və ya filmi izləmək üçün linkə keçid edin ⬇️" +
    "\n\n" +
    "https://filmisbest.com" +
    pathname;

  const handleShare = (platform) => {
    if (platform === "whatsapp") {
      router.push(`whatsapp://send?text=${encodeURIComponent(whatsappBody)}`);
    } else if (platform === "telegram") {
      router.push(`tg://msg?text=${encodeURIComponent(telegramBody)}`);
    } else if (platform === "copy") {
      navigator.clipboard.writeText(copyBody);
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    } else {
      return;
    }
  };

  async function handleOther() {
    const response = await fetch(
      `https://filmisbest.com/_next/image?url=${movie.poster}`,
    );
    const blob = await response.blob();
    const filesArray = [
      new File([blob], "poster.jpg", {
        type: "image/png",
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      files: filesArray,
    };
    navigator.share(shareData).then(() => {
      console.log("Shared successfully");
    });
  }

  return (
    <div>
      <Button
        size="lg"
        color="primary"
        className="relative flex flex-row items-center justify-center gap-1 text-xl font-bold"
        onPress={onOpen}
      >
        <i className="bx bxs-share-alt mt-1 text-2xl"></i>
        <p>Paylaş</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex w-full flex-row items-center justify-center gap-3 font-bold">
                <i className="bx bxs-share-alt mt-1 text-4xl"></i>
                <h6 className="text-3xl font-bold">Paylaş</h6>
              </ModalHeader>
              <ModalBody className=" p-8">
                <div className="no-scrollbar relative mb-10 flex flex-row items-center gap-4 overflow-x-scroll">
                  <div
                    className="relative flex w-fit cursor-pointer flex-col items-center p-2"
                    onClick={() => handleShare("whatsapp")}
                  >
                    <i className="bx bxl-whatsapp text-7xl text-blue-600"></i>
                    <p className="font-bold">WhatsApp</p>
                  </div>
                  {window.innerWidth < window.innerHeight ? (
                    <div
                      className="relative flex w-fit cursor-pointer flex-col items-center p-2"
                      onClick={() => handleShare("telegram")}
                    >
                      <i className="bx bxl-telegram text-7xl text-blue-600"></i>
                      <p className="font-bold">Telegram</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className="relative flex w-fit cursor-pointer flex-col items-center p-2"
                    onClick={() => handleShare("copy")}
                  >
                    <i className="bx bx-link text-7xl text-blue-600"></i>
                    <p className="text-nowrap font-bold">Copy Text</p>
                  </div>
                  <div
                    className="relative flex w-fit cursor-pointer flex-col items-center p-2"
                    onClick={() => handleOther}
                  >
                    <i className="bx bx-dots-vertical-rounded text-7xl text-blue-600"></i>
                    <p className="font-bold">Digər</p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
