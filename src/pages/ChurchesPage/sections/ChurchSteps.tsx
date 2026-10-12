import { ChevronRight } from 'lucide-react';
import { images, steps } from '../churchesData';
import { useAccordion } from '../hooks/useAccordion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Photo } from './Photo';

// Section 3: on mobile each step is an accordion row (one open at a time);
// on desktop all steps are shown, so the header is a plain div instead of a button.
export function ChurchSteps() {
  const { toggle, isOpen } = useAccordion();
  const isDesktop = useMediaQuery('(min-width: 64rem)');

  return (
    <section className="churches-steps" aria-labelledby="churches-steps-title">
      <div className="churches-steps__inner">
        <div className="churches-steps__media">
          <Photo image={images.steps} sizes="(min-width: 64rem) 28rem, 100vw" />
        </div>
        <div className="churches-steps__content">
          <p className="churches-eyebrow">{steps.eyebrow}</p>
          <h2 id="churches-steps-title">{steps.title}</h2>
          <p className="churches-steps__summary">{steps.summary}</p>
          <ol className="churches-steps__list">
            {steps.items.map((step, index) => {
              const open = isDesktop || isOpen(step.id);
              const headContent = (
                <>
                  <span className="churches-steps__badge" aria-hidden="true">{index + 1}</span>
                  <span className="churches-steps__title">{step.title}</span>
                  <ChevronRight className="churches-steps__chevron" aria-hidden="true" />
                </>
              );

              return (
                <li className="churches-steps__item" data-open={open} key={step.id}>
                  <h3>
                    {isDesktop ? (
                      <div className="churches-steps__head">{headContent}</div>
                    ) : (
                      <button
                        className="churches-steps__head"
                        type="button"
                        id={`step-${step.id}`}
                        aria-expanded={open}
                        aria-controls={`step-panel-${step.id}`}
                        onClick={() => toggle(step.id)}
                      >
                        {headContent}
                      </button>
                    )}
                  </h3>
                  {/* grid-template-rows 0fr -> 1fr animates open/close; inert keeps closed text out of tab/AT order */}
                  <div className="churches-steps__panel" id={`step-panel-${step.id}`} inert={!open}>
                    <div><p>{step.description}</p></div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
