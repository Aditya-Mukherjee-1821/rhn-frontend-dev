import React from "react";

export const LoadingBar = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "10px",
        background: "lightgray",
        position: "absolute",
        bottom: "0",
        overflow: "hidden",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}
    >
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          style={{
            width: "50%" /* Made bars longer */,
            height: "100%",
            background: "rgb(32, 136, 219)",
            position: "absolute",
            bottom: "0" /* Build from bottom to top */,
            left: "-50%" /* Adjusted left positioning */,
            borderRadius: "10px" /* Apply border-radius to all corners */,
            animation: `loading-bars 4s ${
              index * 2
            }s infinite ease-in-out` /* Slowed down speed for more fluidity */,
          }}
        ></div>
      ))}
      <style>
        {`@keyframes loading-bars {
            0% { left: -50%; opacity: 0.6; }
            50% { opacity: 1; }
            100% { left: 100%; opacity: 0.6; }
          }`}
      </style>
    </div>
  );
};
