import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import brandMark from '../../assets/icons/faithlink-mark.svg';
import './Header.scss';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Features', to: '/features' },
  { label: 'For Churches', to: '/#get-started' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let frameId = 0;

    const updateHeaderState = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => setIsScrolled(window.scrollY > 4));
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateHeaderState);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <Link className="brand" to="/" aria-label="FaithLink home">
          <img className="brand__mark" src={brandMark} alt="" />
          <span>FaithLink</span>
        </Link>

        <nav aria-label="Primary navigation" id="primary-navigation" className={`site-nav ${isMenuOpen ? 'site-nav--open' : ''}`}>
          <div className="site-nav__links">
            {links.map((link) => (
              <NavLink
                className={({ isActive }) => `site-nav__link ${isActive && !link.to.includes('#') ? 'site-nav__link--active' : ''}`}
                end={link.to === '/'}
                to={link.to}
                key={link.label}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="site-nav__actions">
            <Link className="header-button header-button--ghost" to="/#signin" onClick={closeMenu}>Sign In</Link>
            <Link className="header-button header-button--primary" to="/#get-started" onClick={closeMenu}>Get Started</Link>
          </div>
        </nav>

        <button aria-controls="primary-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="menu-toggle" onClick={() => setIsMenuOpen((open) => !open)} type="button">
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
