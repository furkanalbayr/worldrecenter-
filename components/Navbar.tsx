
import React, { useState, useEffect } from 'react';
import { SiteTheme, SiteContent } from '../types';
import { NAV_LINKS, THEME_CONFIGS } from '../constants';

interface NavbarProps {
  theme: SiteTheme;
  content: SiteContent['header'];
}

const Navbar: React.FC<NavbarProps> = ({ theme, content }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const config = THEME_CONFIGS[theme];
  const style = content.headerStyle || 'modern';

  useEffect(() => {
    const handleScroll = () => {
      // Threshold increased to 700px to keep it transparent until the hero banner ends
      setIsScrolled(window.scrollY > 700);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Logo = ({ dark }: { dark?: boolean }) => (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-stone-100 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
        <img src={content.logoUrl} alt="Brand" className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col">
        <span 
          style={{ 
            color: isScrolled ? content.nameStyle.color : (dark ? '#ffffff' : content.nameStyle.color), 
            fontSize: content.nameStyle.fontSize 
          }} 
          className="font-black tracking-tighter leading-none heading-font uppercase whitespace-nowrap transition-colors duration-500"
        >
          {content.companyName}
        </span>
        <span 
          style={{ 
            color: isScrolled ? content.taglineStyle.color : (dark ? '#ffffff88' : content.taglineStyle.color), 
            fontSize: content.taglineStyle.fontSize 
          }} 
          className="font-bold tracking-[0.3em] leading-none mt-1 uppercase heading-font whitespace-nowrap transition-colors duration-500"
        >
          {content.tagline}
        </span>
      </div>
    </div>
  );

  const Links = ({ dark }: { dark?: boolean }) => (
    <div className="hidden lg:flex items-center space-x-10">
      {NAV_LINKS.map((link) => (
        <a 
          key={link.label} 
          href={link.href} 
          onClick={(e) => handleScrollTo(e, link.href)}
          className={`text-[9px] font-black uppercase tracking-[0.2em] heading-font transition-colors duration-500 ${
            isScrolled ? 'text-stone-500 hover:text-stone-900' : (dark ? 'text-white/70 hover:text-white' : 'text-stone-500 hover:text-stone-900')
          }`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );

  const Actions = ({ dark }: { dark?: boolean }) => (
    <div className="flex items-center gap-4">
      <button 
        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        className={`px-8 py-3 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all heading-font shadow-lg active:scale-95 ${config.button} ${
          !isScrolled && dark ? 'bg-white !text-stone-900 shadow-white/10' : ''
        }`}
      >
        Send Inquiry
      </button>
    </div>
  );

  const bgClasses = isScrolled 
    ? 'bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm' 
    : 'bg-transparent border-b border-transparent';

  if (style === 'centered') {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${bgClasses}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center py-4 gap-4">
          <Logo dark={!isScrolled} />
          <div className="flex items-center gap-12">
            <Links dark={!isScrolled} />
            <Actions dark={!isScrolled} />
          </div>
        </div>
      </nav>
    );
  }

  if (style === 'floating') {
    return (
      <div className={`fixed top-6 left-0 right-0 z-50 px-6 transition-all duration-700`}>
        <nav className={`max-w-6xl mx-auto border transition-all duration-700 rounded-[2.5rem] px-8 py-3 flex justify-between items-center ${
          isScrolled ? 'bg-white/90 backdrop-blur-xl border-stone-100 shadow-2xl' : 'bg-black/10 backdrop-blur-md border-white/10 shadow-none'
        }`}>
          <Logo dark={!isScrolled} />
          <div className="flex items-center gap-10">
            <Links dark={!isScrolled} />
            <div className={`h-6 w-[1px] transition-colors duration-500 ${isScrolled ? 'bg-stone-100' : 'bg-white/20'}`}></div>
            <Actions dark={!isScrolled} />
          </div>
        </nav>
      </div>
    );
  }

  if (style === 'stacked') {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 group">
        <div className={`transition-all duration-700 overflow-hidden ${isScrolled ? 'max-h-0' : 'max-h-20'} bg-stone-900 py-2`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <span className="text-[8px] font-black text-stone-500 uppercase tracking-[0.3em]">Institutional Grade Talent Mobility</span>
            <span className="text-[8px] font-black text-stone-500 uppercase tracking-[0.3em]">Secure Global Network</span>
          </div>
        </div>
        <div className={`transition-all duration-700 py-5 ${bgClasses}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <Logo dark={!isScrolled} />
            <div className="flex items-center gap-12">
              <Links dark={!isScrolled} />
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                  isScrolled ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-white text-stone-900'
                }`}
              >
                Start Partnership
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Modern (Default)
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${bgClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo dark={!isScrolled} />
          <Links dark={!isScrolled} />
          <Actions dark={!isScrolled} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
