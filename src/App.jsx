import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import AIJourney from './components/AIJourney/AIJourney';
import Experience from './components/Experience';
import Education from './components/Education';
import ProjectsPage from './components/ProjectsPage';
import { 
  ArticlesPage, 
  PapersPage, 
  ConceptsPage, 
  TechStackPage, 
  ConsultingPage 
} from './components/ExtraSections';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/about');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentPath(hash || '#/about');
      
      // Instantly scroll to the top of the viewport on route change
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initialize root route if no hash exists
    if (!window.location.hash) {
      window.location.hash = '#/about';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderActivePage = () => {
    const basePath = currentPath.split('?')[0];
    switch (basePath) {
      case '#/projects':
        return <ProjectsPage />;
      case '#/articles':
        return <ArticlesPage />;
      case '#/papers':
        return <PapersPage />;
      case '#/concepts':
        return <ConceptsPage />;

      case '#/resume':
        return (
          <div style={{ paddingTop: '6rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Experience />
            <Education />
          </div>
        );
      case '#/techstack':
        return <TechStackPage />;
      case '#/consulting':
        return <ConsultingPage />;
      case '#/about':
      default:
        return (
          <>
            <Hero />
            <AIJourney />
          </>
        );
    }
  };

  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main style={{ minHeight: '82vh' }}>
        {renderActivePage()}
      </main>
      <Footer />
    </>
  );
}

export default App;
