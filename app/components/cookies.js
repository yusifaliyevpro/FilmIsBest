"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { setCookie } from "cookies-next";
import { useEffect } from "react";
import React from "react";
import { Cookies } from "react-cookie-consent";
import { BiCookie } from "react-icons/bi";

export default function CookiesConsent() {
  const cookie = Cookies.get("FilmIsBestConsent");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleAccept = () => {
    setCookie("FilmIsBestConsent", "true", {
      maxAge: 60 * 60 * 24 * 30 * 3,
    });
  };

  const handleReject = () => {
    setCookie("FilmIsBestConsent", "false", {
      maxAge: 60 * 60 * 24 * 30 * 3,
    });
  };

  useEffect(() => {
    if (cookie === "true") {
      onClose();
    } else {
      onOpen();
    }
  }, [cookie]);

  return (
    <Modal
      isOpen={isOpen}
      hideCloseButton={true}
      isDismissable={false}
      backdrop="blur"
      className="light:text-white dark:text-white"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row items-center justify-center gap-2 text-2xl font-bold">
              <BiCookie className="text-2xl font-bold" />
              Çərəzlər
            </ModalHeader>
            <ModalBody>
              <p className="text-left text-base">
                Sayt sizin üstün və daha yaxşı baxış təcrübəsinə sahib olmanıza
                kömək etmək üçün çərəzlərdən istifadə edir
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                onClick={handleReject}
              >
                Rədd et
              </Button>
              <Button color="primary" onPress={onClose} onClick={handleAccept}>
                Qəbul et
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
