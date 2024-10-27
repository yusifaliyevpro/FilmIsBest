import useForm from "@/src/hooks/useForm";
import { BASE_URL } from "@/src/lib/constants";
import { useScopedI18n } from "@/src/locales/client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import toast from "react-hot-toast";
import { BiSolidMovie } from "react-icons/bi";
import { HiAtSymbol } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";

export default function FormSubmit() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { formData, setFormData } = useForm();
  const t = useScopedI18n("Footer.FormSubmit");

  const submitForm = async () => {
    try {
      toast.loading(t("sending"), { duration: Infinity, id: "form" });
      onClose();
      const res = await fetch(`${BASE_URL}/api/movierequests`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          password: process.env.ADMIN_PASSWORD,
        },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          movieName: formData.movieName.trim(),
        }),
      });
      console.log(res);
      if (res.ok) {
        toast.success(t("sent"), { id: "form", duration: 3000 });
        setFormData({
          name: "",
          email: "",
          movieName: "",
          isInvalidEmail: false,
          isInvalidMovieName: false,
        });
      } else {
        throw new Error("Failed to create a");
      }
    } catch (err) {
      toast.error(t("failedToSend"), { id: "form", duration: 3000 });
      console.log(err);
    }
  };

  const validateEmail = (value) =>
    value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  return (
    <div className="mt-4 flex text-light sm:absolute sm:right-28 sm:ml-auto sm:mt-auto">
      <Button onPress={onOpen} color="primary" className="text-base font-bold">
        {t("movieRequest")}
      </Button>
      <Modal
        isOpen={isOpen}
        placement="center"
        classNames={{ base: "bg-gray-200" }}
        backdrop="blur"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mt-2 flex flex-col items-center justify-center gap-1 text-2xl font-bold text-white light:text-white dark:text-white">
                {t("movieRequest")}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label={`${t("name")} (Optional)`}
                  labelPlacement="outside"
                  autoComplete="off"
                  value={formData.name}
                  classNames={{ input: "text-white" }}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    });
                  }}
                  variant="bordered"
                  type="text"
                  endContent={
                    <IoPerson className="pointer-events-none flex-shrink-0 text-xl text-default-500" />
                  }
                />
                <Input
                  label={t("email")}
                  placeholder=""
                  autoComplete="email"
                  value={formData.email}
                  classNames={{ input: "text-white" }}
                  isRequired
                  description={t("emailPrivacy")}
                  isInvalid={formData.isInvalidEmail}
                  errorMessage={formData.isInvalidEmail && t("emailError")}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value.toLowerCase(),
                      isInvalidEmail:
                        validateEmail(e.target.value.trim()) === null
                          ? true
                          : false,
                    });
                  }}
                  type="email"
                  name="email"
                  labelPlacement="outside"
                  endContent={
                    <HiAtSymbol className="pointer-events-none flex-shrink-0 text-2xl text-default-500" />
                  }
                  variant="bordered"
                />
                <Input
                  label={t("movieName")}
                  type="text"
                  autoComplete="off"
                  value={formData.movieName}
                  isRequired
                  classNames={{ input: "dark:text-white light:text-white" }}
                  className="text-white"
                  isInvalid={formData.isInvalidMovieName}
                  errorMessage={
                    formData.isInvalidMovieName && t("movieNameError")
                  }
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      movieName: e.target.value,
                      isInvalidMovieName:
                        e.target.value.trim() === "" ? true : false,
                    });
                  }}
                  labelPlacement="outside"
                  endContent={
                    <BiSolidMovie className="pointer-events-none flex-shrink-0 text-2xl text-default-500" />
                  }
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter className="relative flex items-center justify-center">
                <Button
                  isDisabled={
                    formData.email.trim() === "" ||
                    formData.isInvalidEmail ||
                    formData.isInvalidMovieName ||
                    formData.movieName.trim() === ""
                  }
                  color={
                    formData.email.trim() === "" ||
                    formData.isInvalidEmail ||
                    formData.isInvalidMovieName ||
                    formData.movieName.trim() === ""
                      ? "default"
                      : "primary"
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
