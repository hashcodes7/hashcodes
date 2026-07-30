"use client";
import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
} from "lucide-react";
import { PAPERS_DATA } from "@/data/papersData";
import { ARTICLES_DATA } from "@/data/articlesData";

const PaperReader = ({ paper, onBack, onNavigateToPaper }) => {
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
        ...paper.sections,
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
      } else if (paper.sections.length > 0) {
        setActiveSection(paper.sections[0].id);
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
  }, [paper]);

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
    ...paper.sections,
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
          ← Back to Papers
        </button>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <span
            className="glass-pill"
            style={{ width: "max-content", fontSize: "0.65rem" }}
          >
            {paper.category}
          </span>
          <h2
            style={{
              fontSize: "2.5rem",
              margin: "0.5rem 0 0.25rem 0",
              color: "var(--text-primary)",
              textAlign: "left",
            }}
          >
            {paper.title}
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              margin: 0,
            }}
          >
            {paper.authors} •{" "}
            <span style={{ color: "var(--accent-color)", fontWeight: "600" }}>
              {paper.published}
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
        {/* Left Column - Paper content */}
        <div
          ref={readerRef}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {paper.sections.map((sec) => (
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
              {paper.keyTakeaways.map((takeaway, idx) => (
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
              Explore other reviewed papers related to this research topic:
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {paper.relatedReading.map((ref) => (
                <button
                  key={ref.id}
                  onClick={() => onNavigateToPaper(ref.id)}
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

            {/* Custom teal Progress Bar */}
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

export const PapersPage = () => {
  const getPaperIdFromHash = () => {
    if (typeof window === "undefined") return null;
    const parts = window.location.hash.split("?");
    if (parts.length > 1) {
      const params = new URLSearchParams(parts[1]);
      return params.get("id");
    }
    return null;
  };

  const [selectedPaperId, setSelectedPaperId] = useState(getPaperIdFromHash());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPapers = PAPERS_DATA.length;
  const totalPages = Math.ceil(totalPapers / pageSize);

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedPaperId(getPaperIdFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectPaper = (id) => {
    if (id) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = `#/papers?id=${id}`;
    } else {
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = `#/papers`;
    }
  };

  const handleNavigateToRelated = (id) => {
    if (PAPERS_DATA.some((p) => p.id === id)) {
      window.location.hash = `#/papers?id=${id}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (ARTICLES_DATA.some((a) => a.id === id)) {
      window.location.hash = `#/articles?id=${id}`;
    }
  };

  const selectedPaper = PAPERS_DATA.find((p) => p.id === selectedPaperId);

  const paginatedPapers = PAPERS_DATA.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const el = document.getElementById("all-reviews-title");
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="papers"
      className="section container"
      style={{ paddingTop: "8rem", minHeight: "80vh" }}
    >
      {!selectedPaper ? (
        <>
          {/* Header Card Block */}
          <div
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              padding: "2.5rem 3rem",
              marginBottom: "4rem",
              boxShadow: "0 8px 32px var(--glass-shadow)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
              position: "relative",
              overflow: "hidden",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: "1 1 60%",
                minWidth: "280px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "2.6rem",
                  fontWeight: "800",
                  color: "var(--text-primary)",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Machine Learning Paper Reviews
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.98rem",
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: "580px",
                }}
              >
                Expert analysis and in-depth reviews of machine learning
                research papers. Covering computer vision, deep learning, and AI
                innovations with practical insights.
              </p>

              {/* Stat Counters Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "1.5rem",
                  marginTop: "1.5rem",
                }}
              >
                {[
                  { value: "7", label: "Paper Reviews" },
                  { value: "10+", label: "Topics Covered" },
                  { value: "2006-2025", label: "Years Span" },
                  { value: "20+", label: "Unique Authors" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.15rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "800",
                        color: "#00f0ff",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        fontWeight: "500",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Illustration */}
            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="navbar-pill-links"
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.85 }}
              >
                <rect
                  x="40"
                  y="20"
                  width="160"
                  height="200"
                  rx="16"
                  fill="rgba(255, 255, 255, 0.01)"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                />
                <rect
                  x="60"
                  y="45"
                  width="80"
                  height="12"
                  rx="4"
                  fill="#00f0ff"
                  opacity="0.3"
                />
                <rect
                  x="60"
                  y="68"
                  width="120"
                  height="6"
                  rx="3"
                  fill="rgba(255, 255, 255, 0.2)"
                />
                <line
                  x1="60"
                  y1="90"
                  x2="180"
                  y2="90"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="60"
                  y1="102"
                  x2="150"
                  y2="102"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 60 170 Q 90 130 120 155 T 180 120"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="155" r="4" fill="#00f0ff" />
                <circle cx="180" cy="120" r="4" fill="var(--accent-color)" />
                <line
                  x1="60"
                  y1="190"
                  x2="180"
                  y2="190"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="80"
                  cy="190"
                  r="3"
                  fill="rgba(255, 255, 255, 0.25)"
                />
                <circle
                  cx="140"
                  cy="190"
                  r="3"
                  fill="rgba(255, 255, 255, 0.25)"
                />
              </svg>
            </div>
          </div>

          {/* Section Divider with Line */}
          <div
            id="all-reviews-title"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "2.5rem",
              scrollMarginTop: "100px",
            }}
          >
            <h2
              style={{
                fontSize: "1.65rem",
                fontWeight: "800",
                color: "var(--text-primary)",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              All Paper Reviews
            </h2>
            <div
              style={{
                flexGrow: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.08)",
              }}
            />
          </div>

          {/* Cards Grid */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "2rem" }}
          >
            {paginatedPapers.map((paper) => (
              <div
                key={paper.id}
                className="glass-card"
                style={{
                  padding: "2.25rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "16px",
                }}
              >
                {/* Meta Row: Date, Duration, Year Badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Calendar size={13} strokeWidth={2.5} /> {paper.date}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Clock size={13} strokeWidth={2.5} /> {paper.readTime}
                    </span>
                  </div>
                  <span
                    style={{
                      background: "rgba(6, 182, 212, 0.1)",
                      border: "1px solid rgba(6, 182, 212, 0.25)",
                      color: "#06b6d4",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "6px",
                    }}
                  >
                    {paper.published}
                  </span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => handleSelectPaper(paper.id)}
                  style={{
                    fontSize: "1.35rem",
                    color: "var(--text-primary)",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    lineHeight: "1.3",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#06b6d4")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                >
                  {paper.title}
                </h3>

                {/* Tag Pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem 0.5rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {paper.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        background: "rgba(6, 182, 212, 0.06)",
                        border: "1px solid rgba(45, 212, 191, 0.15)",
                        color: "#2dd4bf",
                        fontSize: "0.74rem",
                        padding: "0.15rem 0.55rem",
                        borderRadius: "9999px",
                        fontWeight: "500",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Short Summary */}
                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    color: "var(--text-secondary)",
                    marginBottom: "1.75rem",
                    flexGrow: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {paper.summary}
                </p>

                {/* Bottom Actions Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                    paddingTop: "1rem",
                    marginTop: "auto",
                  }}
                >
                  <button
                    onClick={() => handleSelectPaper(paper.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#06b6d4",
                      fontWeight: "700",
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                      padding: 0,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#2dd4bf")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#06b6d4")
                    }
                  >
                    Read review{" "}
                    <ChevronRight
                      size={14}
                      style={{ transform: "translateY(0.5px)" }}
                    />
                  </button>

                  <a
                    href={paper.originalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.88rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    Original Paper <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Custom styled pagination bar */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "4rem",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  fontWeight: "500",
                }}
              >
                Showing {(currentPage - 1) * pageSize + 1}-
                {Math.min(totalPapers, currentPage * pageSize)} of {totalPapers}{" "}
                papers
              </span>

              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--glass-border)",
                    color:
                      currentPage === 1
                        ? "rgba(255,255,255,0.2)"
                        : "var(--text-primary)",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background:
                          currentPage === pageNum
                            ? "#2563eb"
                            : "rgba(255, 255, 255, 0.02)",
                        border:
                          currentPage === pageNum
                            ? "1px solid #3b82f6"
                            : "1px solid rgba(255, 255, 255, 0.08)",
                        color: "var(--text-primary)",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      {pageNum}
                    </button>
                  ),
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--glass-border)",
                    color:
                      currentPage === totalPages
                        ? "rgba(255,255,255,0.2)"
                        : "var(--text-primary)",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <PaperReader
          paper={selectedPaper}
          onBack={() => handleSelectPaper(null)}
          onNavigateToPaper={handleNavigateToRelated}
        />
      )}
    </section>
  );
};

export default PapersPage;
