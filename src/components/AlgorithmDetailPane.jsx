import { useState } from "react";
import { Clock, Layers, Cpu, Code } from "lucide-react";
import {
  ALGORITHM_DETAILS,
  COMPARISONS_DATA,
  getComparisonData,
} from "../data/AlgorithmsData";

const TickIcon = () => (
  <span
    style={{
      color: "#10b981",
      background: "rgba(16, 185, 129, 0.08)",
      border: "1px solid rgba(16, 185, 129, 0.2)",
      padding: "0.2rem 0.5rem",
      borderRadius: "6px",
      fontSize: "0.75rem",
      fontWeight: 700,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.25rem",
    }}
  >
    ✓ Yes
  </span>
);

const CrossIcon = () => (
  <span
    style={{
      color: "#ef4444",
      background: "rgba(239, 68, 68, 0.08)",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      padding: "0.2rem 0.5rem",
      borderRadius: "6px",
      fontSize: "0.75rem",
      fontWeight: 700,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.25rem",
    }}
  >
    ✗ No
  </span>
);

const getFallbackDetails = (name, cat) => ({
  category: cat,
  bestComplexity: "N/A",
  avgComplexity: "N/A",
  worstComplexity: "N/A",
  spaceComplexity: "N/A",
  description: "Details coming soon.",
  lang: "text",
  code: "// Not implemented",
  applications: [],
});

