
export enum SiteTheme {
  CORPORATE = 'corporate',
  INDUSTRIAL = 'industrial',
  GLOBAL = 'global',
  MINIMALIST = 'minimalist',
  DYNAMIC = 'dynamic'
}

export type HeaderStyle = 'modern' | 'centered' | 'floating' | 'stacked';

export interface TextStyle {
  color: string;
  fontSize: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactDetail {
  id: string;
  label: string;
  value: string;
  type: 'email' | 'phone' | 'address' | 'text';
}

export interface MapHub {
  id: string;
  name: string;
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
  dx: number;
  dy: number;
}

export interface SiteContent {
  header: {
    companyName: string;
    tagline: string;
    logoUrl: string;
    headerStyle: HeaderStyle;
    nameStyle: TextStyle;
    taglineStyle: TextStyle;
  };
  hero: {
    slides: { heading: string; headingStyle: TextStyle; sub: string; subStyle: TextStyle }[];
    bannerImage: string;
  };
  about: {
    title: string;
    titleStyle: TextStyle;
    subtitle: string;
    subtitleStyle: TextStyle;
    description: string;
    descriptionStyle: TextStyle;
    image: string;
    bullets: { title: string; desc: string; icon: string }[];
    stats: { value: string; label: string };
  };
  solutions: {
    title: string;
    titleStyle: TextStyle;
    items: { title: string; items: string[]; icon: string }[];
  };
  sectors: {
    title: string;
    titleStyle: TextStyle;
    items: { name: string; desc: string; icon: string }[];
  };
  whyUs: {
    title: string;
    titleStyle: TextStyle;
    subtitle: string;
    subtitleStyle: TextStyle;
    reasons: { num: string; title: string; desc: string }[];
  };
  map: {
    title: string;
    titleStyle: TextStyle;
    sourcingHubs: MapHub[];
    destinationHubs: MapHub[];
  };
  contact: {
    title: string;
    titleStyle: TextStyle;
    subtitle: string;
    subtitleStyle: TextStyle;
    accent: string;
    details: ContactDetail[];
  };
  footer: {
    description: string;
    descriptionStyle: TextStyle;
    hubs: string[];
    expertise: string[];
    legalLinks: string[];
  };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
}

export interface TalentPath {
  id: string;
  from: { x: number; y: number; name: string };
  to: { x: number; y: number; name: string };
  duration: number;
}
