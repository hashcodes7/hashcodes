import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./components/ParticlesBackground";
import Hero from "./components/Hero";
import AIJourney from "./components/AIJourney/AIJourney";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectsPage from "./components/ProjectsPage";
import {
  ArticlesPage,
  PapersPage,
  LearnPage,
  TechStackPage,
  ConsultingPage,
} from "./components/ExtraSections";
import Footer from "./components/Footer";
import EverSwapAbout from "./components/EverSwapAbout";
import "./index.css";

function App() {
  const [currentPath, setCurrentPath] = useState(
    window.location.hash || "#/about",
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentPath(hash || "#/about");

      // Instantly scroll to the top of the viewport on route change
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("hashchange", handleHashChange);

    // Initialize root route if no hash exists
    if (!window.location.hash) {
      window.location.hash = "#/about";
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderActivePage = () => {
    const basePath = currentPath.split("?")[0];

    if (basePath.startsWith("#/learn")) {
      return <LearnPage />;
    }

    switch (basePath) {
      case "#/projects":
        return <ProjectsPage />;
      case "#/articles":
        return <ArticlesPage />;
      case "#/papers":
        return <PapersPage />;

      case "#/resume":
        return (
          <div
            style={{
              paddingTop: "6rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Experience />
            <Education />
          </div>
        );
      case "#/techstack":
        return <TechStackPage />;
      case "#/consulting":
        return <ConsultingPage />;
      case "#/about":
      default:
        return null;
    }
  };

  const isInsideLearningChapter =
    currentPath.startsWith("#/learn/") && currentPath.split("/").length >= 3;

  const isAboutPage = currentPath.split("?")[0] === "#/about";

  return (
    <>
      {!isInsideLearningChapter && !isAboutPage && <ParticlesBackground />}
      <Navbar />
      
      {/* Persistently mounted 3D iframe for the About page */}
      <div style={{ display: isAboutPage ? "block" : "none" }}>
        <EverSwapAbout />
      </div>

      {!isAboutPage && (
        <>
          <main style={{ minHeight: "82vh" }}>{renderActivePage()}</main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
