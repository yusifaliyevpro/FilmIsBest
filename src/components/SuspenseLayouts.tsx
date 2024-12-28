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
