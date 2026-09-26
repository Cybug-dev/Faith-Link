import { CirclePlay } from 'lucide-react';
import './Hero.scss';

type HeroProps = { onWatchVideo: () => void };

export function Hero({ onWatchVideo }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero__content">
        <p className="hero__eyebrow">Learn <span /> Play <span /> Grow <span /> Together</p>
        <h1>A Generation<br />Rooted <em>in Christ</em></h1>
        <p className="hero__summary">
          An interactive platform for churches, youth groups and individuals to learn the Bible,
          join activities, and grow spiritually — together.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#get-started">Create an Account</a>
          <button className="button button--outline" onClick={onWatchVideo} type="button">
            <CirclePlay aria-hidden="true" /> Watch Video
          </button>
        </div>
      </div>

      <p className="hero__note" aria-label="More than a game. A greater purpose.">
        More than<br />a game.<br />A greater purpose.<span aria-hidden="true" />
      </p>
    </section>
  );
}
