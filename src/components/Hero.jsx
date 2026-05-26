import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  return (
    <section id="about" className="section flex-center" style={{ minHeight: '100vh', paddingTop: '6rem', position: 'relative' }}>
      
      <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center', zIndex: 10, padding: '0 2rem' }}>
        
        {/* Role Pill */}
        <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
          <div className="glass-pill">
            AI AUTOMATION ENGINEER
          </div>
        </div>

        {/* Massive Typography & Typewriter */}
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 5rem)', 
          fontWeight: 800, 
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '2rem'
        }}>
          Engineering <br />
          <span style={{ color: 'var(--accent-color)' }}>
            <Typewriter
              words={['AI Systems', 'Mechanical Logic', 'LLM Pipelines', 'Scalable Apps']}
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

        {/* Description Paragraph */}
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--text-secondary)', 
          maxWidth: '600px', 
          margin: '0 auto',
          lineHeight: 1.7,
          fontWeight: 400
        }}>
          AI Automation Engineer with expertise specializing in high-performance retrieval systems, LLM-powered conversational interfaces, and full-stack web applications. Delivering scalable, production-ready AI designs.
        </p>

      </div>
    </section>
  );
};

export default Hero;
