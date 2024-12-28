"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottieComponent = ({ animationPath }: { animationPath: string }) => {
  return <DotLottieReact src={animationPath} loop autoplay />;
};

export default LottieComponent;
