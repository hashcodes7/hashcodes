"use client";
import { RootProvider } from "fumadocs-ui/provider/next";

// Suppress React 19/next-themes false positive console warning
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const orig = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
      return;
    }
    orig.apply(console, args);
  };
}

export function FumadocsProvider({ children }) {
  return <RootProvider>{children}</RootProvider>;
}
