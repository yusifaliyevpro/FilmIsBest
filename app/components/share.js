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
import translationMap from "../lib/translationMap";
import { toast } from "react-hot-toast";
import { ClerkLoaded, ClerkLoading, useAuth } from "@clerk/nextjs";
import SuspenseButton from "./suspenseButton";
import {
  BiDotsVerticalRounded,
  BiImageAlt,
  BiLink,
  BiLogIn,
  BiLogoTelegram,
  BiLogoWhatsapp,
  BiSolidShareAlt,
} from "react-icons/bi";
import { baseURL } from "../lib/bases";

export default function Share({ movie }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const user = useAuth();
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
    `${baseURL}` +
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
    `${baseURL}` +
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
    `${baseURL}` +
    pathname;

  const handleShare = (platform) => {
    if (platform === "whatsapp") {
      router.push(`whatsapp://send?text=${encodeURIComponent(whatsappBody)}`);
    } else if (platform === "telegram") {
      router.push(`tg://msg?text=${encodeURIComponent(telegramBody)}`);
    } else if (platform === "copy") {
      navigator.clipboard.writeText(copyBody);
      toast.success("Kopyalandı");
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    } else if (platform === "other") {
      const shareData = {
        title: `FilmIsBest | ${movie.filmName}`,
        text: copyBody,
      };
      toast.loading("Hazırlanır", {
        duration: 1000,
      });
      navigator.share(shareData);
    }
  };

  async function handlePoster() {
    toast.loading("Şəkil hazırlanır", {
      duration: 2500,
    });
    const response = await fetch(
      `https://filmisbest.com/_next/image?url=${encodeURI(movie.poster)}&w=640&q=75`,
    );
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
    navigator.share(shareData);
  }

  const notify = () =>
    toast("Bu özəllikdən istifadə etmək üçün hesabınıza daxil olun", {
      icon: <BiLogIn className="text-2xl font-bold" />,
    });

  return (
    <div>
      <ClerkLoading>
        <SuspenseButton />
      </ClerkLoading>
      <ClerkLoaded>
        <Button
          size="lg"
          color="primary"
          className="relative flex flex-row items-center justify-center gap-1 text-xl font-bold"
          onPress={user.isSignedIn ? onOpen : notify}
        >
          <BiSolidShareAlt className="mt-1 text-2xl" />
          <p>Paylaş</p>
        </Button>
      </ClerkLoaded>
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
                <h6 className="text-3xl font-bold">Paylaş</h6>
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
                      <p className="font-bold">Digər</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
