import { BookOpen, ChartNoAxesColumnIncreasing, Gamepad2, UsersRound, type LucideIcon } from 'lucide-react';
import './FeatureGrid.scss';

type Feature = { title: string; description: string; icon: LucideIcon; tone: 'green' | 'indigo' | 'violet' | 'purple' };

const features: Feature[] = [
  { title: 'Bible Learning', description: 'Interactive lessons and resources', icon: BookOpen, tone: 'green' },
  { title: 'Live Quizzes', description: 'Join real-time Bible challenges', icon: Gamepad2, tone: 'indigo' },
  { title: 'Church Communities', description: 'Connect with your church family', icon: UsersRound, tone: 'violet' },
  { title: 'Track Progress', description: 'See your growth and achievements', icon: ChartNoAxesColumnIncreasing, tone: 'purple' },
];

export function FeatureGrid() {
  return (
    <section className="features" id="features" aria-labelledby="features-title">
      <h2 className="sr-only" id="features-title">Everything you need to grow in faith</h2>
      <div className="features__grid">
        {features.map(({ title, description, icon: Icon, tone }) => (
          <article className="feature-card" key={title}>
            <div className={`feature-card__icon feature-card__icon--${tone}`}><Icon aria-hidden="true" strokeWidth={2.4} /></div>
            <div><h3>{title}</h3><p>{description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
