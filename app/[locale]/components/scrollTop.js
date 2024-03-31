"use client";
import { IoMdArrowRoundUp } from "react-icons/io";
import ScrollToTop from "react-scroll-up";
export default function ScrollTop() {
  return (
    <ScrollToTop style={{ zIndex: 500 }} showUnder={160}>
      <div className="z-[300] cursor-pointer rounded-full bg-neutral-900 p-2 shadow-medium">
        <IoMdArrowRoundUp className=" text-3xl" />
      </div>
    </ScrollToTop>
  );
}
