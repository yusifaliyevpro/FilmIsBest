"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LottieComponent({ src }: { src: string }) {
  return <DotLottieReact autoplay loop src={src} />;
}
