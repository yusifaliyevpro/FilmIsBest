"use client";

// This component is named FormSubmit as a nod to my early days using formsubmit.co, simple tool for sending form requests via email.
// It was a great starting point for learning about web forms and handling submissions with basic HTML POST methods.
// Since then, I've explored more advanced technologies like Next.js, UI libraries, Server Actions, Prisma, and useActionState.
// It's interesting to see how much my approach to building forms has evolved since those first experiments with Formsubmit.co.

import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import { BiSolidMovie } from "react-icons/bi";
import { HiAtSymbol } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import { toast } from "sonner";
import { type ActionState, submitMovieSuggestion } from "@/data/prisma/suggestions/actions";
import { cn } from "@/lib/cn";

type FieldProps = {
  name: string;
  label: string;
  endContent: ReactNode;
  type?: string;
  autoComplete?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  description?: string;
  defaultValue?: string;
};

function Field({
  name,
  label,
  endContent,
  type = "text",
  autoComplete,
  isRequired,
  isInvalid,
  errorMessage,
  description,
  defaultValue,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "relative flex items-center rounded-medium border-2 bg-transparent transition-colors",
          isInvalid ? "border-danger" : "border-default-200 focus-within:border-white hover:border-default-400",
        )}
      >
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={isInvalid}
          defaultValue={defaultValue}
          placeholder=" "
          className="peer h-10 w-full bg-transparent px-3 text-small text-white placeholder:text-transparent focus:outline-none"
        />
        <label
          htmlFor={name}
          className={cn(
            "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-small transition-all",
            "peer-focus:-top-px peer-focus:bg-gray-900 peer-focus:px-1 peer-focus:text-tiny",
            "peer-[:not(:placeholder-shown)]:-top-px peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-tiny",
            isInvalid ? "text-danger" : "text-default-500 peer-focus:text-white",
          )}
        >
          {label}
          {isRequired && " *"}
        </label>
        <span className="shrink-0 pr-3">{endContent}</span>
      </div>
      {isInvalid && errorMessage ? (
        <p className="px-1 text-tiny text-danger">{errorMessage}</p>
      ) : description ? (
        <p className="px-1 text-tiny text-default-500">{description}</p>
      ) : null}
    </div>
  );
}

const initialState: ActionState = {
  success: false,
  data: { fullName: "", email: "", movieName: "" },
  errors: {},
};

type FormSubmitProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};

export default function FormSubmit({ isOpen, onClose, onOpenChange }: FormSubmitProps) {
  const t = useTranslations("Footer.FormSubmit");

  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitMovieSuggestion(state, formData);
      setState(result);
      if (result.success) {
        toast.dismiss();
        toast.success(t("sent"), { duration: 3000 });
        onClose();
      } else if (Object.keys(result.errors ?? {}).length > 0) {
        toast.error(t("failedToSend"), { duration: 3000 });
      }
    });
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{ base: "bg-gray-900" }}
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="mt-2 flex flex-col items-center justify-center gap-1 px-6 text-center text-2xl font-bold text-white">
          {t("movieSuggestion")}
        </ModalHeader>
        <form onSubmit={handleSubmit} noValidate>
          <ModalBody className="mt-4 gap-6">
            <Field
              autoComplete="off"
              name="fullName"
              endContent={<IoPerson className="pointer-events-none shrink-0 text-xl text-default-500" />}
              label={`${t("name")} (Optional)`}
              type="text"
              defaultValue={state.data.fullName}
            />
            <Field
              isRequired
              autoComplete="email"
              description={t("emailPrivacy")}
              endContent={<HiAtSymbol className="pointer-events-none shrink-0 text-2xl text-default-500" />}
              errorMessage={t("emailError")}
              isInvalid={!!state.errors?.email}
              label={t("email")}
              name="email"
              type="email"
            />
            <Field
              isRequired
              autoComplete="off"
              name="movieName"
              endContent={<BiSolidMovie className="pointer-events-none shrink-0 text-2xl text-default-500" />}
              errorMessage={t("movieNameError")}
              isInvalid={!!state.errors?.movieName}
              label={t("movieName")}
              type="text"
              defaultValue={state.data.movieName}
            />
            <p className="mt-1 text-center text-xs text-default-500">{t("description")}</p>
          </ModalBody>
          <ModalFooter className="relative flex items-center justify-center">
            <Button type="submit" color="primary" isDisabled={isPending} isLoading={isPending}>
              {t("submit")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
