
import { SiteTheme, NavLink, SiteContent } from './types';

export const THEME_CONFIGS = {
  [SiteTheme.MINIMALIST]: {
    name: 'Elite Minimalist',
    primary: 'bg-stone-900',
    accent: 'text-stone-500',
    button: 'bg-stone-900 hover:bg-stone-800',
    bg: 'bg-stone-50',
    font: 'font-main' 
  }
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'Mobility', href: '#mobility' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' }
];

export const INITIAL_CONTENT: SiteContent = {
  header: {
    companyName: "World Recruitment Center",
    tagline: "GLOBAL TALENT SOLUTIONS",
    logoUrl: "https://worldrecenter.com/d8d8ecb5-6840-418f-bbb0-9a626be9b6fc",
    headerStyle: 'modern',
    nameStyle: { color: '#1c1917', fontSize: '13px' },
    taglineStyle: { color: '#78716c', fontSize: '9px' }
  },
  hero: {
    bannerImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2400",
    slides: [
      { 
        heading: "The way the world works has changed.", 
        headingStyle: { color: '#ffffff', fontSize: '60px' },
        sub: "Skills are evolving at record speed, and companies compete for the same high-caliber talent across continents.",
        subStyle: { color: '#ffffffcc', fontSize: '18px' }
      },
      { 
        heading: "Strategic Partnership.", 
        headingStyle: { color: '#ffffff', fontSize: '60px' },
        sub: "In this new reality, you need more than CVs — you need a partner who understands global markets, compliance, and people.",
        subStyle: { color: '#ffffffcc', fontSize: '18px' }
      }
    ]
  },
  about: {
    title: "Defining the",
    titleStyle: { color: '#1c1917', fontSize: '48px' },
    subtitle: "Global Horizon",
    subtitleStyle: { color: '#78716c', fontSize: '48px' },
    description: "World Recruitment Center is a global recruitment partner specializing in cross-border hiring and international talent mobility. We support companies that want to build multicultural, future-ready teams.",
    descriptionStyle: { color: '#44403c', fontSize: '18px' },
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      { title: "Human Expertise", desc: "Dedicated consultants who understand local market intricacies and cultural alignment.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
      { title: "Smart Technology", desc: "Leveraging advanced digital ecosystems to streamline the international vetting process.", icon: "M13 10V3L4 14h7v7l9-11h-7z" }
    ],
    stats: { value: "15+", label: "Years Strategic Experience" }
  },
  solutions: {
    title: "Strategic Solutions",
    titleStyle: { color: '#1c1917', fontSize: '24px' },
    items: [
      { title: "Executive Search", items: ["Industry headhunting", "Cross-border compliance", "Relocation management"], icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
      { title: "Contract Solutions", items: ["Rapid project deployment", "Flexible workforce scaling", "Technical skill vetting"], icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7" }
    ]
  },
  sectors: {
    title: "Sectors We Serve",
    titleStyle: { color: '#1c1917', fontSize: '32px' },
    items: [
      { name: "Energy & Renewables", desc: "Wind, solar, and power generation specialists.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
      { name: "Infrastructure", desc: "Large-scale civil engineering and construction.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" }
    ]
  },
  whyUs: {
    title: "Strategic",
    titleStyle: { color: '#ffffff', fontSize: '64px' },
    subtitle: "Edge.",
    subtitleStyle: { color: '#78716c', fontSize: '64px' },
    reasons: [
      { num: "01", title: "Global Reach", desc: "Deep local market knowledge across Africa, South Asia, and the Middle East." },
      { num: "02", title: "Quality Velocity", desc: "Tech-enhanced screening delivers rapid time-to-hire without compromise." }
    ]
  },
  map: {
    title: "We work globally.",
    titleStyle: { color: '#1c1917', fontSize: '60px' },
    sourcingHubs: [
      { id: '1', name: 'South Africa', x: 530, y: 410, anchor: 'middle', dx: 0, dy: 22 },
      { id: '9', name: 'Istanbul', x: 542, y: 182, anchor: 'end', dx: -12, dy: 10 },
    ],
    destinationHubs: [
      { id: 'd1', name: 'USA', x: 200, y: 200, anchor: 'middle', dx: 0, dy: -18 },
      { id: 'd3', name: 'UK', x: 465, y: 145, anchor: 'end', dx: -12, dy: -5 },
    ]
  },
  contact: {
    title: "Strategic",
    titleStyle: { color: '#1c1917', fontSize: '72px' },
    subtitle: "Partnership.",
    subtitleStyle: { color: '#78716c', fontSize: '72px' },
    accent: "Partnership.",
    details: [
      { id: '1', label: 'Direct Channel', value: 'partners@worldrecenter.com', type: 'email' }
    ]
  },
  footer: {
    description: "We define excellence in cross-border hiring. Connecting industrial leaders with the world's most capable specialists.",
    descriptionStyle: { color: '#6b7280', fontSize: '14px' },
    hubs: ["Istanbul, TR", "Dubai, UAE", "Singapore, SG", "London, UK"],
    expertise: ["Search & Selection", "Contract Solutions", "Visa Compliance", "Market Advisory"],
    legalLinks: ["Privacy Policy", "Terms of Service", "Global Compliance"]
  }
};

export const WORLD_MAP_URL = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2400";
export const LOGO_URL = "https://worldrecenter.com/d8d8ecb5-6840-418f-bbb0-9a626be9b6fc";
