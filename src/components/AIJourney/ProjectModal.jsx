import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          background: "rgba(5, 5, 5, 0.8)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "rgba(15, 15, 15, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 24px 48px rgba(0, 0, 0, 0.8), 0 0 80px rgba(0, 240, 255, 0.05)",
            borderRadius: "20px",
            padding: "2.5rem",
            position: "relative",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "var(--accent-color)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <X size={18} />
          </button>

          {/* Project Tag */}
          <div style={{ marginBottom: "1rem" }}>
            <span
              className="glass-pill"
              style={{
                fontSize: "0.75rem",
                padding: "0.25rem 0.75rem",
                borderColor: "var(--accent-color)",
                color: "var(--accent-color)",
              }}
            >
              Featured Project
            </span>
          </div>

          {/* Project Title */}
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "1rem",
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="glass-card"
                style={{
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.8rem",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.95rem",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                }}
              >
                <FaGithub size={18} />
                GitHub Repository
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  background: "var(--accent-color)",
                  color: "#0a0a0a",
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.95rem",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: "700",
                }}
              >
                <ExternalLink size={18} />
                Launch App
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
