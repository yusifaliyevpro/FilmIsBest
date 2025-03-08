"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottieComponent = ({ animationPath }: { animationPath: string }) => {
  return <DotLottieReact autoplay loop src={animationPath} />;
};

export default LottieComponent;
