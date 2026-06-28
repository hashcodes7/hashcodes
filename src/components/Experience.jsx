const Experience = () => {
  const experiences = [
    {
      role: "AI Automation Engineer",
      company: "Cognizant",
      period: "Sept 2023 – Present",
      description: [
        "Designed and optimized retrieval and context orchestration pipelines using similarity search and Hugging Face Transformers, improving response relevance and increasing retrieval efficiency by 30%.",
        "Built end-to-end document ingestion and data preprocessing pipelines (parsing, normalization, semantic chunking), improving system scalability and reducing latency by 40%.",
        "Built an LLM-powered conversational system handling real-time user interactions (100+ requests/min) with custom NLP pipelines and contextual response handling, reducing navigation time by 40%.",
        "Designed and deployed a scalable AI-based recommendation system serving high-volume user traffic (10K+ users/day), improving product discovery speed and CTR by 35%.",
        "Collaborated in Agile sprints by developing microservices using Python and Java (Spring Boot, REST APIs) and delivered CI/CD pipelines with GitHub Actions.",
      ],
    },
    {
      role: "Full Stack Engineer Intern",
      company: "Cognizant",
      period: "Nov 2022 – Aug 2023",
      description: [
        "Designed, tested, and implemented scalable web applications using ReactJS, Flutter, JavaScript and Spring Boot, REST APIs with MongoDB as the database supporting 1000+ users.",
        "Enhanced application performance and usability by optimizing API interactions, improving UI responsiveness.",
        "Tested and validated API functionality using Swagger and Postman, ensuring proper integration and data exchange between frontend and backend components.",
      ],
    },
    {
      role: "IOT Engineer Intern",
      company: "IDEX",
      period: "May 2022 – Aug 2022",
      description: [
        "Engineered long-range IoT communication system using Ultra96 (Xilinx FPGA) with Python/Linux-based backend.",
        "Integrated real-time sensor data with secure communication protocols, reducing data transmission latency by 30%.",
        "Explored AI-based anomaly detection for sensor data analysis in remote environments.",
      ],
    },
  ];

  return (
    <section id="experience" className="section container">
      <h2
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "4rem",
        }}
      >
        Work Experience
      </h2>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          position: "relative",
        }}
      >
        {/* Timeline Line */}
        <div
          style={{
            position: "absolute",
            left: "2rem",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "var(--glass-border)",
            zIndex: -1,
          }}
          className="md-hidden-timeline"
        ></div>

        {experiences.map((exp, index) => (
          <div
            key={index}
            className="glass-card"
            style={{ padding: "2rem", position: "relative" }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1.5rem",
                gap: "1rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "var(--accent-color)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {exp.role}
                </h3>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 500 }}>
                  {exp.company}
                </h4>
              </div>
              <div
                className="glass-pill"
                style={{ color: "var(--text-secondary)" }}
              >
                {exp.period}
              </div>
            </div>

            <ul
              style={{
                paddingLeft: "1.5rem",
                color: "var(--text-secondary)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {exp.description.map((item, i) => (
                <li key={i} style={{ lineHeight: 1.6 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
