"use client";
import { useState } from "react";
import Link from "next/link";
import { Brain, Monitor, Smartphone, Server, Code, ChevronRight } from "lucide-react";
import catalog from "../../../../learn.json";

const ICON_MAP = {
  ai: <Brain size={32} />,
  vision: <Monitor size={32} />,
  flutter: <Smartphone size={32} />,
  sys: <Server size={32} />,
  algo: <Code size={32} />,
};

export default function LearnLandingClient() {
  const [flippedIdx, setFlippedIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const handleCardClick = (idx) => {
    setFlippedIdx(flippedIdx === idx ? null : idx);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "8rem auto 4rem auto", padding: "0 2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "5rem" }}>
        <h2
          style={{
            fontSize: "3.2rem",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Learn & Explore
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Hover over or click any card to flip it and reveal the courses available in that topic.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          alignItems: "stretch",
        }}
      >
        {catalog.learn.map((cat, idx) => {
          const isFlipped = flippedIdx === idx || hoveredIdx === idx;
          const icon = ICON_MAP[cat.id] || <Code size={32} />;

          return (
            <div
              key={cat.id}
              onClick={() => handleCardClick(idx)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                perspective: "1000px",
                height: "360px",
                cursor: "pointer",
              }}
            >
              {/* Inner flipper wrapper */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isFlipped ? "rotateY(180deg)" : "none",
                }}
              >
                {/* CARD FRONT */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: "24px",
                    background: "rgba(255, 255, 255, 0.01)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    padding: "2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                    e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.01)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <div
                    style={{
                      color: "var(--accent-color)",
                      background: "rgba(0, 240, 255, 0.1)",
                      padding: "1.25rem",
                      borderRadius: "20px",
                      marginBottom: "1.5rem",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </div>

                  <div
                    style={{
                      background: "rgba(0, 240, 255, 0.08)",
                      color: "var(--accent-color)",
                      fontWeight: "800",
                      fontSize: "0.7rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      letterSpacing: "0.05em",
                      marginBottom: "1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {cat.badge || cat.id.toUpperCase()}
                  </div>

                  <h4
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      marginBottom: "0.75rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {cat.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {cat.description}
                  </p>
                </div>

                {/* CARD BACK */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "24px",
                    background: "rgba(0, 240, 255, 0.02)",
                    border: "1px solid rgba(0, 240, 255, 0.15)",
                    padding: "2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "stretch",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      marginBottom: "1.5rem",
                      color: "var(--accent-color)",
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Select Course
                  </h4>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      width: "100%",
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent reflipping when clicking a link
                  >
                    {cat.courses && cat.courses.length > 0 ? (
                      cat.courses.map((course) => {
                        const coursePath = `/learn/${course.folder}`;

                        return (
                          <Link
                            key={course.id}
                            href={coursePath}
                            style={{
                              padding: "0.75rem 1rem",
                              background: "rgba(255, 255, 255, 0.02)",
                              border: "1px solid rgba(255, 255, 255, 0.05)",
                              borderRadius: "12px",
                              color: "var(--text-secondary)",
                              fontSize: "0.9rem",
                              fontWeight: 600,
                              textDecoration: "none",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(0, 240, 255, 0.08)";
                              e.currentTarget.style.color = "var(--text-primary)";
                              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                              e.currentTarget.style.color = "var(--text-secondary)";
                              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                            }}
                          >
                            {course.title}
                            <ChevronRight size={14} />
                          </Link>
                        );
                      })
                    ) : (
                      <div style={{ color: "var(--text-secondary)", textAlign: "center", fontSize: "0.9rem" }}>
                        Courses coming soon!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
