"use client";
import React, { useState } from "react";
import LottieAnimation from "./LottieAnimation";
import animation from "../../public/Complete.json";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import Complete from "./complete";

export default function FormSubmit() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [successful, setSuccessful] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [movieName, setMovieName] = useState("");

  const submitForm = () => {
    fetch("https://formsubmit.co/ajax/filmisbest.official@gmail.com", {
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
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    onClose();
    setSuccessful(true);
    setTimeout(() => {
      setSuccessful(false);
    }, 8000);
  };

  return (
    <div className="mt-4 flex sm:absolute sm:right-28 sm:ml-auto sm:mt-auto">
      <Button
        onPress={onOpen}
        color="primary"
        size="lg"
        className="text-base font-bold"
      >
        Film İstəyi
      </Button>
      <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mt-2 flex flex-col items-center justify-center gap-1 text-2xl font-bold">
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
      {successful ? (
        <Complete message={"Göndərildi!"} successful={successful} />
      ) : null}
    </div>
  );
}
