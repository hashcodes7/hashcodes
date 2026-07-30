"use client";

export const ConsultingPage = () => {
  return (
    <section
      id="consulting"
      className="section container"
      style={{ paddingTop: "8rem" }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Consulting Services
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
        Specialized professional services to help optimize your business and
        bring your ideas to life.
      </p>

      <div
        className="grid md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "2rem" }}
      >
        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--text-primary)" }}
          >
            Website Making
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Custom, high-performance websites and web applications tailored to
            your brand. From stunning landing pages to complex full-stack
            platforms using React, Vite, and modern UI/UX principles.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
            }}
          >
            Consult Now
          </a>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--text-primary)" }}
          >
            Android App Making
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Native and cross-platform mobile application development. Let's
            build intuitive, performant Android apps that users love, complete
            with seamless backend integration.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
            }}
          >
            Consult Now
          </a>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--text-primary)" }}
          >
            Local AI Deployment
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Designing and scaling local, offline AI networks. I help configure
            local LLMs, secure RAG (Retrieval-Augmented Generation) pipelines,
            and private autonomous agents.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
            }}
          >
            Consult Now
          </a>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--text-primary)" }}
          >
            Backend Architecture
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Robust, scalable backend systems and RESTful APIs. Database schema
            design, authentication, cloud deployments, and integrating complex
            3rd party services.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
            }}
          >
            Consult Now
          </a>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            className="glass-pill"
            style={{
              width: "max-content",
              fontSize: "0.65rem",
              marginBottom: "1rem",
              borderColor: "#10b981",
              color: "#10b981",
            }}
          >
            Learning
          </span>
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--text-primary)" }}
          >
            1-on-1 Mentorship
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Want to learn how to build any of this yourself? Book a dedicated
            session to master web development, mobile apps, algorithms, or
            practical Machine Learning.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
              background: "#10b981",
              color: "#fff",
            }}
          >
            Book Session
          </a>
        </div>
      </div>

      {/* Why Consult Me Section */}
      <h3
        style={{
          fontSize: "2.2rem",
          textAlign: "center",
          marginTop: "6rem",
          marginBottom: "1rem",
        }}
      >
        Why Consult Me?
      </h3>
      <p
        style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          marginBottom: "3.5rem",
          maxWidth: "650px",
          margin: "0 auto 3.5rem auto",
        }}
      >
        A unique blend of full-stack engineering, algorithmic optimization, and
        modern design aesthetics tailored for success.
      </p>

      <div
        className="grid md:grid-cols-2 lg:grid-cols-4"
        style={{ gap: "1.5rem", marginBottom: "2rem" }}
      >
        <div
          className="glass-card"
          style={{ padding: "2rem 1.5rem", textAlign: "center" }}
        >
          <h4
            style={{
              fontSize: "1.2rem",
              marginBottom: "0.75rem",
              color: "var(--text-primary)",
            }}
          >
            Expertise
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            Deep knowledge spanning frontend React, mobile applications, and
            robust scalable backend architectures.
          </p>
        </div>
        <div
          className="glass-card"
          style={{ padding: "2rem 1.5rem", textAlign: "center" }}
        >
          <h4
            style={{
              fontSize: "1.2rem",
              marginBottom: "0.75rem",
              color: "var(--text-primary)",
            }}
          >
            Modern Stack
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            Utilizing the latest technologies like Vite, Next.js, and
            cutting-edge local AI model integration.
          </p>
        </div>
        <div
          className="glass-card"
          style={{ padding: "2rem 1.5rem", textAlign: "center" }}
        >
          <h4
            style={{
              fontSize: "1.2rem",
              marginBottom: "0.75rem",
              color: "var(--text-primary)",
            }}
          >
            Fast Delivery
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            Optimized development workflows to quickly move your product from an
            idea to a production-ready application.
          </p>
        </div>
        <div
          className="glass-card"
          style={{ padding: "2rem 1.5rem", textAlign: "center" }}
        >
          <h4
            style={{
              fontSize: "1.2rem",
              marginBottom: "0.75rem",
              color: "var(--text-primary)",
            }}
          >
            Scalability
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            Building systems that are designed to handle traffic growth smoothly
            from day one without architectural bottlenecks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsultingPage;
