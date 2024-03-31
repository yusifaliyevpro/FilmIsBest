"use client";
import { useState } from "react";

const useMovieLink = (initialLink) => {
  const [activeLink, setActiveLink] = useState(initialLink);

  return { activeLink, setActiveLink };
};

export default useMovieLink;
