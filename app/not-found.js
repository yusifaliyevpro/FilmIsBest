import LottieComponent from "./components/LottieAnimation";
import animation from "../public/404.json";

export const metadata = {
  title: "FilmIsBest | 404 Not Found",
  description: "Axtardığınız səhifə mövcud deyil",
  creator: "Yusif Aliyev",
  url: "https://filmisbest.com",
  siteName: "FilmIsBest",
  openGraph: {
    description: "Axtardığınız səhifə mövcud deyil",
    type: "website",
    url: "https://filmisbest.com",
  },
};

export default function NotFound() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <div className="relative mx-3 mt-8 flex h-full flex-col sm:mt-3">
        <LottieComponent animationData={animation} />
      </div>
      <h1 className="relative mx-7 mt-4 text-center text-2xl font-bold sm:text-3xl">
        The page you're looking for was not found
      </h1>
    </div>
  );
}
