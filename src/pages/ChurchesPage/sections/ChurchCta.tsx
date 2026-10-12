import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cta, images } from '../churchesData';
import { resolveRoute } from '../../../utils/navigation';
import { Photo } from './Photo';

// Section 5: closing call-to-action banner over a sunset worship photo.
export function ChurchCta() {
  return (
    <section className="churches-cta" aria-labelledby="churches-cta-title">
      <Photo className="churches-cta__image" image={images.cta} sizes="100vw" />
      <div className="churches-cta__content">
        <p className="churches-eyebrow churches-eyebrow--light">{cta.eyebrow}</p>
        <h2 id="churches-cta-title">{cta.title}</h2>
        <p className="churches-cta__summary">{cta.summary}</p>
        <Link className="churches-button churches-button--primary" to={resolveRoute(cta.action.to)}>
          {cta.action.label} <ChevronRight aria-hidden="true" />
        </Link>
      </div>
      <p className="churches-cta__scribble" aria-hidden="true">
        {cta.scribble[0]}<br />{cta.scribble[1]}
      </p>
    </section>
  );
}
