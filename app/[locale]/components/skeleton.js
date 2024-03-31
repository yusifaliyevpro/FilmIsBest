export default function Skeleton() {
  return (
    <div className="justify-content-center mx-2.5 flex flex-wrap items-center justify-center gap-x-10">
      {Array(20)
        .fill()
        .map((i) => (
          <div
            key={i}
            className="justify-content-center w-[260px]select-none relative mt-10 inline-block min-h-10 items-center justify-center rounded-xl bg-gray-200 text-center"
          >
            <div>
              <div className="relative">
                <div className="h-[380px] animate-pulse rounded-10" />
                <div className="absolute top-2.5 flex w-[260px] flex-row justify-around gap-36 p-2.5">
                  <div className="rounded-3xl bg-rdate px-1 text-center text-xs font-bold text-white"></div>
                  <div className="w-8 rounded-3xl bg-imdb text-center text-xs font-bold text-gray-100"></div>
                </div>
              </div>
              <div className="justify-content-center relative flex min-h-13 w-[250px] flex-col items-center justify-center text-center">
                <p className="w-[200px] truncate text-lg font-bold text-white hover:text-blue-800"></p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
