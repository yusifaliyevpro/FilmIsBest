"use client";
import { useEffect, useState } from "react";

const useSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      }
    }
  }, []);

  return { isMobile, setIsMobile };
};

export default useSize;
