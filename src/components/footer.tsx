"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const FormSubmit = dynamic(() => import("@/components/form-submit"), {
  ssr: false,
});

export default function Footer() {
  const t = useTranslations("Footer.FormSubmit");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <footer className="relative bottom-0 left-0 z-48 hidden h-auto w-full flex-col items-center justify-center bg-gray-900 fill-current py-5 text-white sm:flex-row md:flex">
      <h3 className="text-xl font-bold no-underline select-none">
        👌 Made by{" "}
        <a
          className="text-xl no-underline hover:text-blue-600"
          href="https://yusifaliyevpro.com"
          target="_blank"
        >
          YusifAliyevPro
        </a>
      </h3>
      <div className="mt-4 flex text-white sm:absolute sm:right-28 sm:mt-auto sm:ml-auto">
        <Button className="text-base font-bold" color="primary" onPress={onOpen}>
          {t("movieRequest")}
        </Button>

        {isOpen && <FormSubmit isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />}
      </div>
    </footer>
  );
}
