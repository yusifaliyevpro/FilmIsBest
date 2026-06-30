"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedText({ text, className, once }: { text: string; className: string; once: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold: 1 }, // amount: "all" — fire once the element is fully visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const words = text.split(" ");
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {words.map((word, index) => {
          const wordStart = words.slice(0, index).reduce((sum, w) => sum + w.length, 0);
          return (
            <span key={String(word + index)} className="inline-block">
              {word.split("").map((char, i) => {
                const delay = (wordStart + i) * 0.1;
                return (
                  <span
                    key={String(i + char)}
                    className="inline-block"
                    style={{
                      animation: isInView ? `text-char-in 0.2s ease-out ${delay}s both` : undefined,
                      opacity: isInView ? undefined : 0,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              <span className="inline-block">&nbsp;</span>
            </span>
          );
        })}
      </span>
    </p>
  );
}
