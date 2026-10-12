import { ChevronRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hero, images } from '../churchesData';
import { resolveRoute } from '../../../utils/navigation';
import { Photo } from './Photo';

// Hero: background photo under a dark overlay, heading with highlighted second line, two actions.
export function ChurchesHero() {
  return (
    <section className="churches-hero" aria-labelledby="churches-hero-title">
      <Photo className="churches-hero__image" image={images.hero} sizes="100vw" eager />
      <div className="churches-hero__content">
        <p className="churches-eyebrow churches-eyebrow--light">{hero.eyebrow}</p>
        <h1 id="churches-hero-title">
          {hero.titleLead} <em>{hero.titleHighlight}</em>
        </h1>
        <p className="churches-hero__summary">{hero.summary}</p>
        <div className="churches-hero__actions">
          <Link className="churches-button churches-button--primary" to={resolveRoute(hero.primary.to)}>
            {hero.primary.label} <ChevronRight aria-hidden="true" />
          </Link>
          <Link className="churches-button churches-button--outline" to={resolveRoute(hero.secondary.to)}>
            <MessageCircle aria-hidden="true" /> {hero.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
