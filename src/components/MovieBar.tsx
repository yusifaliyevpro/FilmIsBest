"use client";

import { type MOVIE_QUERYResult } from "@/sanity/types";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Tabs, Tab } from "@heroui/tabs";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

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
      if ((selectedKey === "english" && key == "englishSubtitle") || (selectedKey === "englishSubtitle" && key == "english")) {
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
    setIframeLoading(false);
  };

  return (
    <div className="relative mx-auto mt-12 flex h-auto w-auto flex-col rounded-10 px-3 sm:h-[560px] sm:w-200">
      <Tabs
        fullWidth
        aria-label="Options"
        className="max-sm:mb-4"
        classNames={{ tabList: "select-none bg-gray-200" }}
        color="primary"
        keyboardActivation="manual"
        selectedKey={selectedKey}
        size="lg"
        variant="solid"
        onSelectionChange={handleLanguage}
      >
        <Tab key="english" className="font-bold" isDisabled={!movie.EnglishLink} title={t("english")}></Tab>
        <Tab
          key="englishSubtitle"
          className="font-bold"
          isDisabled={!movie.EnglishSubtitleLink}
          title={t("englishSubtitle")}
        ></Tab>
        <Tab key="turkish" className="font-bold" isDisabled={turkishLink === "Empty" ? true : false} title={t("turkish")}></Tab>
        <Tab
          key="turkishSubtitle"
          className="font-bold"
          isDisabled={turkishSubLink === "Empty" ? true : false}
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
        allowFullScreen
        className={`z-35 relative bottom-0 left-0 mx-auto mt-0 h-60 w-full select-none rounded-b-10 border-none bg-black sm:absolute sm:h-102 sm:w-200 ${iframeLoading ? "hidden" : "block"}`}
        src={activeLink}
        title={movie.filmName || "Movie Video"}
        onLoad={handleLoading}
      />
      <Modal
        backdrop="blur"
        classNames={{ base: "bg-gray-200" }}
        isOpen={isTrailer}
        placement="center"
        size="3xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="mt-1 flex flex-row items-center justify-center text-2xl font-bold">
            {movie.filmName} - Trailer
          </ModalHeader>
          <ModalBody className="mb-5 h-full w-full">
            <YouTubeEmbed style="margin-right: auto; margin-left: auto; border-radius: 10px;" videoid={movie.FraqmanLink} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
