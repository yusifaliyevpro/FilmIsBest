import { SearchIcon } from "@sanity/icons";
import { InputProps, useFormValue } from "sanity";

export function SearchOnYoutube(props: InputProps) {
  const { renderDefault } = props;
  const filmName = useFormValue(["filmName"]) as string;
  const link = `https://www.youtube.com/results?search_query=${encodeURIComponent(filmName).trim().replace(/\s+/g, "+")}+official+trailer`;

  return (
    <div className="relative">
      {renderDefault(props)}
      <a
        type="button"
        href={link}
        target="_blank"
        className="absolute top-0 right-0 z-2000 flex h-[98%] w-10 cursor-pointer items-center justify-center rounded transition-all duration-200 hover:bg-gray-600/40"
      >
        <SearchIcon fontSize={28} />
      </a>
    </div>
  );
}
