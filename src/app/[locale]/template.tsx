"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function Template({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
    >
      {children}
    </motion.div>
  );
}
