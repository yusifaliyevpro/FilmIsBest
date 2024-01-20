import LottieComponent from "./components/LottieAnimation";

export default function Home() {
  return (
    <main>
      <div className="relative mt-8 flex flex-col items-center justify-between pl-20 pr-20 lg:flex-row">
        <h1 className="relative mt-6 flex flex-col text-nowrap text-center text-2xl font-bold no-underline lg:mt-0 lg:text-4xl">
          Axtardığın bütün filmlər
          <br />
          filmisbest.com-da
        </h1>
        <div className="relative mt-12 flex h-74 w-74 lg:mt-0 lg:h-100 lg:w-100">
          <LottieComponent />
        </div>
      </div>
    </main>
  );
}
