"use client";
import React, { useEffect } from "react";
import LottieAnimation from "./LottieAnimation";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export default function Complete({ successful, message }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  useEffect(() => {
    if (successful) {
      onOpen();
    } else {
      onClose();
    }
  }, [successful]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      hideCloseButton
      size="sm"
      radius="lg"
    >
      <ModalContent>
        <ModalBody>
          <div className="relative flex flex-col items-center justify-center">
            <LottieAnimation animationPath="/success.lottie" />
            <p className="absolute top-3/4 mt-6 text-xl font-bold">{message}</p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
