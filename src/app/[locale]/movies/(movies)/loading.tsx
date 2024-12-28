export default function Loading() {
  return (
    <section className="justify-content-center relative mx-auto mb-20 mt-6 flex flex-col items-center justify-center">
      <div className="sm:flx-row relative flex h-[140px] w-full flex-col items-center justify-center">
        <div>
          <div className="mx-auto mb-4 mt-6 h-[44px] w-[300px] animate-pulse rounded-full bg-gray-200 sm:w-[500px]"></div>
        </div>
        <div className="relative mt-5 flex animate-pulse rounded-xl bg-gray-200">
          <div className="h-[36px] w-[76px]"></div>
        </div>
      </div>
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
    </section>
  );
}
