"use client";
import React, { useState } from "react";

const EverSwapAbout = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#05110d",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#05110d",
            zIndex: 10,
            gap: "1rem",
            color: "#00f0ff",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "3px solid rgba(0, 240, 255, 0.15)",
              borderTopColor: "#00f0ff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span style={{ fontSize: "0.9rem", letterSpacing: "0.1em", fontWeight: "600" }}>
            LOADING 3D EXPERIENCE...
          </span>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      <iframe
        src="/everswap/index.html"
        title="3D Portfolio About"
        onLoad={() => setIsLoading(false)}
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
