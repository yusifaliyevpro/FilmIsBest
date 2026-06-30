import { ViewTransition } from "react";
import type { ReactNode } from "react";

export default function Template({ children }: { children: Readonly<ReactNode> }) {
  return (
    <ViewTransition default="none" enter="page-enter" exit="page-exit">
      {children}
    </ViewTransition>
  );
}
