import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { churchTypes } from '../churchesData';
import { resolveRoute } from '../../../utils/navigation';
import { Photo } from './Photo';

// Section 4: heading block + four image cards. Cards form a swipeable scroll-snap
// carousel on mobile (swipe only) and a 4-up grid on desktop.
export function ChurchTypes() {
  return (
    <section className="churches-types" aria-labelledby="churches-types-title">
      <div className="churches-types__inner">
        <div className="churches-types__content">
          <p className="churches-eyebrow">{churchTypes.eyebrow}</p>
          <h2 id="churches-types-title">
            {churchTypes.titleLead} <em>{churchTypes.titleHighlight}</em>
          </h2>
          <p className="churches-types__summary">{churchTypes.summary}</p>
          <Link className="churches-button churches-button--primary" to={resolveRoute(churchTypes.action.to)}>
            {churchTypes.action.label} <ChevronRight aria-hidden="true" />
          </Link>
        </div>

        <div className="churches-types__carousel" role="region" aria-roledescription="carousel" aria-label="Church types">
          <ul className="churches-types__track">
            {churchTypes.items.map(({ title, description, icon: Icon, image }) => (
              <li className="churches-type-card" key={title}>
                <Photo image={image} sizes="(min-width: 64rem) 14rem, 70vw" />
                <div className="churches-type-card__body">
                  <span className="churches-type-card__icon"><Icon aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
