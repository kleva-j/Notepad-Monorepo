"use client";

import loadingAnimation from "@/assets/loading.json";
import Lottie from "lottie-react";

export const LoadingSkeleton = () => {
  return <Lottie animationData={loadingAnimation} className="h-[10rem]" />;
};
