export default function Loading() {
  return (
    <main>
      <div className="relative mt-8 flex flex-col items-center justify-between pl-20 pr-20 lg:flex-row">
        <div>
          <h1 className=" relative mt-6 flex-col  text-nowrap  text-center text-2xl font-bold  no-underline lg:mt-0 lg:text-4xl">
            Axtardığın bütün filmlər &nbsp;
            <br />
            <p className="inline-block bg-gradient-to-r from-[rgba(0,67,181,1)] from-0% via-[rgba(10,107,222,1)] via-50%  to-[rgba(0,123,255,1)] to-100% bg-clip-text text-transparent">
              filmisbest.com-da
            </p>
          </h1>
          <div
            href={"/movies"}
            className="relative mx-auto mt-7 flex w-fit animate-pulse items-center rounded-[15px] bg-gray-200 p-3 text-center text-2xl font-bold text-gray-200 hover:bg-blue-700"
          >
            <p>Filmlər</p> <div>:D</div>
          </div>
        </div>
        <div className="relative mt-12 flex h-74 w-74 animate-pulse rounded-full bg-gray-200 lg:mt-0 lg:h-100 lg:w-100"></div>
      </div>
      <h2 className=" mt-10 w-full text-center text-3xl font-bold">
        Ən Son Əlavə Olunanlar
      </h2>
      <div className="relative w-full">
        <div className="relative mx-12 mb-32 mt-10 flex w-auto flex-row items-center justify-around sm:mx-20">
          {Array(4)
            .fill()
            .map((i) => (
              <div
                key={i}
                className="justify-content-center w-[260px]select-none relative inline-block min-h-10 items-center justify-center rounded-xl bg-gray-200 text-center"
              >
                <div>
                  <div className="relative">
                    <div className=" h-[380px] w-[260px] animate-pulse rounded-10 bg-gray-100 opacity-0"></div>
                  </div>
                  <div className="justify-content-center relative flex min-h-13 w-[250px] flex-col items-center justify-center text-center">
                    <p className="ml-2 w-[200px] animate-pulse truncate rounded-10 bg-gray-100 text-lg font-bold text-gray-100">
                      Movie Name
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
