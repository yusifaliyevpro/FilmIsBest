"use client";

// This component is named FormSubmit as a nod to my early days using formsubmit.co, simple tool for sending form requests via email.
// It was a great starting point for learning about web forms and handling submissions with basic HTML POST methods.
// Since then, I've explored more advanced technologies like Next.js, UI libraries, Server Actions, Prisma, and useActionState.
// It's interesting to see how much my approach to building forms has evolved since those first experiments with Formsubmit.co.
import { submitMovieRequest } from "@/data-access/prisma/requests/actions";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { addToast, closeAll } from "@heroui/toast";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useEffectEvent } from "react";
import { BiSolidMovie } from "react-icons/bi";
import { HiAtSymbol } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";

const initialState = {
  success: false,
  data: { fullName: "", email: "", movieName: "" },
  errors: {},
};

export default function FormSubmit() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const t = useTranslations("Footer.FormSubmit");

  const [state, formAction, isPending] = useActionState(submitMovieRequest, initialState);

  const onStateChange = useEffectEvent(() => {
    if (state.success) {
      closeAll();
      addToast({ title: t("sent"), color: "success", timeout: 3000 });
      onClose();
    } else if (Object.keys(state.errors ?? {}).length > 0) {
      addToast({ title: t("failedToSend"), color: "danger", timeout: 3000 });
    }
  });
  useEffect(() => {
    onStateChange();
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <div className="text-light mt-4 flex sm:absolute sm:right-28 sm:mt-auto sm:ml-auto">
      <Button className="text-base font-bold" color="primary" onPress={onOpen}>
        {t("movieRequest")}
      </Button>
      <Modal
        backdrop="blur"
        classNames={{ base: "bg-gray-200" }}
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="light:text-white mt-2 flex flex-col items-center justify-center gap-1 text-2xl font-bold text-white dark:text-white">
            {t("movieRequest")}
          </ModalHeader>
          <form onSubmit={handleSubmit} noValidate>
            <ModalBody>
              <Input
                autoFocus
                autoComplete="off"
                name="fullName"
                classNames={{ input: "text-white" }}
                endContent={<IoPerson className="text-default-500 pointer-events-none shrink-0 text-xl" />}
                label={`${t("name")} (Optional)`}
                labelPlacement="outside"
                type="text"
                variant="bordered"
                defaultValue={state.data.fullName}
              />
              <Input
                isRequired
                autoComplete="email"
                classNames={{ input: "text-white" }}
                description={t("emailPrivacy")}
                endContent={<HiAtSymbol className="text-default-500 pointer-events-none shrink-0 text-2xl" />}
                errorMessage={!!state.errors?.email && t("emailError")}
                isInvalid={!!state.errors?.email}
                label={t("email")}
                labelPlacement="outside"
                name="email"
                type="email"
                placeholder=""
                variant="bordered"
              />
              <Input
                isRequired
                autoComplete="off"
                name="movieName"
                className="text-white"
                classNames={{ input: "light:text-white dark:text-white" }}
                endContent={
                  <BiSolidMovie className="text-default-500 pointer-events-none shrink-0 text-2xl" />
                }
                errorMessage={!!state.errors?.movieName && t("movieNameError")}
                isInvalid={!!state.errors?.movieName}
                label={t("movieName")}
                labelPlacement="outside"
                type="text"
                variant="bordered"
                defaultValue={state.data.movieName}
              />
            </ModalBody>
            <ModalFooter className="relative flex items-center justify-center">
              <Button type="submit" color="primary" isDisabled={isPending} isLoading={isPending}>
                {t("submit")}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
