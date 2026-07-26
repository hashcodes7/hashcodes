"use client";
import { useEffect, useState } from "react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { Search } from "lucide-react";

export default function TocProgressBar() {
  const [progress, setProgress] = useState(0);
  const { setOpenSearch } = useSearchContext();

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        docHeight > 0
          ? Math.min(100, Math.round((scrollTop / docHeight) * 100))
          : 0;
      setProgress(pct);

      // Write scroll % as a CSS custom property on #nd-toc
      // so the ::after on #toc-title can display it inline with the heading
      const toc = document.getElementById("nd-toc");
      if (toc) toc.style.setProperty("--scroll-pct", `"${pct}%"`);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Render the new Search button on top, followed by the progress bar
  return (
    <>
      <button
        onClick={() => setOpenSearch(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "0.5rem 0.75rem",
          marginBottom: "1.25rem",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          color: "var(--text-secondary)",
          fontSize: "0.8rem",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.color = "var(--text-primary)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.color = "var(--text-secondary)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
      >
        <Search size={14} style={{ color: "#38bdf8" }} />
        <span>Search documentation...</span>
        <kbd
          style={{
            marginLeft: "auto",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.65rem",
            color: "var(--text-secondary)",
          }}
        >
          Ctrl K
        </kbd>
      </button>

      <div
        style={{
          height: "3px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "99px",
          overflow: "hidden",
          marginBottom: "0.85rem",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #06b6d4, #38bdf8)",
            borderRadius: "99px",
            transition: "width 0.15s ease",
          }}
        />
      </div>
    </>
  );
}
