"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottieComponent = ({ animationPath }) => {
  return <DotLottieReact src={animationPath} autoplay loop></DotLottieReact>;
};

export default LottieComponent;
