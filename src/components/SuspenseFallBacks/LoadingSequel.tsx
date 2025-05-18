export function LoadingSequel() {
  return (
    <section className="mx-3 mb-8 flex min-h-56 flex-col rounded-10 shadow-medium sm:mx-auto sm:w-[836px]">
      <div className="rounded-t-10 bg-gray-200 p-3 pl-7 text-lg font-bold text-white">
        <p className="w-fit animate-pulse rounded-10 bg-gray-100 text-gray-100">Avengers Seriyası</p>
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
