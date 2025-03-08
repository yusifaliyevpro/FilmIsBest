"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function Template({ children }: { children: Readonly<ReactNode> }) {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      initial={{ y: -100, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
