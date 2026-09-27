import {
  BadgeCheck,
  BookOpen,
  BookOpenText,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import communityImage from '../../assets/images/about-community.jpg';
import './AboutPage.scss';

type Principle = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: 'green' | 'indigo' | 'violet' | 'blue';
};

const purposePillars: Principle[] = [
  {
    title: 'Learn',
    description: 'Discover biblical truth in simple and engaging ways.',
    icon: BookOpen,
    tone: 'green',
  },
  {
    title: 'Connect',
    description: 'Build meaningful relationships with church and friends.',
    icon: UsersRound,
    tone: 'violet',
  },
  {
    title: 'Grow',
    description: 'Develop a stronger faith and confidence in Christ.',
    icon: ShieldCheck,
    tone: 'green',
  },
];

const values: Principle[] = [
  { title: 'Biblical Truth', description: 'Rooted in Scripture', icon: BookOpenText, tone: 'green' },
  { title: 'Community', description: 'People first', icon: UsersRound, tone: 'indigo' },
  { title: 'Excellence', description: 'Faith with quality', icon: BadgeCheck, tone: 'green' },
  { title: 'Safety', description: 'Safe and moderated', icon: ShieldCheck, tone: 'blue' },
  { title: 'Purpose', description: 'Real-life impact', icon: HeartHandshake, tone: 'green' },
];

export function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero__content">
          <p className="section-eyebrow section-eyebrow--light">About FaithLink</p>
          <h1 id="about-title">Our Mission<br /><em>for a Greater Generation</em></h1>
          <p>
            FaithLink exists to help young people know God, grow in His Word, and thrive in digital
            spaces — through communities, learning, technology, fellowship, and biblical truth.
          </p>
        </div>
      </section>

      <section className="purpose" aria-labelledby="purpose-title">
        <div className="purpose__media">
          <img src={communityImage} alt="Young friends standing together with their arms linked" />
          <p aria-hidden="true">Young People.<br />Real Faith.<br />Lasting Impact.</p>
        </div>

        <div className="purpose__content">
          <p className="section-eyebrow">Our purpose</p>
          <h2 id="purpose-title">Why We Exist</h2>
          <p className="purpose__intro">
            We believe every young person is not just the church of tomorrow, but the church of today.
            FaithLink was created to provide a modern, engaging and safe space where teens and young
            adults can learn, connect, participate and grow in their faith.
          </p>

          <div className="purpose__pillars">
            {purposePillars.map(({ title, description, icon: Icon, tone }) => (
              <article className="purpose-card" key={title}>
                <span className={`about-icon about-icon--${tone}`}><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="values" aria-labelledby="values-title">
        <div className="values__inner">
          <p className="section-eyebrow">What guides us</p>
          <h2 id="values-title">Built on Values</h2>
          <div className="values__grid">
            {values.map(({ title, description, icon: Icon, tone }) => (
              <article className="value-card" key={title}>
                <span className={`about-icon about-icon--${tone}`}><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vision-wrap" aria-labelledby="vision-title">
        <div className="vision">
          <Sparkles aria-hidden="true" />
          <h2 id="vision-title">Be Part of the Vision</h2>
          <p>
            Whether you’re an individual, a youth group or a church — you can be part of a growing
            movement to raise a generation rooted in Christ.
          </p>
          <Link to="/#get-started">Join Now</Link>
        </div>
      </section>
    </main>
  );
}
