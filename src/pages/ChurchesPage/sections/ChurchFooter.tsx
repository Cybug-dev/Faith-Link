import { Cross, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footer } from '../churchesData';
import { resolveRoute } from '../../../utils/navigation';

// Section 6: footer. Link columns are desktop-only to match the mobile screenshot.
export function ChurchFooter() {
  return (
    <footer className="churches-footer">
      <div className="churches-footer__inner">
        <div className="churches-footer__brand">
          <Link className="churches-footer__logo" to="/" aria-label="FaithLink home">
            <Cross aria-hidden="true" /> FaithLink
          </Link>
          <p>{footer.tagline}</p>
        </div>

        {footer.columns.map((column) => (
          <nav className="churches-footer__column" aria-label={column.title} key={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}><Link to={resolveRoute(link.to)}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="churches-footer__column churches-footer__contact">
          <h2>{footer.contact.title}</h2>
          <ul>
            <li><Mail aria-hidden="true" /><a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a></li>
            <li><Phone aria-hidden="true" /><a href={`tel:${footer.contact.phone.replace(/\s/g, '')}`}>{footer.contact.phone}</a></li>
            <li><MapPin aria-hidden="true" /><span>{footer.contact.location}</span></li>
          </ul>
        </div>

        <ul className="churches-footer__socials">
          {footer.socials.map(({ label, to, icon: Icon }) => (
            <li key={label}>
              <Link to={resolveRoute(to)} aria-label={label}><Icon aria-hidden="true" /></Link>
            </li>
          ))}
        </ul>

        <p className="churches-footer__copyright">{footer.copyright}</p>
      </div>
    </footer>
  );
}
