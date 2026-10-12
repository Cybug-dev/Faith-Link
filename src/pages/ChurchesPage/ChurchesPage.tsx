import { ChurchCta } from './sections/ChurchCta';
import { ChurchNeeds } from './sections/ChurchNeeds';
import { ChurchSteps } from './sections/ChurchSteps';
import { ChurchTypes } from './sections/ChurchTypes';
import { ChurchesHero } from './sections/ChurchesHero';
import './ChurchesPage.scss';

// Composes the section components; all copy lives in churchesData.ts.
export function ChurchesPage() {
  return (
    <main className="churches-page">
      <ChurchesHero />
      <ChurchNeeds />
      <ChurchSteps />
      <ChurchTypes />
      <ChurchCta />
    </main>
  );
}
