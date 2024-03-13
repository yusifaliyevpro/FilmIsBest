"use client";
import React, { useState } from "react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SuspenseButton from "./suspenseButton";
import { BiLogIn } from "react-icons/bi";

export default function FormSubmit() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [movieName, setMovieName] = useState("");
  const user = useAuth();
  const router = useRouter();
  const submitForm = () => {
    toast.loading("Göndərilir...", { duration: 3000 });
    fetch("https://formsubmit.co/ajax/filmisbest.official@gmail.com", {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Movie_Name: movieName,
        _subject: "New Movie Request!",
        _captcha: false,
        _template: "table",
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        toast.success("Göndərildi!", {
          duration: 4000,
        }),
      )
      .catch((error) =>
        toast.error("Göndərilmə uğursuz oldu", {
          duration: 4000,
        }),
      );

    onClose();
  };
  const notify = () =>
    toast("Bu özəllikdən istifadə etmək üçün hesabınıza daxil olun", {
      icon: <BiLogIn className="text-4xl font-bold" />,
    });

  return (
    <div className="mt-4 flex text-light sm:absolute sm:right-28 sm:ml-auto sm:mt-auto">
      <ClerkLoading>
        <SuspenseButton />
      </ClerkLoading>
      <ClerkLoaded>
        <Button
          onPress={user.isSignedIn ? onOpen : notify}
          color="primary"
          size="lg"
          className="text-base font-bold"
        >
          Film İstəyi
        </Button>
      </ClerkLoaded>
      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mt-2 flex flex-col items-center justify-center gap-1 text-2xl font-bold light:text-white dark:text-white">
                Film İstəyi
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Ad (Optional)"
                  name="Name"
                  autoComplete="off"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Adınızı daxil edin"
                  variant="bordered"
                  type="text"
                />
                <Input
                  label="Email"
                  placeholder="you@domian.com"
                  validate="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="Email"
                  type="email"
                  required
                  variant="bordered"
                />
                <Input
                  label="Filmin Adı"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={(e) => {
                    setMovieName(e.target.value);
                  }}
                  name="Movie Name"
                  placeholder="Filmin adını daxil edin"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter className="relative flex items-center justify-center">
                <Button color="primary" onPress={submitForm}>
                  Göndər
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
