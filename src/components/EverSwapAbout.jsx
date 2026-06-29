import React from "react";

const EverSwapAbout = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#05110d", // Match the dark background of the 3D project
      }}
    >
      <iframe
        src="/everswap/index.html"
        title="3D Portfolio About"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
};

export default EverSwapAbout;
