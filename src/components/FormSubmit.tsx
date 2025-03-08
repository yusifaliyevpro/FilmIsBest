"use client";

import { newMovieRequest } from "@/lib/actions";
import useForm from "@/lib/useForm";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { addToast, closeAll } from "@heroui/toast";
import { useTranslations } from "next-intl";
import { BiSolidMovie } from "react-icons/bi";
import { HiAtSymbol } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";

export default function FormSubmit() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { formData, setFormData } = useForm();
  const t = useTranslations("Footer.FormSubmit");

  const submitForm = async () => {
    addToast({ title: t("sending"), timeout: Infinity });
    try {
      onClose();
      const { res, e } = await newMovieRequest(formData.name, formData.email, false, formData.movieName);
      if (res && !e) {
        closeAll();
        addToast({ title: t("sent"), color: "success", timeout: 3000 });
        return setFormData({
          name: "",
          email: "",
          movieName: "",
          isInvalidEmail: false,
          isInvalidMovieName: false,
        });
      }
      throw new Error("Failed to create a");
    } catch (err) {
      addToast({ title: t("failedToSend"), timeout: 3000, color: "danger" });
      console.log(err);
    }
  };

  const validateEmail = (value: string) =>
    value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  return (
    <div className="mt-4 flex text-light sm:absolute sm:right-28 sm:ml-auto sm:mt-auto">
      <Button className="text-base font-bold" color="primary" onPress={onOpen}>
        {t("movieRequest")}
      </Button>
      <Modal backdrop="blur" classNames={{ base: "bg-gray-200" }} isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="mt-2 flex flex-col items-center justify-center gap-1 text-2xl font-bold text-white light:text-white dark:text-white">
                {t("movieRequest")}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  autoComplete="off"
                  classNames={{ input: "text-white" }}
                  endContent={<IoPerson className="pointer-events-none flex-shrink-0 text-xl text-default-500" />}
                  label={`${t("name")} (Optional)`}
                  labelPlacement="outside"
                  type="text"
                  value={formData.name}
                  variant="bordered"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    });
                  }}
                />
                <Input
                  isRequired
                  autoComplete="email"
                  classNames={{ input: "text-white" }}
                  description={t("emailPrivacy")}
                  endContent={<HiAtSymbol className="pointer-events-none flex-shrink-0 text-2xl text-default-500" />}
                  errorMessage={formData.isInvalidEmail && t("emailError")}
                  isInvalid={formData.isInvalidEmail}
                  label={t("email")}
                  labelPlacement="outside"
                  name="email"
                  placeholder=""
                  type="email"
                  value={formData.email}
                  variant="bordered"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value.toLowerCase(),
                      isInvalidEmail: validateEmail(e.target.value.trim()) === null ? true : false,
                    });
                  }}
                />
                <Input
                  isRequired
                  autoComplete="off"
                  className="text-white"
                  classNames={{ input: "light:text-white dark:text-white" }}
                  endContent={<BiSolidMovie className="pointer-events-none flex-shrink-0 text-2xl text-default-500" />}
                  errorMessage={formData.isInvalidMovieName && t("movieNameError")}
                  isInvalid={formData.isInvalidMovieName}
                  label={t("movieName")}
                  labelPlacement="outside"
                  type="text"
                  value={formData.movieName}
                  variant="bordered"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      movieName: e.target.value,
                      isInvalidMovieName: e.target.value.trim() === "" ? true : false,
                    });
                  }}
                />
              </ModalBody>
              <ModalFooter className="relative flex items-center justify-center">
                <Button
                  color={
                    formData.email.trim() === "" ||
                    formData.isInvalidEmail ||
                    formData.isInvalidMovieName ||
                    formData.movieName.trim() === ""
                      ? "default"
                      : "primary"
                  }
                  isDisabled={
                    formData.email.trim() === "" ||
                    formData.isInvalidEmail ||
                    formData.isInvalidMovieName ||
                    formData.movieName.trim() === ""
                  }
                  type="submit"
                  onPress={submitForm}
                >
                  {t("submit")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
