"use client";
import { Code, Layers, Terminal, Brain } from "lucide-react";
import { TECH_STACK_DATA } from "@/data/techStackData";

const iconMap = {
  Code: <Code size={24} />,
  Layers: <Layers size={24} />,
  Terminal: <Terminal size={24} />,
  Brain: <Brain size={24} />,
};

export const TechStackPage = () => {
  return (
    <section
      id="techstack"
      className="section container"
      style={{ paddingTop: "8rem", minHeight: "80vh" }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Tech Stack
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          marginBottom: "4rem",
          maxWidth: "600px",
          margin: "0 auto 4rem auto",
        }}
      >
        The languages, frameworks, development tools, and artificial
        intelligence models I work with.
      </p>

      <div className="grid md:grid-cols-2" style={{ gap: "2rem" }}>
        {TECH_STACK_DATA.map((cat, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  color: "var(--accent-color)",
                  background: "rgba(0, 240, 255, 0.1)",
                  padding: "0.75rem",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {iconMap[cat.iconName]}
              </div>
              <h3 style={{ fontSize: "1.5rem", margin: 0, color: "var(--text-primary)" }}>
                {cat.title}
              </h3>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                marginBottom: "1.75rem",
                flexGrow: 1,
              }}
            >
              {cat.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "8px",
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    color: "var(--text-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    transition: "all 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(0, 240, 255, 0.08)";
                    e.currentTarget.style.borderColor =
                      "rgba(0, 240, 255, 0.3)";
                    e.currentTarget.style.color = "var(--accent-color)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--accent-color)",
                    }}
                  />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackPage;