export const AlgorithmDetailPane = ({ selectedAlgo, parentCat }) => {
  const [activeDetailTab, setActiveDetailTab] = useState("details");
  const details =
    ALGORITHM_DETAILS[selectedAlgo] ||
    getFallbackDetails(selectedAlgo, parentCat);
  const comparison =
    getComparisonData(details.category || parentCat, selectedAlgo) ||
    COMPARISONS_DATA[0];

  const renderCell = (val) => {
    if (typeof val === "boolean") {
      return val ? <TickIcon /> : <CrossIcon />;
    }
    return (
      <code
        style={{
          color: "var(--text-primary)",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          background: "rgba(255,255,255,0.03)",
          padding: "0.25rem 0.5rem",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {val}
      </code>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "500px",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.03))",
          border: "1px solid var(--glass-border)",
          borderRadius: "16px",
          padding: "2rem",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Tab switcher at the top of detail pane */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            paddingBottom: "0.5rem",
          }}
        >
          <button
            onClick={() => setActiveDetailTab("details")}
            style={{
              background: "transparent",
              border: "none",
              borderBottom:
                activeDetailTab === "details"
                  ? "2px solid var(--accent-color)"
                  : "2px solid transparent",
              color:
                activeDetailTab === "details"
                  ? "var(--accent-color)"
                  : "var(--text-secondary)",
              padding: "0.25rem 0.5rem",
              fontSize: "0.9rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Details & Code
          </button>
          <button
            onClick={() => setActiveDetailTab("compare")}
            style={{
              background: "transparent",
              border: "none",
              borderBottom:
                activeDetailTab === "compare"
                  ? "2px solid var(--accent-color)"
                  : "2px solid transparent",
              color:
                activeDetailTab === "compare"
                  ? "var(--accent-color)"
                  : "var(--text-secondary)",
              padding: "0.25rem 0.5rem",
              fontSize: "0.9rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Peer Comparison
          </button>
        </div>

        {activeDetailTab === "details" ? (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                paddingBottom: "1.25rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--accent-color)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {details.category}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginTop: "0.25rem",
                    flexWrap: "wrap",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      margin: 0,
                      color: "#fff",
                    }}
                  >
                    {selectedAlgo}
                  </h4>
                  {[
                    "Binary Search",
                    "Merge Sort",
                    "A*",
                    "Boyer-Moore",
                    "Hybrid Search",
                  ].includes(selectedAlgo) && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        background: "rgba(0, 240, 255, 0.15)",
                        color: "var(--accent-color)",
                        border: "1px solid rgba(0, 240, 255, 0.3)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "6px",
                        fontWeight: "700",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      ⭐ Best Choice
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    padding: "0.35rem 0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Clock size={12} style={{ color: "var(--accent-color)" }} />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Avg Time:{" "}
                    <strong style={{ color: "#fff" }}>
                      {details.avgComplexity}
                    </strong>
                  </span>
                </div>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    padding: "0.35rem 0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Layers size={12} style={{ color: "var(--accent-color)" }} />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Space:{" "}
                    <strong style={{ color: "#fff" }}>
                      {details.spaceComplexity}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}
            >
              <p style={{ margin: 0 }}>{details.description}</p>
            </div>

            {details.bestAnalysis && (
              <div
                style={{
                  background: "rgba(0, 240, 255, 0.03)",
                  border: "1px solid rgba(0, 240, 255, 0.15)",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  color: "#fff",
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "3px",
                    background: "var(--accent-color)",
                  }}
                />
                <strong
                  style={{
                    color: "var(--accent-color)",
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  ⭐ Usage & Performance Analytics
                </strong>
                <span style={{ color: "var(--text-primary)" }}>
                  {details.bestAnalysis}
                </span>
              </div>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px 12px 0 0",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Code size={13} style={{ color: "var(--text-secondary)" }} />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      color: "var(--text-secondary)",
                    }}
                  >
                    implementation.{details.lang}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--accent-color)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  {details.lang}
                </span>
              </div>
              <pre
                style={{
                  margin: 0,
                  background: "#070708",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "0 0 12px 12px",
                  padding: "1.25rem",
                  overflowX: "auto",
                  fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                  color: "#eceff4",
                  textAlign: "left",
                }}
              >
                <code>{details.code}</code>
              </pre>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.04)",
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.2rem",
                  }}
                >
                  Best Case
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    color: "var(--accent-color)",
                    fontWeight: "700",
                  }}
                >
                  {details.bestComplexity}
                </span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRight: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.2rem",
                  }}
                >
                  Average Case
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  {details.avgComplexity}
                </span>
              </div>
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.2rem",
                  }}
                >
                  Worst Case
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    color: "#ff5555",
                    fontWeight: "700",
                  }}
                >
                  {details.worstComplexity}
                </span>
              </div>
            </div>

            <div>
              <h5
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Cpu size={14} style={{ color: "var(--accent-color)" }} />{" "}
                Practical Applications:
              </h5>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.25rem",
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                  lineHeight: 1.5,
                }}
              >
                {details.applications.map((app, idx) => (
                  <li key={idx}>{app}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <h4
                style={{
                  fontSize: "1.45rem",
                  fontWeight: 700,
                  margin: 0,
                  color: "#fff",
                }}
              >
                {comparison.title}
              </h4>
              <p
                style={{
                  margin: "0.25rem 0 0 0",
                  fontSize: "0.9rem",
                  color: "var(--accent-color)",
                }}
              >
                {comparison.subtitle}
              </p>
            </div>

            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.94rem",
                lineHeight: 1.5,
                margin: 0,
                textAlign: "left",
              }}
            >
              {comparison.description}
            </p>

            <div
              style={{
                overflowX: "auto",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  minWidth: "550px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  >
                    {comparison.headers.map((head, hIdx) => {
                      const isBest = head.includes("⭐");
                      const isCurrent =
                        head
                          .toLowerCase()
                          .includes(
                            selectedAlgo
                              .toLowerCase()
                              .replace(" search", "")
                              .replace("*", ""),
                          ) ||
                        (selectedAlgo === "A*" && head.includes("A*"));
                      return (
                        <th
                          key={hIdx}
                          style={{
                            padding: "0.85rem 0.75rem",
                            fontWeight: "700",
                            color: isCurrent
                              ? "var(--accent-color)"
                              : isBest
                                ? "var(--accent-color)"
                                : "#fff",
                            fontSize: "0.8rem",
                            textAnchor: "left",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            background: isCurrent
                              ? "rgba(0, 240, 255, 0.06)"
                              : "transparent",
                            borderLeft: isCurrent
                              ? "1.5px solid rgba(0, 240, 255, 0.2)"
                              : "none",
                            borderRight: isCurrent
                              ? "1.5px solid rgba(0, 240, 255, 0.2)"
                              : "none",
                          }}
                        >
                          {head} {isCurrent && "(Active)"}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      style={{
                        borderBottom:
                          rIdx === comparison.rows.length - 1
                            ? "none"
                            : "1px solid rgba(255,255,255,0.04)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.01)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td
                        style={{
                          padding: "0.85rem 0.75rem",
                          fontSize: "0.9rem",
                          color: "var(--text-primary)",
                          fontWeight: "600",
                        }}
                      >
                        {row.name}
                      </td>
                      {row.vals.map((val, vIdx) => {
                        const headerName = comparison.headers[vIdx + 1];
                        const isCurrentCol =
                          headerName &&
                          (headerName
                            .toLowerCase()
                            .includes(
                              selectedAlgo
                                .toLowerCase()
                                .replace(" search", "")
                                .replace("*", ""),
                            ) ||
                            (selectedAlgo === "A*" &&
                              headerName.includes("A*")));
                        return (
                          <td
                            key={vIdx}
                            style={{
                              padding: "0.85rem 0.75rem",
                              fontSize: "0.88rem",
                              background: isCurrentCol
                                ? "rgba(0, 240, 255, 0.03)"
                                : "transparent",
                              borderLeft: isCurrentCol
                                ? "1.5px solid rgba(0, 240, 255, 0.1)"
                                : "none",
                              borderRight: isCurrentCol
                                ? "1.5px solid rgba(0, 240, 255, 0.1)"
                                : "none",
                            }}
                          >
                            {renderCell(val)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
