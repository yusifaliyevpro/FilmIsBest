"use client";
import { useScopedI18n } from "@/locales/client";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useState } from "react";
import PlayerCover from "./PlayerCover";
import { AiOutlineLoading } from "react-icons/ai";

export default function MovieBar({ movie }) {
  const englishLink = "https://vidsrc.to/embed/movie/" + movie.imdbID;
  const turkishLink = movie.TurkishLink;
  const turkishSubLink = movie.TurkishSubtitleLink;
  const youtubeLink = "https://www.youtube.com/embed/" + movie.FraqmanLink;
  const [activeLink, setActiveLink] = useState(englishLink);
  const [showCover, setShowCover] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const t = useScopedI18n("Movie.MovieBar");

  function handleLanguage(key) {
    setShowCover(true);
    setIframeLoading(true);
    if (key === "english" || key === "englishSubtitle") {
      setActiveLink(englishLink);
    } else if (key === "turkish") {
      setActiveLink(movie.TurkishLink);
    } else if (key === "turkishSubtitle") {
      setActiveLink(movie.TurkishSubtitleLink);
    } else if (key === "trailer") {
      setActiveLink(youtubeLink);
    }
  }

  function handleCoverClick() {
    setShowCover(false); // Hide the cover and show the video
  }

  function handleLoading() {
    setIframeLoading(false); // Hide the cover and show the video
  }

  return (
    <div className="relative mx-auto mt-12 flex h-auto w-auto flex-col rounded-10 px-3 sm:h-[560px] sm:w-200">
      <Tabs
        aria-label="Options"
        keyboardActivation="manual"
        size="lg"
        variant="solid"
        onSelectionChange={handleLanguage}
        classNames={{ tabList: "bg-gray-200" }}
        color="primary"
        fullWidth={true}
        defaultSelectedKey="english"
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
      {showCover && !activeLink.includes("www.youtube.com") ? (
        <PlayerCover handleCoverClick={handleCoverClick} />
      ) : (
        <>
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
            title={movie.filmName}
            onLoad={() => {
              setIframeLoading(false);
            }}
          ></iframe>
        </>
      )}
    </div>
  );
}
