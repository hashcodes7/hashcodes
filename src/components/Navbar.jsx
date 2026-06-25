import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaSun, FaMoon, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || '#/about');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#/about');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'About', href: '#/about' },
    { name: 'Projects', href: '#/projects' },
    { name: 'Articles', href: '#/articles' },
    { name: 'Papers', href: '#/papers' },
    { name: 'Concepts', href: '#/concepts' },
    { name: 'Resume', href: '#/resume' },
    { name: 'TechStack', href: '#/techstack' },
    { name: 'Consulting', href: '#/consulting' },
  ];

  return (
    <>
      {/* Floating Centered Pill Navbar */}
      <nav className="navbar-pill-container">
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div style={{ background: 'var(--accent-color)', padding: '0.2rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaCog size={12} color="#0a0a0a" />
          </div>
          <span style={{ fontSize: '0.85rem' }}>HARSH</span>
        </div>

        {/* Separator */}
        <div style={{ width: '1px', height: '14px', background: 'var(--glass-border)' }} className="navbar-pill-links" />

        {/* Desktop Links */}
        <div className="navbar-pill-links">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`navbar-pill-link ${link.href === activeHash ? 'active' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </div>



        {/* Mobile Menu Toggle Button */}
        <button 
          className="btn-icon mobile-toggle-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          style={{ background: 'transparent', padding: '0.15rem', color: 'var(--text-primary)' }}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Mobile Dropdown Options */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '125%',
            left: 0,
            right: 0,
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            boxShadow: '0 12px 32px var(--glass-shadow)'
          }}>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                style={{ 
                  fontWeight: 600, 
                  fontSize: '0.95rem', 
                  color: link.href === activeHash ? 'var(--accent-color)' : 'var(--text-primary)' 
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)' }} />
            {/* Mobile dark mode option */}
            <button 
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
              Toggle Theme
            </button>

          </div>
        )}
      </nav>

      {/* Detached Theme Toggle Circle (Desktop) */}
      <button 
        className="theme-toggle-floating-circle" 
        onClick={toggleTheme} 
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>
    </>
  );
};

export default Navbar;
