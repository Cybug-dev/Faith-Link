import { ChevronRight, Church, Home, Info, Mail, Menu, Sparkles, X, type LucideIcon } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import brandMark from '../../assets/icons/faithlink-mark.svg';
import './Header.scss';
import { SIGN_IN_URL, SIGN_UP_URL } from '../../utils/navigation';

const links: Array<{ label: string; to: string; description: string; icon: LucideIcon; tone: 'orange' | 'violet' | 'green' | 'amber' | 'slate' }> = [
  { label: 'Home', to: '/', description: 'Welcome to FaithLink', icon: Home, tone: 'orange' },
  { label: 'About', to: '/about', description: 'Our mission and story', icon: Info, tone: 'violet' },
  { label: 'Features', to: '/features', description: 'Tools for your ministry', icon: Sparkles, tone: 'amber' },
  { label: 'For Churches', to: '/churches', description: 'Grow your congregation', icon: Church, tone: 'green' },
  { label: 'Contact', to: '/contact', description: 'Get in touch with us', icon: Mail, tone: 'slate' },
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
    const closeOnDesktop = window.matchMedia('(min-width: 64rem)');
    const handleBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    closeOnDesktop.addEventListener('change', handleBreakpoint);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', closeOnEscape);
      closeOnDesktop.removeEventListener('change', handleBreakpoint);
    };
  }, [isMenuOpen]);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className={`site-nav-backdrop ${isMenuOpen ? 'site-nav-backdrop--visible' : ''}`} aria-hidden="true" onClick={closeMenu} />
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''} ${isMenuOpen ? 'site-header--menu-open' : ''}`}>
        <div className="site-header__inner">
          <Link className="brand" to="/" aria-label="FaithLink home">
            <img className="brand__mark" src={brandMark} alt="" />
            <span>FaithLink</span>
          </Link>

          <nav aria-label="Primary navigation" id="primary-navigation" className={`site-nav ${isMenuOpen ? 'site-nav--open' : ''}`}>
            <p className="site-nav__eyebrow">Navigate</p>
            <div className="site-nav__links">
              {links.map(({ label, to, description, icon: Icon, tone }, index) => (
                <NavLink
                  className={({ isActive }) => `site-nav__link ${isActive && !to.includes('#') ? 'site-nav__link--active' : ''}`}
                  end={to === '/'}
                  to={to}
                  key={label}
                  onClick={closeMenu}
                  style={{ '--item-index': index } as CSSProperties}
                >
                  <span className={`site-nav__icon site-nav__icon--${tone}`} aria-hidden="true"><Icon /></span>
                  <span className="site-nav__text">
                    <span className="site-nav__label">{label}</span>
                    <small className="site-nav__description">{description}</small>
                  </span>
                  <ChevronRight className="site-nav__chevron" aria-hidden="true" />
                </NavLink>
              ))}
            </div>
            <div className="site-nav__actions">
              <a className="header-button header-button--ghost" href={SIGN_IN_URL} onClick={closeMenu}>Sign In</a>
              <a className="header-button header-button--primary" href={SIGN_UP_URL} onClick={closeMenu}>Get Started</a>
            </div>
          </nav>

          <button aria-controls="primary-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="menu-toggle" onClick={() => setIsMenuOpen((open) => !open)} type="button">
            {isMenuOpen ? <X key="close" aria-hidden="true" /> : <Menu key="open" aria-hidden="true" />}
          </button>
        </div>
      </header>
    </>
  );
}
