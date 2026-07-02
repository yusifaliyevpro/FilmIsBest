"use client";

import { useTranslations } from "next-intl";
import { useDebounce } from "use-debounce";
import { Input } from "@heroui/input";
import { useEffect, useRef, useState, useTransition } from "react";
import { BiLoaderAlt, BiSearch } from "react-icons/bi";
import SanityImage from "@/components/sanity-image";
import { searchMovies } from "@/data/sanity/movies/search";
import { AllMoviesQueryResult } from "@/sanity/types";
import { Link } from "@/i18n/navigation";

export default function Search() {
  const t = useTranslations("Movies.Search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AllMoviesQueryResult>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [debouncedQuery] = useDebounce(query, 300);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Fetch matches on the server whenever the debounced query changes. The
  // `active` guard drops stale responses that resolve out of order.
  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) return;

    let active = true;
    startTransition(async () => {
      const movies = await searchMovies(trimmed);
      if (active) {
        setResults(movies);
        setActiveIndex(0);
      }
    });

    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  // Keep the keyboard-highlighted option scrolled into view.
  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      // Trigger the highlighted link's own navigation (keeps locale handling).
      itemRefs.current[activeIndex]?.click();
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // Close the dropdown when clicking outside of the search bar.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = open && query.trim().length > 0;
  // True while the request is in flight (isPending) or still waiting for the
  // debounce to settle on the latest input, so we never flash "no result"
  // before a search has actually completed.
  const isLoading = isPending || query.trim() !== debouncedQuery.trim();

  return (
    <div ref={containerRef} className="relative mx-auto mt-6 mb-4 w-auto sm:w-125">
      <Input
        placeholder={t("placeholder")}
        radius="full"
        size="lg"
        startContent={<BiSearch className="text-[1.7rem] font-bold" />}
        type="search"
        value={query}
        variant="bordered"
        classNames={{
          base: "h-11 bg-gray-800 sm:max-w-400",
          mainWrapper: "h-full bg-gray-800 dark:border-[#121827]!",
          input: "text-md bg-gray-800 text-small font-bold",
          inputWrapper: "h-full bg-gray-800 font-normal text-white dark:bg-gray-800",
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        onValueChange={(value) => {
          setQuery(value);
          if (!value.trim()) setResults([]);
        }}
      />

      <div
        aria-hidden={!showDropdown}
        className={`absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border-2 border-gray-700 bg-gray-800 shadow-xl transition-all duration-200 ease-out ${
          showDropdown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {results.length > 0 ? (
          <ul className="dropdown-scroolbar max-h-100 scrollbar-gutter-stable overflow-y-auto py-1">
            {results.map((movie, index) => (
              <li key={movie.slug}>
                <Link
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className={`flex items-center gap-3 px-3 py-2 transition-colors ${
                    index === activeIndex ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                  href={`/movies/${movie.slug}`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <SanityImage
                    src={movie.poster!}
                    width={46}
                    height={68}
                    quality={100}
                    alt={`${movie.filmName} movie poster`}
                    placeholder="blur"
                    blurDataURL={movie.posterlqip!}
                    className="aspect-2/3 w-11.5 shrink-0 rounded-md"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-bold text-white">{movie.filmName}</span>
                    <span className="text-xs font-medium text-gray-400">{movie.releaseDate}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : isLoading ? (
          <div className="flex items-center justify-center px-4 py-4">
            <BiLoaderAlt className="animate-spin text-xl text-gray-400" />
          </div>
        ) : (
          <p className="px-4 py-3 text-sm font-medium text-gray-400">{t("noResultMessage")}</p>
        )}
      </div>
    </div>
  );
}
