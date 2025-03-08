import LottieComponent from "./LottieAnimation";

export default function PlayerCover({ handleCoverClick }: { handleCoverClick: () => void }) {
  return (
    <div
      className="z-35 relative bottom-0 left-0 mx-auto mt-0 flex h-60 w-full cursor-pointer select-none items-center justify-center rounded-b-10 border-none bg-black sm:absolute sm:h-102 sm:w-200"
      onClick={handleCoverClick}
    >
      <h1></h1>
      <div className="relative flex">
        <LottieComponent animationPath="https://lottie.host/3dc9d371-546d-42a7-a1b4-1a36310031ba/g8bEpebCIh.lottie" />
      </div>
    </div>
  );
}
