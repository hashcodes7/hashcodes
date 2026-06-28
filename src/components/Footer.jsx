import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="glass-panel"
      style={{
        marginTop: "4rem",
        padding: "2rem 0",
        borderRadius: "2rem 2rem 0 0",
        borderBottom: "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Harsh Vardhan Verma
        </h2>

        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            href="mailto:harshjobs07@gmail.com"
            className="btn-icon"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
          <a href="#" className="btn-icon" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="btn-icon" aria-label="GitHub">
            <FaGithub size={24} />
          </a>
        </div>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} Harsh Vardhan Verma. Built with React &
          Vite.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
