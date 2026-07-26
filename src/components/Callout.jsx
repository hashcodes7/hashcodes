import React from "react";

const Callout = ({ type, title, children }) => {
  const styles = {
    abstract: { border: "rgba(255, 255, 255, 0.4)", bg: "rgba(255, 255, 255, 0.05)", color: "#fff" },
    info: { border: "rgba(0, 240, 255, 0.4)", bg: "rgba(0, 240, 255, 0.05)", color: "var(--accent-color)" },
    tip: { border: "rgba(16, 185, 129, 0.4)", bg: "rgba(16, 185, 129, 0.05)", color: "#10b981" },
    quote: { border: "rgba(245, 158, 11, 0.4)", bg: "rgba(245, 158, 11, 0.05)", color: "#f59e0b" },
    success: { border: "rgba(16, 185, 129, 0.4)", bg: "rgba(16, 185, 129, 0.05)", color: "#10b981" },
    example: { border: "rgba(139, 92, 246, 0.4)", bg: "rgba(139, 92, 246, 0.05)", color: "#8b5cf6" },
  };
  const theme = styles[type] || styles.info;
  return (
    <div style={{
      borderLeft: "4px solid " + theme.border,
      background: theme.bg,
      padding: "1.5rem",
      borderRadius: "0 12px 12px 0",
      marginBottom: "2rem",
      marginTop: "1rem"
    }}>
      <div style={{ fontWeight: 800, color: theme.color, marginBottom: "0.75rem", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {title}
      </div>
      <div style={{ color: "var(--text-primary)", lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
};

export default Callout;
