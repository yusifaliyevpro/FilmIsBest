export default function MovieBar({movie}) {

    return(
        <div className="movie-container">
        <h1 className="relative top-0 z-0 m-auto mt-14 w-200 rounded-10 bg-namebg p-3 text-center text-2xl font-bold text-white">
          {movie.filmName}
        </h1>
        <div className="relative mx-auto mb-12 mt-8 h-105 w-200 items-center justify-center justify-items-center rounded-10 px-3">
          <ul className="absolute left-0 mx-auto flex h-12 w-200 select-none flex-row items-center justify-center justify-items-center rounded-t-10 bg-gray-100">
            <li
              key={"english"}
              className="relative ml-3 flex h-14 w-max cursor-pointer flex-row items-center justify-center justify-items-center rounded-t-10 bg-gray-200 px-8 text-center font-bold text-white"
            >
              Ingiliscə
            </li>
            <li
              key={"eng-sub"}
              className="relative ml-3 flex h-14 w-max cursor-pointer flex-row items-center justify-center justify-items-center rounded-t-10 bg-gray-100 px-8 text-center font-bold text-white"
            >
              Ingiliscə Altyazılı
            </li>
            <li
              key={"tur"}
              className="relative ml-3 flex h-14 w-max cursor-pointer flex-row items-center justify-center justify-items-center rounded-t-10 bg-gray-100 px-8 text-center font-bold text-white"
            >
              Türkçə
            </li>
            <li
              key={"tur-sub"}
              className="relative ml-3 flex h-14 w-max cursor-pointer flex-row items-center justify-center justify-items-center rounded-t-10 bg-gray-100 px-8 text-center font-bold text-white"
            >
              Türkçə Altyazılı
            </li>
            <li
              key={"fraqman"}
              className="relative ml-3 flex h-14 w-max cursor-pointer flex-row items-center justify-center justify-items-center rounded-t-10 bg-gray-100 px-8 text-center font-bold text-white"
            >
              Fraqman
            </li>
          </ul>
          <iframe
            className="absolute bottom-0 left-0 h-102 w-200 select-none rounded-b-10 border-none bg-black"
            src={"https://vidsrc.to/embed/movie/" + movie.imdbID}
          ></iframe>
        </div>
      </div>
    )
}