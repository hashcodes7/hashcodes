import { Typewriter } from "react-simple-typewriter";
import me1 from "../assets/me1.png";
import me2 from "../assets/me2.png";

const Hero = () => {
  return (
    <section
      id="about"
      className="section flex-center"
      style={{ minHeight: "100vh", paddingTop: "6rem", position: "relative" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          gap: "3rem",
          alignItems: "center",
          padding: "0 2rem",
          zIndex: 10,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Left: Profile Images */}
        <div
          style={{
            flex: "0 0 320px",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 260,
              height: 260,
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(2,6,23,0.6)",
              border: "1px solid var(--glass-border)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            }}
          >
            <img
              src={me1}
              alt="Harsh profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* small secondary image */}
          <div
            style={{
              position: "absolute",
              right: -18,
              bottom: -18,
              width: 110,
              height: 110,
              borderRadius: 14,
              overflow: "hidden",
              border: "3px solid var(--background)",
              boxShadow: "0 8px 24px rgba(2,6,23,0.5)",
            }}
          >
            <img
              src={me2}
              alt="Harsh casual"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Right: Text */}
        <div
          style={{
            flex: "1 1 420px",
            minWidth: 280,
            color: "var(--text-primary)",
          }}
        >
          <div
            style={{
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <div className="glass-pill">AI AUTOMATION ENGINEER</div>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              margin: "0 0 1rem 0",
            }}
          >
            Engineering
            <br />
            <span style={{ color: "var(--accent-color)" }}>
              <Typewriter
                words={[
                  "AI Systems",
                  "Mechanical Logic",
                  "LLM Pipelines",
                  "Scalable Apps",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                cursorColor="var(--accent-color)"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "1.25rem",
            }}
          >
            I build production-ready AI products — retrieval systems, LLM-driven
            interfaces and full-stack apps. I bridge applied research and
            engineering to deliver scalable systems with strong UX and reliable
            infra.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href="#/resume"
              className="btn"
              style={{ padding: "0.6rem 1rem" }}
            >
              Resume
            </a>
            <a
              href="#/articles"
              className="btn ghost"
              style={{ padding: "0.6rem 1rem" }}
            >
              Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
