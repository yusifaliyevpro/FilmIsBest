"use client";
import { Suspense } from "react";
import SuspenseButton from "./suspenseButton";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const FormSubmit = dynamic(() => import("./formsubmit"));

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={`relative bottom-0 ${pathname.startsWith("/studio") ? "hidden" : "flex"} left-0 z-50 flex h-auto w-full flex-col items-center justify-center bg-gray-200 fill-current py-5 text-white sm:flex-row`}
    >
      <h3 className="select-none text-xl font-bold no-underline">
        👌 Made by{" "}
        <a
          className="text-xl no-underline hover:text-blue-600"
          href="https://yusifaliyevpro.com"
          target="_blank"
        >
          YusifAliyevPro
        </a>
      </h3>
      <Suspense fallback={<SuspenseButton />}>
        <FormSubmit />
      </Suspense>
    </footer>
  );
}
