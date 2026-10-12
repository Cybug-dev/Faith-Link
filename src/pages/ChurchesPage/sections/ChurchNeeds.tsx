import { images, needs } from '../churchesData';
import { Photo } from './Photo';

// Section 2: image + four challenge items (stacked on mobile, 2x2 on desktop).
export function ChurchNeeds() {
  return (
    <section className="churches-needs" aria-labelledby="churches-needs-title">
      <div className="churches-needs__inner">
        <div className="churches-needs__media">
          <Photo image={images.needs} sizes="(min-width: 64rem) 36rem, 100vw" />
        </div>
        <div className="churches-needs__content">
          <p className="churches-eyebrow">{needs.eyebrow}</p>
          <h2 id="churches-needs-title">{needs.title}</h2>
          <p className="churches-needs__summary">{needs.summary}</p>
          <ul className="churches-needs__list">
            {needs.items.map(({ title, description, icon: Icon, tone }) => (
              <li key={title}>
                <span className={`churches-icon churches-icon--${tone}`}><Icon aria-hidden="true" /></span>
                <div>
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
