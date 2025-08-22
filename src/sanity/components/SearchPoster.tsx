import { SearchIcon } from "@sanity/icons";
import { ImageValue, ObjectFieldProps, useFormValue } from "sanity";

export function SearchPoster(props: ObjectFieldProps<ImageValue>) {
  const { renderDefault } = props;
  const filmName = useFormValue(["filmName"]) as string;
  const link = `https://www.google.com/search?q=${encodeURIComponent(filmName).trim().replace(/\s+/g, "+")}+poster+imdb&udm=2`;
  return (
    <div className="relative">
      {renderDefault(props)}
      <div className="relative flex flex-row items-center justify-end">
        <a
          href={link}
          target="_blank"
          className="my-5 flex cursor-pointer items-center justify-center rounded p-2 transition-all duration-200 hover:bg-gray-600/40"
        >
          <SearchIcon fontSize={28} />
        </a>
      </div>
    </div>
  );
}
