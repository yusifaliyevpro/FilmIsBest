"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";

const LottieComponent = ({ animationPath }) => {
  return <DotLottiePlayer src={animationPath} autoplay loop></DotLottiePlayer>;
};

export default LottieComponent;
