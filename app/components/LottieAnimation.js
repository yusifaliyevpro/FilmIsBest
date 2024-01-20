"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../public/Movieanm.json";

const LottieComponent = () => {
  return (
    <Lottie
      animationData={animationData} // Animation JSON data
      loop
      autoplay
    />
  );
};

export default LottieComponent;
