import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaSun, FaMoon, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Expertise', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Philosophy', href: '#about' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(10, 10, 10, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.25rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ background: 'var(--accent-color)', padding: '0.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaCog size={16} color="#0a0a0a" />
        </div>
        HARSH VERMA
      </div>

      {/* Desktop Nav */}
      <div className="flex-center" style={{ display: 'none', '@media (minWidth: 768px)': { display: 'flex' } }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }} className="nav-link-hover">
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a href="#contact" className="btn-primary" style={{ display: 'none', '@media (minWidth: 768px)': { display: 'inline-flex' } }}>
          Hire Me
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {theme === 'dark' ? <FaSun size={16} color="var(--text-secondary)" /> : <FaMoon size={16} color="var(--text-secondary)" />}
          <label className="theme-switch">
            <input type="checkbox" checked={theme === 'light'} onChange={toggleTheme} />
            <span className="slider"></span>
          </label>
        </div>

        {/* Mobile Toggle */}
        <button className="btn-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'block', '@media (minWidth: 768px)': { display: 'none' } }}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'center',
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setIsMenuOpen(false)}>
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
