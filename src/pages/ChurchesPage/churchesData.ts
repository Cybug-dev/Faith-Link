import {
  Building2,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Church,
  GraduationCap,
  HeartHandshake,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import churchHeroImage from '../../assets/images/church-hero.jpg';
import youngPeopleImage from '../../assets/images/young-people.jpeg';
import { SIGN_UP_URL } from '../../utils/navigation';

// All copy, image URLs and link targets for the For Churches page live here.
// Link targets go through resolveRoute(): unknown routes fall back to "/".

export type ChurchImage = {
  url: string; // base Unsplash URL, width params are added by <Photo>
  alt: string;
  position: string; // object-position so one image works on mobile and desktop
};

export type IconTone = 'amber' | 'green' | 'violet' | 'indigo';

// Unsplash photos, each URL checked to load (HTTP 200).
export const images = {
  hero: {
    url: churchHeroImage, // local asset, imported so Vite bundles it
    alt: 'Church leaders in a warm discussion around a table',
    position: '72% center',
  },
  needs: {
    url: youngPeopleImage, // local asset, imported so Vite bundles it
    alt: 'Young people studying together at a table',
    position: 'center',
  },
  steps: {
    url: 'https://images.unsplash.com/photo-1553272725-086100aecf5e',
    alt: 'A man using a laptop in a warmly lit room',
    position: 'center 40%',
  },
  localChurch: {
    url: 'https://images.unsplash.com/photo-1604072424771-7300bc5de457',
    alt: 'A family seated in the pews of a local church',
    position: 'center',
  },
  youth: {
    url: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7',
    alt: 'A group of smiling young people posing together',
    position: 'center 30%',
  },
  fellowship: {
    url: 'https://images.unsplash.com/photo-1573164574511-73c773193279',
    alt: 'A fellowship group meeting around a table',
    position: '35% center',
  },
  multiChurch: {
    url: 'https://images.unsplash.com/photo-1641064464128-81cfd55d5c8a',
    alt: 'A church steeple with a cross lit up at night',
    position: 'center 25%',
  },
  cta: {
    url: 'https://images.unsplash.com/photo-1606503993966-e6dbe4b386fa',
    alt: 'Silhouettes of worshippers with raised hands at sunset',
    position: 'center',
  },
} satisfies Record<string, ChurchImage>;

export const hero = {
  eyebrow: 'Built for churches',
  titleLead: 'Everything Your Church',
  titleHighlight: 'Needs to Grow Together.',
  summary:
    'FaithLink gives pastors, leaders and church administrators the tools to manage members, organize ministries, plan activities and engage your community — all in one place.',
  primary: { label: 'Explore Solutions for Your Church', to: '/features' },
  secondary: { label: 'Talk to Our Team', to: '/contact' },
};

export const needs = {
  eyebrow: 'Real church challenges',
  title: 'We Understand Your Church’s Needs',
  summary:
    'Every church’s different, but the challenges are often the same. FaithLink helps you overcome them with simple, powerful tools.',
  items: [
    {
      title: 'Keeping Members Connected',
      description: 'Build stronger relationships with members through profiles, groups and real-time communication.',
      icon: UsersRound,
      tone: 'amber',
    },
    {
      title: 'Managing Youth & Bible Study Groups',
      description: 'Organize your youth and study groups, track participation and keep everyone engaged.',
      icon: GraduationCap,
      tone: 'green',
    },
    {
      title: 'Organizing Church Activities',
      description: 'Plan events, meetings and special programs with ease, and ensure nothing gets missed.',
      icon: CalendarDays,
      tone: 'violet',
    },
    {
      title: 'Tracking Participation & Learning',
      description: 'Monitor attendance, engagement and spiritual growth with simple reports and insights.',
      icon: ChartNoAxesColumnIncreasing,
      tone: 'indigo',
    },
  ] satisfies { title: string; description: string; icon: LucideIcon; tone: IconTone }[],
};

export const steps = {
  eyebrow: 'Get started in 4 simple steps',
  title: 'How Churches Use FaithLink',
  summary: 'From setup to growth, here’s how your church can get started and make the most of FaithLink.',
  items: [
    { id: 'setup', title: 'Set Up Your Church', description: 'Create your church profile, add basic details, and customize your settings.' },
    { id: 'organize', title: 'Organize Ministries and Groups', description: 'Set up departments, groups and assign leaders.' },
    { id: 'invite', title: 'Invite Members and Assign Leaders', description: 'Bring your members in, invite leaders and give them access.' },
    { id: 'run', title: 'Run Activities & Monitor Participation', description: 'Plan events, track engagement and see real progress in real time.' },
  ],
};

export const churchTypes = {
  eyebrow: 'Built for every kind of church',
  titleLead: 'Whatever Your Church Type,',
  titleHighlight: 'FaithLink Fits.',
  summary:
    'From local congregations to growing networks, FaithLink adapts to your unique needs and helps you serve your community better.',
  action: { label: 'See How It Works for Your Church', to: '/features' },
  items: [
    { title: 'Local Churches', description: 'Manage your church and keep your members connected.', icon: Church, image: images.localChurch },
    { title: 'Teens & Youth Ministries', description: 'Engage, disciple and prepare the next generation.', icon: GraduationCap, image: images.youth },
    { title: 'Church Groups & Fellowships', description: 'Build stronger bonds through shared purpose.', icon: HeartHandshake, image: images.fellowship },
    { title: 'Multi-Church Organizations', description: 'Manage and communicate from a single platform.', icon: Building2, image: images.multiChurch },
  ] satisfies { title: string; description: string; icon: LucideIcon; image: ChurchImage }[],
};

export const cta = {
  eyebrow: 'Ready to build a stronger church?',
  title: 'Join Churches Already Growing with FaithLink',
  summary:
    'Thousands of churches and youth groups are already using FaithLink to manage their communities, engage members and make a lasting impact.',
  action: { label: 'Get Started for Your Church', to: SIGN_UP_URL },
  scribble: ['Stronger Churches.', 'Brighter Generations.'],
};
