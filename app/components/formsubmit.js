import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import toast from "react-hot-toast";
import useForm from "../hooks/useForm";
import { BiSolidMovie } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { HiAtSymbol } from "react-icons/hi";

export default function FormSubmit() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { formData, setFormData } = useForm();

  const submitForm = () => {
    toast.promise(
      fetch("https://formsubmit.co/ajax/filmisbest.official@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          movie_Name: formData.movieName.trim(),
          _subject: "New Movie Request!",
          _captcha: false,
          _template: "table",
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error)),
      {
        loading: "Göndərilir...",
        success: "Göndərildi!",
        error: "Göndərilə bilmədi",
      },
    );
    setFormData({
      name: "",
      email: "",
      movieName: "",
      isInvalidEmail: false,
      isInvalidMovieName: false,
    });

    onClose();
  };

  const validateEmail = (value) =>
    value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  return (
    <div className="mt-4 flex text-light sm:absolute sm:right-28 sm:ml-auto sm:mt-auto">
      <Button onPress={onOpen} color="primary" className="text-base font-bold">
        Film İstəyi
      </Button>
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
                  labelPlacement="outside"
                  autoComplete="off"
                  value={formData.name}
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
                  label="Email"
                  placeholder=""
                  autoComplete="email"
                  value={formData.email}
                  isRequired
                  description="E-poçtunuzu heç vaxt başqası ilə paylaşmayacağıq"
                  isInvalid={formData.isInvalidEmail}
                  errorMessage={
                    formData.isInvalidEmail &&
                    "Daxil etdiyiniz email düzgün deyil"
                  }
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
                  label="Filmin Adı"
                  type="text"
                  autoComplete="off"
                  value={formData.movieName}
                  isRequired
                  isInvalid={formData.isInvalidMovieName}
                  errorMessage={
                    formData.isInvalidMovieName && "Film Adı boş qoyula bilməz"
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
