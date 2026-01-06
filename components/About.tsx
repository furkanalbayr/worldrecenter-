
import React from 'react';
import { SiteTheme, SiteContent } from '../types';
import { THEME_CONFIGS } from '../constants';

interface AboutProps {
  theme: SiteTheme;
  content: SiteContent['about'];
}

const About: React.FC<AboutProps> = ({ theme, content }) => {
  const config = THEME_CONFIGS[theme];

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <h2 className="heading-font mb-10 tracking-tighter uppercase leading-tight font-black">
              <span style={{ color: content.titleStyle.color, fontSize: content.titleStyle.fontSize }}>{content.title}</span><br/>
              <span style={{ color: content.subtitleStyle.color, fontSize: content.subtitleStyle.fontSize }}>{content.subtitle}</span>
            </h2>
            <p 
              style={{ color: content.descriptionStyle.color, fontSize: content.descriptionStyle.fontSize }}
              className="font-medium leading-relaxed mb-12 opacity-90"
            >
              {content.description}
            </p>
            
            <div className="space-y-10">
              {content.bullets.map((bullet, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="w-14 h-14 shrink-0 rounded-[1.5rem] bg-stone-900 flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={bullet.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-black heading-font mb-2 uppercase tracking-tight text-stone-900">{bullet.title}</h4>
                    <p className="text-stone-500 font-medium text-sm leading-relaxed max-w-sm">{bullet.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-stone-100 rounded-[4rem] -z-10 group-hover:bg-stone-200 transition-colors"></div>
            <img 
              src={content.image} 
              alt="Strategic Mobility" 
              className="relative rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] w-full h-[550px] object-cover contrast-[1.05]"
            />
            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[3rem] border border-stone-100 shadow-2xl animate-in zoom-in duration-700">
              <div className="text-5xl font-black heading-font text-stone-900 leading-none mb-2 tracking-tighter">{content.stats.value}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400 heading-font">{content.stats.label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
