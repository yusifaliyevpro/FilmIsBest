"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function AnimatedText({
  text,
  className,
  once,
}: {
  text: string;
  className: string;
  once: boolean;
}) {
  const defaultAnimations = {
    hidden: {
      opacity: 0,
      x: 20,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.8, once });
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1 }}
        aria-hidden
      >
        {text.split(" ").map((word, index) => (
          <span className="inline-block" key={index}>
            {word.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={defaultAnimations}
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </p>
  );
}
