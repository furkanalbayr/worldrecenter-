
import React from 'react';
import { SiteTheme, SiteContent } from '../types';
import { THEME_CONFIGS } from '../constants';

interface SolutionsProps {
  theme: SiteTheme;
  content: SiteContent['solutions'];
  sectors: SiteContent['sectors'];
}

const Solutions: React.FC<SolutionsProps> = ({ theme, content, sectors }) => {
  const config = THEME_CONFIGS[theme];

  return (
    <div id="solutions">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 
              style={{ color: content.titleStyle.color, fontSize: content.titleStyle.fontSize }}
              className="font-black heading-font tracking-tighter uppercase leading-tight"
            >
              {content.title}
            </h2>
            <div className="h-0.5 w-12 bg-stone-900 mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {content.items.map((sol, i) => (
              <div key={i} className="group border-b border-stone-100 pb-12 pt-4 hover:border-stone-900 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-stone-50 text-stone-900 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sol.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-black heading-font mb-4 text-stone-900 uppercase tracking-tight">{sol.title}</h3>
                <ul className="space-y-3">
                  {sol.items.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-stone-600 font-medium text-sm body-font leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-stone-300 shrink-0 mt-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sectors" className="py-24 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4 heading-font">Global Reach</div>
            <h2 
              style={{ color: sectors.titleStyle.color, fontSize: sectors.titleStyle.fontSize }}
              className="font-black heading-font tracking-tighter uppercase"
            >
              {sectors.title}
            </h2>
          </div>

          <div className="relative">
            <div className="animate-scroll">
              {[...sectors.items, ...sectors.items].map((sector, i) => (
                <div 
                  key={i} 
                  className="min-w-[400px] mx-6 bg-white p-12 rounded-[3rem] shadow-sm border border-stone-100 hover:shadow-2xl hover:-translate-y-2 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-stone-50 text-stone-400 flex items-center justify-center mb-8 group-hover:text-stone-900 transition-colors">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sector.icon} />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-black heading-font mb-4 text-stone-900 uppercase tracking-tighter">{sector.name}</h4>
                  <p className="text-base text-stone-500 font-medium leading-relaxed body-font">{sector.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
