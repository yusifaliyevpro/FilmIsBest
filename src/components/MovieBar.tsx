"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { MOVIE_QUERYResult } from "../../sanity.types";
import { useTranslations } from "next-intl";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { YouTubeEmbed } from "@next/third-parties/google";

export default function MovieBar({ movie }: { movie: MOVIE_QUERYResult }) {
  const englishLink = "https://vidsrc.to/embed/movie/" + movie?.imdbID;
  const turkishLink = movie?.TurkishLink;
  const turkishSubLink = movie?.TurkishSubtitleLink;
  const [isTrailer, setIsTrailer] = useState(false);
  const [activeLink, setActiveLink] = useState(englishLink);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState("english");
  const t = useTranslations("Movie.MovieBar");
  if (!movie) return null;
  const handleLanguage = (key: string | number) => {
    key = String(key);
    if (key !== selectedKey) {
      setIframeLoading(true);
      if (
        (selectedKey === "english" && key == "englishSubtitle") ||
        (selectedKey === "englishSubtitle" && key == "english")
      ) {
        setIframeLoading(false);
      } else if (key === "english" || key === "englishSubtitle") {
        setActiveLink(englishLink);
      } else if (key === "turkish") {
        setActiveLink(movie.TurkishLink || englishLink);
      } else if (key === "turkishSubtitle") {
        setActiveLink(movie.TurkishSubtitleLink || englishLink);
      } else if (key === "trailer") {
        setIsTrailer(true);
        setIframeLoading(false);
      }
      setSelectedKey(key);
    }
  };
  const onOpenChange = () => {
    setIsTrailer(false);
    setSelectedKey("english");
  };

  const handleLoading = () => {
    setIframeLoading(false); // Hide the cover and show the video
  };

  return (
    <div className="relative mx-auto mt-12 flex h-auto w-auto flex-col rounded-10 px-3 sm:h-[560px] sm:w-200">
      <Tabs
        aria-label="Options"
        keyboardActivation="manual"
        size="lg"
        variant="solid"
        selectedKey={selectedKey}
        onSelectionChange={handleLanguage}
        classNames={{ tabList: "bg-gray-200 select-none" }}
        color="primary"
        className="max-sm:mb-4"
        fullWidth
      >
        <Tab
          key="english"
          isDisabled={!movie.EnglishLink}
          className="font-bold"
          title={t("english")}
        ></Tab>
        <Tab
          key="englishSubtitle"
          isDisabled={!movie.EnglishSubtitleLink}
          className="font-bold"
          title={t("englishSubtitle")}
        ></Tab>
        <Tab
          key="turkish"
          isDisabled={turkishLink === "Empty" ? true : false}
          className="font-bold"
          title={t("turkish")}
        ></Tab>
        <Tab
          key="turkishSubtitle"
          isDisabled={turkishSubLink === "Empty" ? true : false}
          className="font-bold"
          title={t("turkishSubtitle")}
        ></Tab>
        <Tab key="trailer" className="font-bold" title={t("trailer")}></Tab>
      </Tabs>
      {iframeLoading && (
        <div className="z-35 relative bottom-0 left-0 mx-auto mt-0 flex h-60 w-full select-none items-center justify-center rounded-b-10 border-none bg-black sm:absolute sm:h-102 sm:w-200">
          <div className="relative animate-spin text-8xl font-bold text-blue-600">
            <AiOutlineLoading />
          </div>
        </div>
      )}
      <iframe
        className={`z-35 relative bottom-0 left-0 mx-auto mt-0 h-60 w-full select-none rounded-b-10 border-none bg-black sm:absolute sm:h-102 sm:w-200 ${iframeLoading ? "hidden" : "block"}`}
        src={activeLink}
        allowFullScreen
        title={movie.filmName || "Movie Video"}
        onLoad={handleLoading}
      />
      <Modal
        isOpen={isTrailer}
        backdrop="blur"
        size="3xl"
        placement="center"
        onOpenChange={onOpenChange}
        classNames={{ base: "bg-gray-200 " }}
      >
        <ModalContent>
          <ModalHeader className="mt-1 flex flex-row items-center justify-center text-2xl font-bold">
            {movie.filmName} - Trailer
          </ModalHeader>
          <ModalBody className="mb-5">
            <YouTubeEmbed
              videoid={movie.FraqmanLink}
              style="margin-right: auto; margin-left: auto; border-radius: 10px;"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
