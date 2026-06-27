"use client";

import { YouTubeEmbed } from "@next/third-parties/google";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { ReactNode, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";
import { BsPlayFill } from "react-icons/bs";
import { MovieQueryResult } from "@/sanity/types";

// Embeddable players, best first. `{id}` is replaced with the movie's IMDb ID
// (these endpoints accept IMDb IDs even where their docs show TMDB IDs).
const PLAYERS = [
  { name: "Umbra", url: "https://cinemaos.tech/player/{id}" },
  { name: "Spark", url: "https://player.videasy.net/movie/{id}?color=e50914&overlay=true" },
  { name: "Photon", url: "https://play.xpass.top/e/movie/{id}" },
  { name: "Flare", url: "https://www.vidking.net/embed/movie/{id}?autoPlay=true&color=e50914" },
  { name: "Theta", url: "https://moviesapi.to/movie/{id}" },
  { name: "Nebula", url: "https://www.zxcstream.xyz/player/movie/{id}" },
  { name: "Nova", url: "https://peachify.top/embed/movie/{id}?autoPlay=true&sub=English&cast=hide&pip=hide&accent=e50914" },
  { name: "Haze", url: "https://primesrc.me/embed/movie?tmdb={id}&fallback=true&serverOrder=PrimeVid" },
  { name: "Pulsar", url: "https://vidfast.pro/movie/{id}" },
  { name: "Quasar", url: "https://airflix1.com/embed/movie/{id}" },
  { name: "Prism", url: "https://vidrock.ru/movie/{id}" },
  { name: "Talon", url: "https://vsembed.ru/embed/movie/{id}" },
  { name: "Pulse", url: "https://vidcore.net/movie/{id}?autoPlay=true&theme=e50914&sub=en&chromecast=false" },
  { name: "Ember", url: "https://vaplayer.ru/embed/movie/{id}" },
  { name: "Blaze", url: "https://vidup.to/movie/{id}?autoPlay=true&theme=e50914&sub=en&chromecast=false" },
  { name: "Drift", url: "https://vidsync.xyz/embed/movie/{id}?autoPlay=true&theme=e50914" },
  { name: "Comet", url: "https://vidnest.fun/movie/{id}" },
  { name: "Lumen", url: "https://cinesrc.st/embed/movie/{id}?color=%23e50914&autoskip=true&quality=1080" },
  { name: "Mist", url: "https://vidzen.fun/movie/{id}" },
] as const;

export default function MovieBar({ movie, children }: { movie: MovieQueryResult; children?: ReactNode }) {
  const [activeName, setActiveName] = useState<string>(PLAYERS[0].name);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isTrailer, setIsTrailer] = useState(false);
  const t = useTranslations("Movie.MovieBar");

  if (!movie) return null;

  const activePlayer = PLAYERS.find((p) => p.name === activeName) ?? PLAYERS[0];
  const activeLink = activePlayer.url.replace("{id}", movie.imdbID);

  // The iframe only mounts after a deliberate play click (a "facade"), so the
  // player can't auto-redirect to ads the moment the page loads.
  const handlePlay = () => {
    setIframeLoading(true);
    setIsPlaying(true);
  };

  const handleSelect = (name: string) => {
    if (name === activeName) return;
    setActiveName(name);
    // Switching players returns to our banner; the new player won't load until
    // the user clicks play again.
    setIsPlaying(false);
  };

  return (
    <div className="relative mx-auto mt-12 flex w-auto max-w-full flex-col gap-4 px-3 sm:w-209">
      <div className="relative h-60 w-full overflow-hidden rounded-xl bg-black sm:h-125">
        {!isPlaying ? (
          <button
            type="button"
            aria-label={t("play")}
            className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black select-none"
            onClick={handlePlay}
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-large transition-transform group-hover:scale-110 sm:h-24 sm:w-24">
              <BsPlayFill className="ml-1 text-5xl sm:text-6xl" />
            </span>
          </button>
        ) : (
          <>
            {iframeLoading && (
              <div className="absolute inset-0 z-35 flex items-center justify-center bg-black select-none">
                <div className="animate-spin text-8xl font-bold text-blue-600">
                  <AiOutlineLoading />
                </div>
              </div>
            )}
            <iframe
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              className="z-35 h-full w-full border-none bg-black select-none"
              src={activeLink}
              title={movie.filmName || "Movie Video"}
              onLoad={() => setIframeLoading(false)}
            />
          </>
        )}
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-2 select-none">
        {PLAYERS.map((player) => (
          <Button
            key={player.name}
            className="font-bold"
            color={player.name === activeName ? "primary" : "default"}
            radius="full"
            size="sm"
            variant={player.name === activeName ? "solid" : "flat"}
            onPress={() => handleSelect(player.name)}
          >
            {player.name}
          </Button>
        ))}
      </div>

      <div className="mb-6 flex flex-row items-center justify-end gap-3">
        <Button
          className="flex flex-row items-center justify-center gap-1 text-base font-bold"
          color="primary"
          size="md"
          onPress={() => setIsTrailer(true)}
        >
          <BiSolidVideos className="mt-0.5 text-2xl" />
          <p>{t("trailer")}</p>
        </Button>
        {children}
      </div>

      <Modal
        backdrop="blur"
        classNames={{ base: "bg-gray-900" }}
        isOpen={isTrailer}
        placement="center"
        size="3xl"
        onOpenChange={() => setIsTrailer(false)}
      >
        <ModalContent>
          <ModalHeader className="mt-1 flex flex-row items-center justify-center text-2xl font-bold">
            {movie.filmName} - {t("trailer")}
          </ModalHeader>
          <ModalBody className="mb-5 h-full w-full">
            <YouTubeEmbed
              style="margin-right: auto; margin-left: auto; border-radius: 10px;"
              videoid={movie.FraqmanLink}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
