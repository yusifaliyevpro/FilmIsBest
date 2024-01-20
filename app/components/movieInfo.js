import Image from "next/image"

export default function MovieInfo({movie}) {
    return(
        <div className="relative mx-auto mb-20 mt-3 flex h-max w-200 flex-row justify-between rounded-10 border border-solid border-gray-500 p-4">
        <div className="relative h-76 w-60 items-start justify-between justify-items-start">
          <Image
            src={movie.poster}
            alt={movie.filmName}
            width={240}
            height={360}
            priority
            placeholder="blur"
            blurDataURL="data:..."
            className="h-76 w-60 select-none rounded-10"
          />
        </div>
        <div className="relative ml-5 w-106 list-none rounded-10 tracking-normal">
          <li className="mt-4 w-fit font-bold text-gray-400 ">
            Filmin Adı:{" "}
            <span className="text-white">{movie.filmName.trim()}</span>
          </li>
          <li className="mt-4 w-fit font-bold text-gray-400">
            Ulduzlar:{" "}
            <span className="text-white">
              {movie.actors.trim().replace(/!/g, "•")}
            </span>
          </li>
          <li className="mt-4 w-fit font-bold text-gray-400">
            Kateqoriya:{" "}
            <span className="text-white">{movie.genre.join(", ")}</span>
          </li>
          <li className="mt-4 w-fit font-bold text-gray-400">
            Rejissor(lar):{" "}
            <span className="text-white">{movie.directed.trim()}</span>
          </li>
          <div className="relative mt-4 flex w-fit flex-row items-center gap-4">
            <Image
              src="/imdb.svg"
              width={40}
              height={40}
              alt="Imdb Logo"
              className="select-none"
            />
            <span className="font-bold text-white">{movie.imdbpuan}</span>
          </div>
          <li className="mt-4 w-fit font-bold text-gray-400">
            Filmin Təsviri:{" "}
            <span className="text-white">{movie.description.trim()}</span>
          </li>

          <div className="box-border flex list-none flex-row p-12 text-left">
            <li className=" box-border px-12 text-left font-bold text-gray-400">
              Vaxt
              <br />
              <span className="text-nowrap text-white">
                {movie.movieTime} dəq
              </span>
            </li>
            <li className=" box-border w-max px-12 text-left font-bold text-gray-400">
              İl
              <br />
              <span className="text-white">{movie.releaseDate}</span>
            </li>
            <li className=" box-border w-max text-balance px-8 text-left font-bold text-gray-400">
              Ölkə
              <br />
              <span className="text-white">{movie.country}</span>
            </li>
          </div>
        </div>
      </div>
    )
}