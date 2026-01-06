
import React from 'react';
import { SiteTheme } from '../types';
import { THEME_CONFIGS } from '../constants';

interface FeaturesProps {
  theme: SiteTheme;
}

const Features: React.FC<FeaturesProps> = ({ theme }) => {
  const config = THEME_CONFIGS[theme];

  const features = [
    {
      title: 'Talent Sourcing',
      desc: 'Access a vetted pool of thousands of certified industrial specialists across 5 continents.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      title: 'Global Compliance',
      desc: 'Navigating visa requirements, international labor laws, and local regulations with ease.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    {
      title: 'Relocation Support',
      desc: 'End-to-end logistics, housing, and cultural onboarding for your international workforce.',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    }
  ];

  return (
    <section id="solutions" className={`py-24 ${config.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className={`w-14 h-14 rounded-2xl ${config.primary} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                </svg>
              </div>
              <h3 className="text-2xl font-black heading-font mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {f.desc}
              </p>
              <button className={`mt-8 text-sm font-bold ${config.accent.replace('text-', 'text-')} hover:opacity-80 transition-opacity flex items-center gap-2`}>
                Learn More 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
