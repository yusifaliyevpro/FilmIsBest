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
          name: formData.name,
          email: formData.email,
          movie_Name: formData.movieName,
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

    onClose();
  };

  return (
    <div className="mt-4 flex text-light sm:absolute sm:right-28 sm:ml-auto sm:mt-auto">
      <Button
        onPress={onOpen}
        color="primary"
        size="lg"
        className="text-base font-bold"
      >
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
                  name="Name"
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
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
                    setFormData({ ...formData, email: e.target.value });
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
                    setFormData({ ...formData, movieName: e.target.value });
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
