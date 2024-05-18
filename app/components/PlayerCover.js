import LottieComponent from "./LottieAnimation";

export default function PlayerCover({ handleCoverClick }) {
  return (
    <div
      onClick={handleCoverClick}
      className="z-35 relative bottom-0 left-0 mx-auto mt-0 flex h-60 w-full cursor-pointer select-none items-center justify-center rounded-b-10 border-none bg-black sm:absolute sm:h-102 sm:w-200"
    >
      <h1></h1>
      <div className="relative flex">
        <LottieComponent animationPath="/player.lottie" />
      </div>
    </div>
  );
}
