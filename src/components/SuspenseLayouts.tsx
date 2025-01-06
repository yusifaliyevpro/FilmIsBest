import { Button } from "@nextui-org/button";
import { BiLoaderAlt } from "react-icons/bi";

export default function SuspenseButton({
  color,
}: {
  color: "primary" | "default";
}) {
  return (
    <Button
      color={color}
      className={`text-md flex h-[2.5rem] w-[6.9rem] font-bold ${color}`}
    >
      <BiLoaderAlt className="animate-spin text-2xl" />
    </Button>
  );
}

export function LoadingPagination() {
  return (
    <div className="relative mt-5 flex animate-pulse rounded-xl bg-gray-200">
      <div className="h-[36px] w-[76px]"></div>
    </div>
  );
}

export function LoadingSearch() {
  return (
    <div className="mx-auto mb-4 mt-6 h-[44px] w-[300px] animate-pulse rounded-full bg-gray-200 sm:w-[500px]"></div>
  );
}
export function LoadingSequel() {
  return (
    <section className="mx-3 mb-8 flex min-h-56 flex-col rounded-10 shadow-medium sm:mx-auto sm:w-[836px]">
      <div className="rounded-t-10 bg-gray-200 p-3 pl-7 text-lg font-bold text-white">
        <p className="w-fit animate-pulse rounded-10 bg-gray-100 text-gray-100">
          Avengers Seriyası
        </p>
      </div>
      <div className="custom-scroolbar mx-5 my-2 flex flex-1 flex-row gap-x-2 overflow-x-scroll">
        {Array(4)
          .fill(4)
          .map((movie, i) => (
            <div key={i} className="mx-3 my-5">
              <div
                className={`justify-content-center relative inline-block min-h-[240px] w-[160px] select-none items-center justify-center rounded-xl text-center`}
              >
                <div>
                  <div className="relative">
                    <div className="h-[240px] w-[160px] animate-pulse rounded-10 bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export function LoadingMovies() {
  return (
    <div className="justify-content-center mx-2.5 flex flex-wrap items-center justify-center gap-x-10">
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="justify-content-center w-[260px]select-none relative mt-10 inline-block min-h-10 items-center justify-center rounded-xl bg-gray-200 text-center"
          >
            <div>
              <div className="relative">
                <div className="h-[380px] w-[260px] animate-pulse rounded-10 bg-gray-100 opacity-0"></div>
              </div>
              <div className="justify-content-center relative flex min-h-13 w-[250px] flex-col items-center justify-center text-center">
                <p className="ml-2 w-[200px] animate-pulse select-none truncate rounded-10 bg-gray-100 text-lg font-bold text-gray-100">
                  Movie Name
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export function LoadingMovieBar() {
  return (
    <div className="relative mx-auto mt-12 flex h-auto w-auto flex-col rounded-10 px-3 sm:h-[560px] sm:w-200">
      <div className="relative mb-1 h-[44px] min-w-max animate-pulse overflow-x-hidden rounded-2xl bg-gray-200 sm:mb-0 sm:w-[812px]"></div>
      <div className="z-35 relative bottom-0 left-0 mx-auto mt-0 h-60 w-full animate-pulse select-none rounded-b-10 border-none bg-gray-200 sm:absolute sm:h-102 sm:w-200"></div>
    </div>
  );
}
export function MovieInfoSuspense() {
  return (
    <div className="relative mx-3 mb-20 flex h-auto w-fit select-none flex-col items-center justify-center rounded-10 border border-solid border-slate-400 p-4 sm:mx-auto sm:flex-row sm:items-start sm:justify-between">
      <div className="relative mx-16 flex h-auto w-auto animate-pulse items-start justify-between justify-items-start rounded-10 bg-gray-200 sm:mx-0 sm:h-76 sm:w-60"></div>
      <div className="relative mx-auto w-auto list-none rounded-10 tracking-normal sm:ml-5 sm:w-105">
        <li className="mt-4 w-fit font-bold text-slate-400">
          Filmin Adı:{" "}
          <span className="animate-pulse rounded-10 bg-gray-200 text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </span>
        </li>
        <li className="mt-4 w-fit font-bold text-slate-400">
          Ulduzlar:{" "}
          <span className="animate-pulse rounded-10 bg-gray-200 text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </span>
        </li>
        <li className="mt-4 w-fit font-bold text-slate-400">
          Kateqoriya:{" "}
          <span className="animate-pulse rounded-10 bg-gray-200 text-gray-200">
            Lorem ipsum dolor sit amet
          </span>
        </li>
        <li className="mt-4 w-fit font-bold text-slate-400">
          Rejissor(lar):{" "}
          <span className="animate-pulse rounded-10 bg-gray-200 text-gray-200">
            Lorem İpsum
          </span>
        </li>
        <div className="relative mt-4 flex w-fit flex-row items-center gap-4">
          <div className="h-[43px] w-[43px] animate-pulse rounded-10 bg-gray-200"></div>
          <span className="animate-pulse rounded-10 bg-gray-200 text-gray-200">
            5.5
          </span>
        </div>
        <li className="mt-4 w-auto font-bold text-slate-400 sm:w-fit">
          Filmin Təsviri:{" "}
          <span className="animate-pulse rounded-10 bg-gray-200 text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            volutpat ullamcor urna a aliquam. Pellentesque habitant morbi
            tristique senectus et alsaune bornda debe alesuada fames ac turpis
            egestas. Praesent et urna aliquet, dapibus diam ac, faucibus elit.
            Vivamus id tortor risus. Suspendisse potenti. Nullam elementum ex id
            augue varius eros.
          </span>
        </li>

        <div className="left-0 mb-9 box-border flex list-none flex-row justify-around pt-12 text-left sm:mb-0 sm:p-12">
          <li className="box-border text-left font-bold text-slate-400 sm:px-12">
            Vaxt
            <br />
            <span className="animate-pulse text-nowrap rounded-10 bg-gray-200 text-gray-200">
              120 dəq
            </span>
          </li>
          <li className="box-border w-max text-left font-bold text-slate-400 sm:px-12">
            İl
            <br />
            <span className="animate-pulse rounded-10 bg-gray-200 text-gray-200">
              2024
            </span>
          </li>
          <li className="box-border w-max text-balance text-left font-bold text-slate-400 sm:px-8">
            Ölkə
            <br />
            <span className="animate-pulse rounded-10 bg-gray-200 text-gray-200">
              Birləşmiş Krallıq
            </span>
          </li>
        </div>
      </div>
    </div>
  );
}
