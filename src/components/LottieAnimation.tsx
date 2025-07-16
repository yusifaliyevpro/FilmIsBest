"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottieComponent = ({ src }: { src: string }) => {
  return <DotLottieReact autoplay loop src={src} />;
};

export default LottieComponent;
