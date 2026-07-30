"use client";
import { useState, useEffect } from "react";
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
} from "lucide-react";
import { ARTICLES_DATA } from "@/data/articlesData";
import { PAPERS_DATA } from "@/data/papersData";
import ArticleReader from "./ArticleReader";

export const ArticlesPage = () => {
  const getArticleIdFromHash = () => {
    if (typeof window === "undefined") return null;
    const parts = window.location.hash.split("?");
    if (parts.length > 1) {
      const params = new URLSearchParams(parts[1]);
      return params.get("id");
    }
    return null;
  };

  const [selectedArticleId, setSelectedArticleId] = useState(
    getArticleIdFromHash(),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState(null);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const pageSize = 6;

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedArticleId(getArticleIdFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectArticle = (id) => {
    if (id) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = `#/articles?id=${id}`;
    } else {
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = `#/articles`;
    }
  };

  const handleNavigateToRelated = (id) => {
    if (PAPERS_DATA.some((p) => p.id === id)) {
      window.location.hash = `#/papers?id=${id}`;
    } else if (ARTICLES_DATA.some((a) => a.id === id)) {
      window.location.hash = `#/articles?id=${id}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const selectedArticle = ARTICLES_DATA.find((a) => a.id === selectedArticleId);

  const filteredArticles = activeTag
    ? ARTICLES_DATA.filter((a) => a.tags.includes(activeTag))
    : ARTICLES_DATA;

  const totalArticles = filteredArticles.length;
  const totalPages = Math.ceil(totalArticles / pageSize);

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const el = document.getElementById("all-articles-title");
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const allTags = Array.from(new Set(ARTICLES_DATA.flatMap((a) => a.tags)));
  const visibleTags = isTagsExpanded ? allTags : allTags.slice(0, 5);

  return (
    <section
      id="articles"
      className="section container"
      style={{ paddingTop: "8rem", minHeight: "80vh" }}
    >
      {!selectedArticle ? (
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
                Technical Articles & Blog
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
                Deep dive into machine learning, computer vision, and software
                engineering. Expert insights on AI, local LLMs, quantization,
                and practical implementation details from real-world projects.
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
                  { value: "12", label: "Published Articles" },
                  { value: "30+", label: "Target Technologies" },
                  { value: "2026", label: "Active Writing" },
                  { value: "100% Free", label: "Resource Guides" },
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
                <path
                  d="M70 60 H170 M70 90 H170 M70 120 H130 M70 150 H150"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M140 120 L160 140 L195 105"
                  stroke="#00f0ff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="160" cy="140" r="3" fill="#00f0ff" />
                <line
                  x1="60"
                  y1="190"
                  x2="180"
                  y2="190"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>

          {/* Section Divider with Line */}
          <div
            id="all-articles-title"
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
              All Articles{" "}
              {activeTag && (
                <span
                  style={{
                    color: "#06b6d4",
                    fontSize: "1.2rem",
                    fontWeight: "400",
                  }}
                >
                  ({activeTag})
                </span>
              )}
            </h2>
            <div
              style={{
                flexGrow: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.08)",
              }}
            />
          </div>

          {/* Tags Quick Filter Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <button
              onClick={() => {
                setActiveTag(null);
                setCurrentPage(1);
              }}
              style={{
                background:
                  activeTag === null ? "#06b6d4" : "rgba(255,255,255,0.02)",
                border: "1px solid var(--glass-border)",
                borderRadius: "8px",
                padding: "0.4rem 0.8rem",
                fontSize: "0.82rem",
                color: activeTag === null ? "#000" : "var(--text-primary)",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              All Topics
            </button>
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag);
                  setCurrentPage(1);
                }}
                style={{
                  background:
                    activeTag === tag ? "#06b6d4" : "rgba(255,255,255,0.02)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "8px",
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.82rem",
                  color: activeTag === tag ? "#000" : "var(--text-primary)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {tag}
              </button>
            ))}
            {allTags.length > 5 && (
              <button
                onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--accent-color)",
                  borderRadius: "8px",
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.82rem",
                  color: "var(--accent-color)",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent-color)";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--accent-color)";
                }}
              >
                {isTagsExpanded ? "Show less" : `+${allTags.length - 5}`}
              </button>
            )}
          </div>

          {/* Cards List Layout */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          >
            {paginatedArticles.map((article) => (
              <div
                key={article.id}
                className="glass-card"
                style={{
                  padding: "2.25rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "16px",
                  position: "relative",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
              >
                {/* Meta Row: Date, Duration, Icon Badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <Calendar size={14} strokeWidth={2.5} /> {article.date}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <Clock size={14} strokeWidth={2.5} /> {article.readTime}
                    </span>
                  </div>

                  {/* Article Icon Badge */}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "rgba(6, 182, 212, 0.08)",
                      border: "1px solid rgba(6, 182, 212, 0.15)",
                      color: "#06b6d4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BookOpen size={16} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => handleSelectArticle(article.id)}
                  style={{
                    fontSize: "1.45rem",
                    color: "var(--text-primary)",
                    fontWeight: "700",
                    marginBottom: "0.75rem",
                    lineHeight: "1.3",
                    cursor: "pointer",
                    width: "max-content",
                    maxWidth: "100%",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#06b6d4")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                >
                  {article.title}
                </h3>

                {/* Short Summary */}
                <p
                  style={{
                    fontSize: "0.94rem",
                    lineHeight: 1.5,
                    color: "var(--text-secondary)",
                    marginBottom: "1.5rem",
                    textAlign: "justify",
                  }}
                >
                  {article.summary}
                </p>

                {/* Bottom Actions Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                    paddingTop: "1rem",
                    marginTop: "0.5rem",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  {/* Tag Pills */}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                  >
                    {article.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        onClick={() => {
                          setActiveTag(tag);
                          setCurrentPage(1);
                        }}
                        style={{
                          background: "rgba(6, 182, 212, 0.06)",
                          border: "1px solid rgba(45, 212, 191, 0.15)",
                          color: "#2dd4bf",
                          fontSize: "0.74rem",
                          padding: "0.15rem 0.55rem",
                          borderRadius: "9999px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(6, 182, 212, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(6, 182, 212, 0.06)";
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSelectArticle(article.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#06b6d4",
                      fontWeight: "700",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
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
                    Read article{" "}
                    <ChevronRight
                      size={14}
                      style={{ transform: "translateY(0.5px)" }}
                    />
                  </button>
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
                {Math.min(totalArticles, currentPage * pageSize)} of{" "}
                {totalArticles} articles
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
        <ArticleReader
          article={selectedArticle}
          onBack={() => handleSelectArticle(null)}
          onNavigateToRelated={handleNavigateToRelated}
        />
      )}
    </section>
  );
};

export default ArticlesPage;
