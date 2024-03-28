"use client";
import { useEffect, useState } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
export default function ScrollTop() {
  const isBrowser = () => typeof window !== "undefined";
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 120) {
        // Örnek bir değer, düzenleyebilirsiniz
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={` fixed bottom-5 right-6 z-50 cursor-pointer rounded-full bg-gray-200 p-2 shadow-medium ${showScroll ? "" : "hidden"}`}
    >
      <IoMdArrowRoundUp onClick={scrollToTop} className=" text-3xl" />
    </div>
  );
}
