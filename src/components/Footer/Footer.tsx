import { Cross, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { footer } from './footerData';
import { resolveRoute } from '../../utils/navigation';

// Site-wide footer, rendered once in App.tsx under every page.
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link className="site-footer__logo" to="/" aria-label="FaithLink home">
            <Cross aria-hidden="true" /> FaithLink
          </Link>
          <p>{footer.tagline}</p>
        </div>

        {footer.columns.map((column) => (
          <nav className="site-footer__column" aria-label={column.title} key={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}><Link to={resolveRoute(link.to)}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="site-footer__column site-footer__contact">
          <h2>{footer.contact.title}</h2>
          <ul>
            <li><Mail aria-hidden="true" /><a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a></li>
            <li><Phone aria-hidden="true" /><a href={`tel:${footer.contact.phone.replace(/\s/g, '')}`}>{footer.contact.phone}</a></li>
            <li><MapPin aria-hidden="true" /><span>{footer.contact.location}</span></li>
          </ul>
        </div>

        <ul className="site-footer__socials">
          {footer.socials.map(({ label, to, icon: Icon }) => (
            <li key={label}>
              <Link to={resolveRoute(to)} aria-label={label}><Icon aria-hidden="true" /></Link>
            </li>
          ))}
        </ul>

        <p className="site-footer__copyright">{footer.copyright}</p>
      </div>
    </footer>
  );
}
