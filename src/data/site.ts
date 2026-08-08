import { Mail, MapPin, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import type {
  ContactChannel,
  FooterColumn,
  IconComponent,
  NavLink,
  Stat,
} from '@/types';

export const site = {
  name: 'Nexoffice',
  tagline: 'Building Intelligent Software for Modern Businesses',
  description:
    'Nexoffice designs and ships custom web platforms, AI products, and ERP systems for companies that need software to carry real operational weight.',
  /**
   * Shown in the contact section and footer, and used as the contact form's
   * delivery inbox. Set CONTACT_TO_EMAIL to deliver somewhere else.
   */
  email: 'nexofficeonline@gmail.com',
  phone: '+92 310 4978172',
  /** Digits only, for the `tel:` link. */
  phoneHref: '+923104978172',
  location: 'Karachi, Pakistan',
  /** Set this to the deployed origin so metadata resolves absolute URLs. */
  url: 'https://nexoffice.com',
} as const;

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Clients', href: '#testimonials' },
];

export const heroStats: Stat[] = [
  { value: '40+', label: 'Products delivered' },
  { value: '12', label: 'Countries served' },
  { value: '98%', label: 'Client retention' },
  { value: '6 wks', label: 'Median time to MVP' },
];

export const contactChannels: ContactChannel[] = [
  { icon: Mail, label: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: site.phone, href: `tel:${site.phoneHref}` },
  { icon: MapPin, label: site.location },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Quick links',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'AI Solutions', href: '#services' },
      { label: 'ERP Systems', href: '#services' },
      { label: 'SaaS Development', href: '#services' },
      { label: 'Automation', href: '#services' },
    ],
  },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
  /** Hover border tint, matching the design's per-network accent. */
  hoverClass: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: '#contact',
    icon: GithubIcon,
    hoverClass: 'hover:border-nex-violet/60',
  },
  {
    label: 'LinkedIn',
    href: '#contact',
    icon: LinkedinIcon,
    hoverClass: 'hover:border-nex-sky/60',
  },
];
