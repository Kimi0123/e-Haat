import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingOverlay = ({
  isVisible = false,
  text = "Loading...",
  backdrop = true,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        backdrop ? "bg-black bg-opacity-50" : ""
      }`}
    >
      <div className="bg-white rounded-lg p-8 shadow-xl">
        <LoadingSpinner size="large" text={text} />
      </div>
    </div>
  );
};

export default LoadingOverlay;
