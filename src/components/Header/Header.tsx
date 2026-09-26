import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import brandMark from '../../assets/icons/faithlink-mark.svg';
import './Header.scss';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'For Churches', href: '#churches' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#home" aria-label="FaithLink home">
          <img className="brand__mark" src={brandMark} alt="" />
          <span>FaithLink</span>
        </a>

        <nav aria-label="Primary navigation" id="primary-navigation" className={`site-nav ${isMenuOpen ? 'site-nav--open' : ''}`}>
          <div className="site-nav__links">
            {links.map((link, index) => (
              <a className={index === 0 ? 'site-nav__link site-nav__link--active' : 'site-nav__link'} href={link.href} key={link.label} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="site-nav__actions">
            <a className="header-button header-button--ghost" href="#signin" onClick={closeMenu}>Sign In</a>
            <a className="header-button header-button--primary" href="#get-started" onClick={closeMenu}>Get Started</a>
          </div>
        </nav>

        <button aria-controls="primary-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="menu-toggle" onClick={() => setIsMenuOpen((open) => !open)} type="button">
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
