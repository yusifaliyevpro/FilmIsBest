import {
  LoadingMovies,
  LoadingPagination,
  LoadingSearch,
} from "@/components/SuspenseLayouts";

export default function Loading() {
  return (
    <section className="justify-content-center relative mx-auto mb-20 mt-6 flex flex-col items-center justify-center">
      <div className="sm:flx-row relative flex h-[140px] w-full flex-col items-center justify-center">
        <LoadingSearch />
        <LoadingPagination />
      </div>
      <LoadingMovies />
    </section>
  );
}
