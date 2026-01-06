
import React from 'react';
import { SiteTheme, SiteContent } from '../types';
import { THEME_CONFIGS } from '../constants';

interface WhyUsProps {
  theme: SiteTheme;
  content: SiteContent['whyUs'];
}

const WhyUs: React.FC<WhyUsProps> = ({ theme, content }) => {
  const config = THEME_CONFIGS[theme];

  return (
    <section id="why-us" className="py-32 bg-stone-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          <div className="lg:w-2/5">
            <h2 className="heading-font mb-10 tracking-tighter leading-none uppercase font-black">
              <span style={{ color: content.titleStyle.color, fontSize: content.titleStyle.fontSize }}>{content.title}</span> <br/>
              <span style={{ color: content.subtitleStyle.color, fontSize: content.subtitleStyle.fontSize }}>{content.subtitle}</span>
            </h2>
            <p className="text-xl text-stone-400 font-medium leading-relaxed max-w-md">
              World Recruitment Center defines excellence by combining speed with uncompromising human expertise across every major industrial vertical.
            </p>
          </div>
          
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-10">
            {content.reasons.map((r, i) => (
              <div key={i} className="group p-12 rounded-[3.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-700">
                <div className="text-4xl font-black heading-font text-stone-600 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                  {r.num}
                </div>
                <h3 className="text-2xl font-black heading-font mb-6 tracking-tight uppercase text-white">{r.title}</h3>
                <p className="text-stone-400 font-medium text-base leading-relaxed group-hover:text-stone-200 transition-colors">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
