"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function MovieBar({ movie }) {
  const englishLink = "https://vidsrc.to/embed/movie/" + movie.imdbID;
  const turkishLink = movie.TurkishLink;
  const turkishSubLink = movie.TurkishSubtitleLink;
  const youtubeLink = "https://www.youtube.com/embed/" + movie.FraqmanLink;
  const user = useAuth();
  const [activeLink, setActiveLink] = useState(englishLink);

  function handleLanguage(key) {
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

  return (
    <div className="relative mx-auto mt-12 flex h-auto w-auto flex-col rounded-10 px-3 sm:h-[560px] sm:w-200">
      <Tabs
        aria-label="Options"
        keyboardActivation="manual"
        size="lg"
        variant="solid"
        onSelectionChange={handleLanguage}
        color="primary"
        fullWidth={true}
        defaultSelectedKey="english"
      >
        <Tab
          key="english"
          isDisabled={!movie.EnglishLink}
          className="font-bold"
          title="İngilsicə"
        ></Tab>
        <Tab
          key="englishSubtitle"
          isDisabled={!movie.EnglishSubtitleLink}
          className="font-bold"
          title="İngiliscə Altyazılı"
        ></Tab>
        <Tab
          key="turkish"
          isDisabled={turkishLink === "Empty" ? true : false}
          className="font-bold"
          title="Türkçə"
        ></Tab>
        <Tab
          key="turkishSubtitle"
          isDisabled={turkishSubLink === "Empty" ? true : false}
          className="font-bold"
          title="Türkçə altyazılı"
        ></Tab>
        <Tab key="trailer" className="font-bold" title="Fraqman"></Tab>
      </Tabs>
      <iframe
        className="z-35 relative bottom-0 left-0 mx-auto mt-0 h-60 w-full select-none rounded-b-10 border-none bg-black sm:absolute sm:h-102 sm:w-200"
        src={activeLink}
        allowFullScreen
        loading="lazy"
        title={movie.filmName}
      ></iframe>
    </div>
  );
}
