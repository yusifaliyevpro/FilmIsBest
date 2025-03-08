import FormSubmit from "./FormSubmit";
import SuspenseButton from "./SuspenseLayouts";
import { Suspense } from "react";

export default function Footer() {
  return (
    <footer className="z-48 relative bottom-0 left-0 hidden h-auto w-full flex-col items-center justify-center bg-gray-200 fill-current py-5 text-white sm:flex-row md:flex">
      <h3 className="select-none text-xl font-bold no-underline">
        👌 Made by{" "}
        <a className="text-xl no-underline hover:text-blue-600" href="https://yusifaliyevpro.com" target="_blank">
          YusifAliyevPro
        </a>
      </h3>
      <Suspense fallback={<SuspenseButton color="primary" />}>
        <FormSubmit />
      </Suspense>
    </footer>
  );
}
