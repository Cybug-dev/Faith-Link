import { Facebook, Instagram, Twitter, Youtube, type LucideIcon } from 'lucide-react';

// Site-wide footer content. Link targets go through resolveRoute().
export const footer = {
  tagline: 'Helping churches grow, connect and make an impact through faith.',
  columns: [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Features', to: '/features' },
        { label: 'For Churches', to: '/churches' },
        { label: 'Contact', to: '/contact' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { label: 'Bible Learning', to: '/features' },
        { label: 'Live Quizzes', to: '/features' },
        { label: 'Communities', to: '/features' },
        { label: 'Church Activities', to: '/features' },
      ],
    },
  ],
  contact: {
    title: 'Contact',
    email: 'hello@faithlink.org',
    phone: '+234 812 345 6789',
    location: 'Lagos, Nigeria',
  },
  // Social profiles do not exist yet, so they resolve to "/".
  socials: [
    { label: 'Instagram', to: '/social/instagram', icon: Instagram },
    { label: 'X', to: '/social/x', icon: Twitter },
    { label: 'Facebook', to: '/social/facebook', icon: Facebook },
    { label: 'YouTube', to: '/social/youtube', icon: Youtube },
  ] satisfies { label: string; to: string; icon: LucideIcon }[],
  copyright: '© 2026 FaithLink. All rights reserved.',
};
