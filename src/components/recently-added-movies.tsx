"use client";

import { useEffect, useRef } from "react";
import MovieCard from "@/components/movie-card";
import type { RecentlyAddedMoviesQueryResult } from "@/sanity/types";

const STEP_MS = 2800;

export default function RecentlyAddedMovies({ movies }: { movies: RecentlyAddedMoviesQueryResult }) {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return undefined;

    const cardWidth = () => (el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth : 300);

    let dragging = false;
    let paused = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;

    // Rotate the same nodes across the edges so the strip loops without clones.
    const recycle = () => {
      const w = cardWidth();
      while (el.scrollLeft > 2 * w && el.firstElementChild) {
        el.append(el.firstElementChild);
        el.scrollLeft -= w;
        startLeft -= w;
      }
      while (el.scrollLeft < w && el.lastElementChild) {
        el.prepend(el.lastElementChild);
        el.scrollLeft += w;
        startLeft += w;
      }
    };

    // Keep one card parked off the left edge so back-dragging has content.
    if (el.lastElementChild) el.prepend(el.lastElementChild);
    el.scrollLeft = cardWidth();

    const step = () => {
      if (!paused) el.scrollBy({ left: cardWidth(), behavior: "smooth" });
    };
    const timer = setInterval(step, STEP_MS);

    const onScrollEnd = () => {
      if (dragging) return;
      recycle();
      const w = cardWidth();
      const target = Math.round(el.scrollLeft / w) * w;
      if (Math.abs(target - el.scrollLeft) > 0.5) el.scrollTo({ left: target, behavior: "smooth" });
    };

    const onPointerDown = (e: PointerEvent) => {
      paused = true;
      if (e.pointerType !== "mouse") return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startLeft - dx;
      recycle();
    };
    const onPointerUp = () => {
      paused = false;
      if (!dragging) return;
      dragging = false;
      const w = cardWidth();
      el.scrollTo({ left: Math.round(el.scrollLeft / w) * w, behavior: "smooth" });
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onDragStart = (e: Event) => e.preventDefault();
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      if (!dragging) paused = false;
    };

    el.addEventListener("scrollend", onScrollEnd);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      clearInterval(timer);
      el.removeEventListener("scrollend", onScrollEnd);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("dragstart", onDragStart);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="reveal-in-view relative h-auto w-full px-4 text-white">
      <div
        ref={scroller}
        className="marquee-viewport mx-auto mt-10 mb-32 flex cursor-grab touch-pan-x overflow-x-auto overflow-y-hidden py-6 select-none active:cursor-grabbing"
      >
        {movies.map((movie) => (
          <div key={movie.slug} className="w-auto shrink-0 px-5">
            <MovieCard movie={movie} isLazyLoad={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
