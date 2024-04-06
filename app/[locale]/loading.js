import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="relative flex w-full min-h-screen items-center justify-center">
      <div className="animate-spin relative text-8xl text-blue-600 font-bold">
        <AiOutlineLoading />
      </div>
    </div>
  );
}
