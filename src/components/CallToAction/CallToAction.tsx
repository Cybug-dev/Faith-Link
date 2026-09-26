import './CallToAction.scss';

export function CallToAction() {
  return (
    <section className="cta-wrap" id="get-started" aria-labelledby="cta-title">
      <div className="cta">
        <div className="cta__content">
          <h2 id="cta-title">Ready to get started?</h2>
          <p>Join a community that’s passionate about God, people and purpose.</p>
          <a className="cta__button" href="#create-account">Create an Account</a>
        </div>
        <blockquote className="cta__quote">
          “Let no one look down on you because you are young, but set an example for the believers…”
          <cite>1 Timothy 4:12</cite>
        </blockquote>
      </div>
    </section>
  );
}
