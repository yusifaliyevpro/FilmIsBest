import { BASE_URL } from "@/lib/constants";
import { getMovie } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";
import { ImageResponse } from "next/og";

export const alt = "Movie Poster";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const movie = await getMovie(slug);
  if (!movie) {
    return null;
  }
  return new ImageResponse(
    (
      <div tw="relative flex flex-col bg-[#fff] justify-center w-full h-full items-center">
        <div tw="relative flex flex-row w-full justify-around">
          <img
            src={`${BASE_URL}/_next/image?url=${movie.poster}&w=640&q=75`}
            tw="w-[320px} h-[490px] rounded-[10px]"
            width={320}
            height={490}
            alt={movie.filmName || ""}
          />
          <div tw="relative w-[600px] flex flex-col mr-10 items-center justify-around text-xl font-bold">
            <h1 tw="relative flex h-auto w-auto font-bold text-5xl text-center">
              {movie.filmName}
            </h1>
            <div tw="relative flex bg-blue-600 p-7 text-3xl rounded-[10px] text-white font-bold">
              İndi İzləməyə Başla!
            </div>
            <div tw="relative flex flex-row items-center right-0 justify-around">
              <img
                width={70}
                alt="FilmIsBest Logo"
                height={70}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtWUsvA1EU/o5WbYQIQz3ikSiWXXZhx7+QeE2j/CGEmRLxM1hhbVOJGIlFPcIoG7tWrwyVTFvpzM090orbZe853znfY3LTKeGPf+iP7w9NoNkOagda0oHx5ad4e4QsQKQA6m3ukqIA0Jkol9LXe4Nu7S51EfKWj0XoXADx5i5eNz0fQyx5YXe/+E/qCCTS7iEEFlps+a91BHacrJFpTMB07wEMtiQBIO/YxmgQAeEvcGyDEqZ7BGDO9/0bFWnm6qDvzl8rUXcCYDYIzztPmG7dPtIEphafh0W7uATQ6Ws+dmxj3g8Wtm7CfB2LopQLwmMjUAHysrddFS1CxrGMnRoXwtWtuusgbIXAU3fge4hERMJGLjBKLBH6JhDWes46VgKfUfrBehJYu8oau1VRClk3mX7eICE2qx5MHx47gcrzEGg9V92vEOCMiEe0EZ4ygVa70Lx7Seoe0ASYFdAOMAsqDacdkJaMuUE7wCyoNJx2QFoy5gbtALOg0nDaAWnJmBu0A8yCSsNpB6QlY274Fw547zuHmIXjgSPcOZYxEvCb+GkfoCWeidwolHXsPrMhgcmVB4MomgOhn3u8It5tpNiRvDzoKjQk4B1Or7pD7wSrDUgJoEdxsGK7KBDotEjlzI018FgLpv+lVJRXuV07oCyhIoB2QFFA5fYPl3tmQEkVff8AAAAASUVORK5CYII="
              />
              <p tw="font-bold text-inherit text-5xl ml-2">FilmIsBest</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      height: 600,
      width: 1200,
    },
  );
}
