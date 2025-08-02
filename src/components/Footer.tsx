import { Button } from "@heroui/button";
import dynamic from "next/dynamic";

const FormSubmit = dynamic(() => import("./FormSubmit"), {
  loading: () => <Button color="primary" className="h-10 w-30" />,
});

export default function Footer() {
  return (
    <footer className="relative bottom-0 left-0 z-48 hidden h-auto w-full flex-col items-center justify-center bg-gray-200 fill-current py-5 text-white sm:flex-row md:flex">
      <h3 className="text-xl font-bold no-underline select-none">
        👌 Made by{" "}
        <a
          className="text-xl no-underline hover:text-blue-600"
          href="https://yusifaliyevpro.com"
          target="_blank"
        >
          YusifAliyevPro
        </a>
      </h3>
      <FormSubmit />
    </footer>
  );
}
