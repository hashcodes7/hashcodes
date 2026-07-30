"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { ARTICLES_DATA } from "@/data/articlesData";

const ArticleReader = ({ article, onBack, onNavigateToRelated }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const readerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!readerRef.current) return;
      const rect = readerRef.current.getBoundingClientRect();

      const start = rect.top + window.scrollY - 120;
      const end = rect.bottom + window.scrollY - window.innerHeight;
      const range = end - start;

      let percent;
      if (range > 0) {
        percent = Math.min(
          100,
          Math.max(0, Math.round(((window.scrollY - start) / range) * 100)),
        );
      } else {
        percent = window.scrollY > start ? 100 : 0;
      }
      setScrollPercent(percent);

      let currentActive = "";
      const allSections = [
        ...article.sections,
        { id: "key-takeaways" },
        { id: "related-reading" },
      ];

      allSections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top < window.innerHeight * 0.4) {
            currentActive = sec.id;
          }
        }
      });
      if (currentActive) {
        setActiveSection(currentActive);
      } else if (article.sections.length > 0) {
        setActiveSection(article.sections[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [article]);

  const handleIndexClick = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const sidebarStyle = isMobile
    ? {
      position: "fixed",
      bottom: "1.5rem",
      left: "1.5rem",
      right: "1.5rem",
      zIndex: 1000,
      background: "rgba(15, 15, 15, 0.9)",
      backdropFilter: "blur(20px)",
      border: "1px solid var(--glass-border)",
      borderRadius: "16px",
      padding: "1.25rem",
      boxShadow: "0 8px 32px var(--glass-shadow)",
      maxHeight: isExpanded ? "60vh" : "auto",
      overflowY: isExpanded ? "auto" : "hidden",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }
    : {
      position: "sticky",
      top: "8rem",
      alignSelf: "start",
      zIndex: 10,
      background: "var(--glass-bg)",
      backdropFilter: "blur(16px)",
      border: "1px solid var(--glass-border)",
      borderRadius: "16px",
      padding: "1.25rem",
      boxShadow: "0 8px 32px var(--glass-shadow)",
      width: "100%",
      maxHeight: "calc(100vh - 12rem)",
      overflowY: "auto",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    };

  const indexSections = [
    ...article.sections,
    { id: "key-takeaways", title: "Key Takeaways" },
    { id: "related-reading", title: "Related Reading" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: "1px solid var(--glass-border)",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            color: "var(--text-primary)",
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-color)";
            e.currentTarget.style.color = "var(--accent-color)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--glass-border)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          ← Back to Articles
        </button>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <span
            className="glass-pill"
            style={{ width: "max-content", fontSize: "0.65rem" }}
          >
            {article.category}
          </span>
          <h2
            style={{
              fontSize: "2.5rem",
              margin: "0.5rem 0 0.25rem 0",
              color: "var(--text-primary)",
              textAlign: "left",
            }}
          >
            {article.title}
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              margin: 0,
            }}
          >
            By {article.authors} •{" "}
            <span style={{ color: "var(--accent-color)", fontWeight: "600" }}>
              {article.date}
            </span>
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "70% 30%",
          gap: "2rem",
          marginTop: "1.5rem",
        }}
      >
        {/* Left Column - Article content */}
        <div
          ref={readerRef}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {article.sections.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              style={{ marginBottom: "3.5rem", scrollMarginTop: "120px" }}
            >
              <h3
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "1rem",
                  color: "var(--text-primary)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  paddingBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    width: "4px",
                    height: "1.6rem",
                    background: "var(--accent-color)",
                    borderRadius: "2px",
                  }}
                />
                {sec.title}
              </h3>
              <p
                style={{
                  fontSize: "1.02rem",
                  lineHeight: "1.75",
                  color: "var(--text-secondary)",
                  whiteSpace: "pre-line",
                  textAlign: "justify",
                }}
              >
                {sec.content}
              </p>
            </div>
          ))}

          {/* Key Takeaways Section */}
          <div
            id="key-takeaways"
            style={{ marginBottom: "3.5rem", scrollMarginTop: "120px" }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                marginBottom: "1rem",
                color: "var(--text-primary)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "1.6rem",
                  background: "var(--accent-color)",
                  borderRadius: "2px",
                }}
              />
              Key Takeaways
            </h3>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--text-secondary)",
                lineHeight: "1.8",
                fontSize: "1.02rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} style={{ textAlign: "justify" }}>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>

          {/* Related Reading Section */}
          <div
            id="related-reading"
            style={{ marginBottom: "3.5rem", scrollMarginTop: "120px" }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                marginBottom: "1rem",
                color: "var(--text-primary)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "1.6rem",
                  background: "var(--accent-color)",
                  borderRadius: "2px",
                }}
              />
              Related Reading
            </h3>
            <p
              style={{
                fontSize: "1.02rem",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                marginBottom: "1rem",
              }}
            >
              Explore other content related to this topic:
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {article.relatedReading.map((ref) => (
                <button
                  key={ref.id}
                  onClick={() => onNavigateToRelated(ref.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#06b6d4",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "0.98rem",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontWeight: "600",
                    width: "max-content",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#2dd4bf")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#06b6d4")
                  }
                >
                  <ChevronRight size={14} /> {ref.title}
                </button>
              ))}
            </div>
          </div>
          {/* Pagination Navigation */}
          <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
            {(() => {
              const articleIndex = ARTICLES_DATA.findIndex(a => a.id === article.id);
              const prevArticle = articleIndex > 0 ? ARTICLES_DATA[articleIndex - 1] : null;
              const nextArticle = articleIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[articleIndex + 1] : null;
              return (
                <>
                  <div style={{ width: "50%" }}>
                    {prevArticle && (
                      <button
                        onClick={() => onNavigateToRelated(prevArticle.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "0.25rem",
                          width: "100%",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: "500", marginLeft: "1.5rem" }}>
                          Previous
                        </span>
                        <span style={{ color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <ChevronLeft size={18} /> {prevArticle.title}
                        </span>
                      </button>
                    )}
                  </div>
                  <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    {nextArticle && (
                      <button
                        onClick={() => onNavigateToRelated(nextArticle.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          textAlign: "right",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "0.25rem",
                          width: "100%",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: "500", marginRight: "1.5rem" }}>
                          Next
                        </span>
                        <span style={{ color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {nextArticle.title} <ChevronRight size={18} />
                        </span>
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>

        </div>

        {/* Right Column - Expandable scroll-spy widget */}
        <div style={isMobile ? {} : { position: "relative" }}>
          <div style={sidebarStyle}>
            {/* Widget Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  letterSpacing: "0.05em",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ON THIS PAGE
                <span
                  style={{
                    color: "#06b6d4",
                    fontSize: "0.85rem",
                    fontWeight: "800",
                  }}
                >
                  {scrollPercent}%
                </span>
              </span>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>

            {/* Custom Progress Bar */}
            <div
              style={{
                height: "4px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "2px",
                overflow: "hidden",
                margin: "0.75rem 0 0.5rem 0",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${scrollPercent}%`,
                  background:
                    "linear-gradient(90deg, #06b6d4, var(--accent-color))",
                  transition: "width 0.1s ease",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* Section Index List */}
            {isExpanded && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  marginTop: "1.25rem",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingLeft: "0.25rem",
                }}
              >
                {indexSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => handleIndexClick(sec.id, e)}
                      style={{
                        display: "block",
                        padding: "0.3rem 0 0.3rem 0.75rem",
                        fontSize: "0.88rem",
                        lineHeight: "1.4",
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                        fontWeight: isActive ? "700" : "400",
                        borderLeft: "2px solid",
                        borderColor: isActive ? "#06b6d4" : "transparent",
                        marginLeft: "-1px",
                        transition: "all 0.2s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      {sec.title}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleReader;
