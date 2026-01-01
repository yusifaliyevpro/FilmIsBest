export default function Loading() {
  return (
    <section>
      <div className="select-none sm:relative sm:flex sm:w-auto sm:flex-col sm:items-center">
        <h1 className="relative top-0 z-0 m-auto mx-5 mt-14 w-auto animate-pulse rounded-xl bg-gray-900 p-3 text-center text-2xl font-bold text-gray-900 sm:mx-auto sm:w-209">
          Lorem Ipsum Dolor Amet
        </h1>
        <div className="relative mx-auto mt-12 flex h-auto w-auto flex-col rounded-xl px-3 sm:h-140 sm:w-209">
          <div className="relative mb-1 h-11 min-w-max animate-pulse overflow-x-hidden rounded-2xl bg-gray-900 sm:mb-0 sm:w-203"></div>
          <div className="rounded-b-10 relative bottom-0 left-0 z-35 mx-auto mt-0 h-60 w-full animate-pulse border-none bg-gray-900 select-none sm:absolute sm:h-125 sm:w-209"></div>
        </div>
        <div className="relative mx-3 my-6 flex w-auto flex-row justify-end sm:w-209">
          <div className="h-12 w-35 animate-pulse rounded-2xl bg-gray-900"></div>
        </div>
      </div>
      <div className="relative mx-3 mb-20 flex h-auto w-fit flex-col items-center justify-center rounded-xl border border-solid border-slate-400 p-4 select-none sm:mx-auto sm:flex-row sm:items-start sm:justify-between">
        <div className="relative mx-16 flex h-auto w-auto animate-pulse items-start justify-between justify-items-start rounded-xl bg-gray-900 sm:mx-0 sm:h-90 sm:w-60"></div>
        <div className="relative mx-auto w-auto list-none rounded-xl tracking-normal sm:ml-5 sm:w-137.5">
          <li className="mt-4 w-fit animate-pulse rounded-xl bg-gray-900 font-bold text-gray-900">
            Filmin Adı: <span className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
          </li>
          <li className="mt-4 w-fit animate-pulse rounded-xl bg-gray-900 font-bold text-gray-900">
            Ulduzlar: <span className="">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
          </li>
          <li className="mt-4 w-fit animate-pulse rounded-xl bg-gray-900 font-bold text-gray-900">
            Kateqoriya: <span className="">Lorem ipsum dolor sit amet</span>
          </li>
          <li className="mt-4 w-fit animate-pulse rounded-xl bg-gray-900 font-bold text-gray-900">
            Rejissor(lar): <span className="">Lorem İpsum</span>
          </li>
          <div className="relative mt-4 flex w-fit animate-pulse flex-row items-center gap-4 rounded-xl bg-gray-900 text-gray-900">
            <div className="size-10.75 animate-pulse rounded-xl bg-gray-900"></div>
            <span className="">5.5</span>
          </div>
          <li className="mt-4 w-auto animate-pulse rounded-xl bg-gray-900 font-bold text-gray-900 sm:w-fit">
            Filmin Təsviri:{" "}
            <span className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat ullamcor urna a
              aliquam. Pellentesque habitant morbi tristique senectus et alsaune bornda debe alesuada fames ac
              turpis egestas. Praesent et urna aliquet, dapibus diam ac, faucibus elit. Vivamus id tortor
              risus. Suspendisse potenti. Nullam elementum ex id augue varius eros.
            </span>
          </li>

          <div className="left-0 mb-9 box-border flex list-none flex-row justify-around pt-12 text-left sm:mb-0 sm:p-12">
            <li className="box-border animate-pulse rounded-xl bg-gray-900 text-left font-bold text-nowrap text-gray-900 sm:px-12">
              Vaxt
              <br />
              <span className="">120 dəq</span>
            </li>
            <li className="box-border w-max animate-pulse rounded-xl bg-gray-900 text-left font-bold text-gray-900 sm:px-12">
              İl
              <br />
              <span className="">2024</span>
            </li>
            <li className="box-border w-max animate-pulse rounded-xl bg-gray-900 text-left font-bold text-balance text-gray-900 sm:px-8">
              Ölkə
              <br />
              <span className="">Birləşmllıq</span>
            </li>
          </div>
        </div>
      </div>
    </section>
  );
}
