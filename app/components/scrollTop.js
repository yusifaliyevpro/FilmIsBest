"use client";

import { IoMdArrowRoundUp } from "react-icons/io";
import ScrollToTop from "react-scroll-up";

export default function ScrollTop() {
  return (
    <ScrollToTop style={{ zIndex: 49 }} showUnder={160}>
      <div className="z-[49] cursor-pointer rounded-full bg-gray-200 p-2 shadow-medium">
        <IoMdArrowRoundUp className="text-3xl text-white" />
      </div>
    </ScrollToTop>
  );
}
