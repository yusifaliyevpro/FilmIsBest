"use client";
import React from "react";
import Lottie from "lottie-react";

const LottieComponent = ({ animationData }) => {
  return (
    <Lottie
      animationData={animationData} // Animation JSON data
      loop
      autoplay
    />
  );
};

export default LottieComponent;
