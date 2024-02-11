import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main>
      <div className="relative mt-6 flex flex-col items-center justify-center">
        <SignUp />
      </div>
    </main>
  );
}
