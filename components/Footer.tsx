
import React from 'react';
import { SiteTheme, SiteContent } from '../types';
import { THEME_CONFIGS } from '../constants';

interface FooterProps {
  theme: SiteTheme;
  content: SiteContent['footer'];
  headerContent: SiteContent['header'];
}

const Footer: React.FC<FooterProps> = ({ theme, content, headerContent }) => {
  const config = THEME_CONFIGS[theme];

  return (
    <footer className="bg-white border-t border-stone-100 py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-10">
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter heading-font uppercase text-stone-900">{headerContent.companyName}</span>
                <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${config.accent}`}>{headerContent.tagline}</span>
              </div>
            </div>
            <p 
              style={{ color: content.descriptionStyle.color, fontSize: content.descriptionStyle.fontSize }}
              className="leading-relaxed font-medium opacity-80"
            >
              {content.description}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-10 text-[10px] uppercase tracking-[0.5em] text-stone-400">Expertise</h4>
            <ul className="space-y-5 text-[11px] font-black text-stone-700 uppercase tracking-widest">
              {content.expertise.map((item, i) => (
                <li key={i} className="cursor-default hover:text-stone-900 transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-10 text-[10px] uppercase tracking-[0.5em] text-stone-400">Strategic Hubs</h4>
            <ul className="space-y-5 text-[11px] font-black text-stone-500 uppercase tracking-widest">
              {content.hubs.map((hub, i) => <li key={i}>{hub}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-10 text-[10px] uppercase tracking-[0.5em] text-stone-400">Compliance</h4>
            <div className="p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100">
               <p className="text-[10px] font-black text-stone-400 mb-6 uppercase tracking-widest">Verified Global Mobility</p>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center">
                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                 </div>
                 <span className="text-[10px] font-black text-stone-900 uppercase">ISO:9001 Certified</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-stone-400 uppercase tracking-[0.4em]">
          <div>© 2025 {headerContent.companyName}</div>
          <div className="flex gap-12">
            {content.legalLinks.map((link, i) => (
              <span key={i} className="cursor-default hover:text-stone-900 transition-colors">{link}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
