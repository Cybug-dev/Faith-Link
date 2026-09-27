import {
  BookOpen,
  BookOpenText,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  Church,
  CircleCheck,
  CirclePlay,
  Gamepad2,
  HeartHandshake,
  ShieldCheck,
  Trophy,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import communityImage from '../../assets/images/features-community.jpg';
import heroImage from '../../assets/images/features-hero.jpg';
import { VideoDialog } from '../../components/VideoDialog/VideoDialog';
import './FeaturesPage.scss';

type CardTone = 'green' | 'indigo' | 'violet' | 'orange' | 'blue';

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: CardTone;
};

const coreFeatures: FeatureItem[] = [
  {
    title: 'Bible Learning',
    description: 'Interactive lessons, devotionals and study resources designed for real life.',
    icon: BookOpen,
    tone: 'green',
  },
  {
    title: 'Live Quizzes',
    description: 'Join real-time Bible challenges and make learning fun with friends.',
    icon: Gamepad2,
    tone: 'indigo',
  },
  {
    title: 'Church Communities',
    description: 'Connect with your church and join safe, moderated groups for discussion and growth.',
    icon: UsersRound,
    tone: 'violet',
  },
  {
    title: 'Events & Activities',
    description: 'Discover and join church events, youth nights and special activities in your community.',
    icon: CalendarDays,
    tone: 'orange',
  },
  {
    title: 'Track Progress',
    description: 'See your learning journey, achievements and spiritual growth over time.',
    icon: ChartNoAxesColumnIncreasing,
    tone: 'indigo',
  },
  {
    title: 'Safe & Faith-Centered',
    description: 'A safe, moderated space designed specifically for young people.',
    icon: ShieldCheck,
    tone: 'green',
  },
];

const benefits: FeatureItem[] = [
  {
    title: 'Personalized Dashboard',
    description: 'Keep track of lessons, quiz results, events and growth in one place.',
    icon: BookOpenText,
    tone: 'green',
  },
  {
    title: 'Progress & Achievements',
    description: 'Earn badges and celebrate milestones as you grow in your faith.',
    icon: Trophy,
    tone: 'violet',
  },
  {
    title: 'Church Tools',
    description: 'Tools designed for churches to engage, manage groups and track participation.',
    icon: Church,
    tone: 'blue',
  },
  {
    title: 'Engaging Experience',
    description: 'A modern, easy-to-use platform built for how young people learn and connect.',
    icon: HeartHandshake,
    tone: 'green',
  },
];

const promises = [
  'Built for Young People',
  'Fun, Interactive Learning',
  'Christ-Centered & Safe',
  'Real Community & Support',
];

function FeatureIcon({ icon: Icon, tone }: Pick<FeatureItem, 'icon' | 'tone'>) {
  return <span className={`features-icon features-icon--${tone}`}><Icon aria-hidden="true" /></span>;
}

export function FeaturesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <main className="features-page">
      <section className="features-hero" aria-labelledby="features-page-title">
        <div className="features-hero__content">
          <p className="features-eyebrow features-eyebrow--light">Platform features</p>
          <h1 id="features-page-title">Everything You Need<br />to <em>Learn, Connect<br />and Grow</em></h1>
          <p className="features-hero__summary">
            FaithLink brings together Bible learning, community, and real-world tools to help young
            people build a stronger, more confident faith — anytime, anywhere.
          </p>
          <div className="features-hero__actions">
            <Link className="features-button features-button--primary" to="/#get-started">Get Started Free</Link>
            <button className="features-button features-button--outline" onClick={() => setIsVideoOpen(true)} type="button">
              <CirclePlay aria-hidden="true" /> Watch Video
            </button>
          </div>
          <p className="features-hero__scribble" aria-hidden="true">Same Faith.<br />New Possibilities.<span /></p>
        </div>
      </section>

      <section className="core-features" aria-labelledby="core-features-title">
        <h2 className="sr-only" id="core-features-title">FaithLink platform features</h2>
        <div className="core-features__grid">
          {coreFeatures.map(({ title, description, icon, tone }) => (
            <article className="core-feature-card" key={title}>
              <FeatureIcon icon={icon} tone={tone} />
              <div><h3>{title}</h3><p>{description}</p></div>
              <ChevronRight className="core-feature-card__chevron" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="platform-story" aria-labelledby="platform-story-title">
        <div className="platform-story__media">
          <img src={communityImage} alt="Friends enjoying Bible study together outdoors" loading="lazy" />
          <p aria-hidden="true">Real People.<br />Real Faith.<br />Lasting Impact.</p>
        </div>

        <div className="platform-story__content">
          <p className="features-eyebrow">More than features</p>
          <h2 id="platform-story-title">More than a Platform —<br /><em>A Place to Grow</em></h2>
          <p className="platform-story__summary">
            FaithLink isn’t just a collection of tools — it’s a safe, engaging space where young people
            can explore God’s Word, build meaningful relationships, and take steps in their faith journey
            with a supportive community around them.
          </p>
          <ul>
            {promises.map((promise) => (
              <li key={promise}><CircleCheck aria-hidden="true" fill="currentColor" /><span>{promise}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="feature-benefits" aria-labelledby="benefits-title">
        <div className="feature-benefits__inner">
          <p className="features-eyebrow">Additional benefits</p>
          <h2 id="benefits-title">Tools for Real Impact</h2>
          <div className="feature-benefits__grid">
            {benefits.map(({ title, description, icon, tone }) => (
              <article className="benefit-card" key={title}>
                <FeatureIcon icon={icon} tone={tone} />
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="features-cta" aria-labelledby="features-cta-title">
        <div className="features-cta__content">
          <p>Ready to get started?</p>
          <h2 id="features-cta-title">Join a Generation <em>Growing in Faith</em></h2>
          <span>Create your account today and start learning, connecting and making a real impact.</span>
          <div>
            <Link to="/#get-started">Get Started Free</Link>
            <Link to="/about">Learn More</Link>
          </div>
        </div>
        <p className="features-cta__scribble" aria-hidden="true">More than<br />a platform.<br />A greater purpose.</p>
      </section>

      <VideoDialog
        open={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        image={heroImage}
        imageAlt="A young woman using FaithLink on a tablet"
        eyebrow="FaithLink Features"
        title="Learn. Connect. Grow."
        message="Discover a safer, more engaging way to grow in faith together."
      />
    </main>
  );
}
