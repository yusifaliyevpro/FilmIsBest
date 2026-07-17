"use client";

import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";
import { BsPlayFill } from "react-icons/bs";
import type { MovieQueryResult } from "@/sanity/types";

// Embeddable players, best first. `{id}` is replaced with the title's TMDB id
// (their canonical identifier). `movie` and `tv` hold the per-type templates;
// series play the first episode (…/1/1), and each player's own UI handles
// season/episode navigation from there.
const PLAYERS = [
  {
    name: "Spark",
    movie: "https://player.videasy.net/movie/{id}?color=e50914&overlay=true",
    tv: "https://player.videasy.net/tv/{id}/1/1?color=e50914&overlay=true&nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true",
  },
  { name: "Photon", movie: "https://play.xpass.top/e/movie/{id}", tv: "https://play.xpass.top/e/tv/{id}/1/1" },
  {
    name: "Flare",
    movie: "https://www.vidking.net/embed/movie/{id}?autoPlay=true&color=e50914",
    tv: "https://www.vidking.net/embed/tv/{id}/1/1?autoPlay=true&color=e50914&nextEpisode=true&episodeSelector=true",
  },
  { name: "Theta", movie: "https://moviesapi.to/movie/{id}", tv: "https://moviesapi.to/tv/{id}/1/1" },
  {
    name: "Nebula",
    movie: "https://www.zxcstream.xyz/player/movie/{id}",
    tv: "https://www.zxcstream.xyz/player/tv/{id}/1/1",
  },
  {
    name: "Nova",
    movie: "https://peachify.top/embed/movie/{id}?autoPlay=true&sub=English&cast=hide&pip=hide&accent=e50914",
    tv: "https://peachify.top/embed/tv/{id}/1/1?autoPlay=true&autoNext=30&showNextBtn=true&sub=English&cast=hide&pip=hide&accent=e50914",
  },
  {
    name: "Haze",
    movie: "https://primesrc.me/embed/movie?tmdb={id}&fallback=true&serverOrder=PrimeVid",
    tv: "https://primesrc.me/embed/tv?tmdb={id}&season=1&episode=1&fallback=true&serverOrder=PrimeVid",
  },
  { name: "Pulsar", movie: "https://vidfast.pro/movie/{id}", tv: "https://vidfast.pro/tv/{id}/1/1" },
  { name: "Quasar", movie: "https://airflix1.com/embed/movie/{id}", tv: "https://airflix1.com/embed/tv/{id}/1/1" },
  { name: "Prism", movie: "https://vidrock.ru/movie/{id}", tv: "https://vidrock.ru/tv/{id}/1/1" },
  { name: "Talon", movie: "https://vsembed.ru/embed/movie/{id}", tv: "https://vsembed.ru/embed/tv/{id}/1/1" },
  {
    name: "Pulse",
    movie: "https://vidcore.net/movie/{id}?autoPlay=true&theme=e50914&sub=en&chromecast=false",
    tv: "https://vidcore.net/tv/{id}/1/1?autoPlay=true&theme=e50914&sub=en&chromecast=false",
  },
  { name: "Ember", movie: "https://vaplayer.ru/embed/movie/{id}", tv: "https://vaplayer.ru/embed/tv/{id}/1/1" },
  {
    name: "Blaze",
    movie: "https://vidup.to/movie/{id}?autoPlay=true&theme=e50914&sub=en&chromecast=false",
    tv: "https://vidup.to/tv/{id}/1/1?autoPlay=true&autoNext=true&nextButton=true&theme=e50914&sub=en&chromecast=false",
  },
  {
    name: "Drift",
    movie: "https://vidsync.xyz/embed/movie/{id}?autoPlay=true&theme=e50914",
    tv: "https://vidsync.xyz/embed/tv/{id}/1/1?autoPlay=true&autoNext=true&nextButton=true&theme=e50914",
  },
  { name: "Comet", movie: "https://vidnest.fun/movie/{id}", tv: "https://vidnest.fun/tv/{id}/1/1" },
  {
    name: "Lumen",
    movie: "https://cinesrc.st/embed/movie/{id}?color=%23e50914&autoskip=true&quality=1080",
    tv: "https://cinesrc.st/embed/tv/{id}?s=1&e=1&color=%23e50914&autonext=true&autoskip=true&quality=1080",
  },
  { name: "Mist", movie: "https://vidzen.fun/movie/{id}", tv: "https://vidzen.fun/tv/{id}/1/1" },
  { name: "Umbra", movie: "https://cinemaos.tech/player/{id}", tv: "https://cinemaos.tech/player/{id}/1/1" },
] as const;

export default function MovieBar({ movie, children }: { movie: MovieQueryResult; children?: ReactNode }) {
  const [activeName, setActiveName] = useState<string>(PLAYERS[0].name);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isTrailer, setIsTrailer] = useState(false);
  const t = useTranslations("Movie.MovieBar");

  if (!movie) return null;

  const activePlayer = PLAYERS.find((p) => p.name === activeName) ?? PLAYERS[0];
  const template = movie.series ? activePlayer.tv : activePlayer.movie;
  const activeLink = template.replace("{id}", String(movie.tmdbId));

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
            {/* oxlint-disable-next-line react/iframe-missing-sandbox */}
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
              // oxlint-disable-next-line react/style-prop-object
              style="margin-right: auto; margin-left: auto; border-radius: 10px;"
              videoid={movie.FraqmanLink}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
