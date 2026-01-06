
import React, { useState, useEffect } from 'react';
import { SiteTheme, SiteContent } from '../types';
import { THEME_CONFIGS } from '../constants';

interface HeroProps {
  theme: SiteTheme;
  content: SiteContent['hero'];
}

const Hero: React.FC<HeroProps> = ({ theme, content }) => {
  const config = THEME_CONFIGS[theme];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % content.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [content.slides.length]);

  return (
    <div id="hero" className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden bg-stone-900">
      <div className="absolute inset-0 z-0">
        <img 
          src={content.bannerImage} 
          alt="Industrial Expert" 
          className="w-full h-full object-cover brightness-[0.45] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left-4 duration-1000">
            <span className="h-[2px] w-12 bg-white/40"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70 heading-font">
              Strategic Talent Mobility Hub
            </span>
          </div>
          
          <div className="relative h-[300px] md:h-[400px]">
            {content.slides.map((slide, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 transform ${
                  activeIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <h1 
                  style={{ color: slide.headingStyle.color, fontSize: slide.headingStyle.fontSize }}
                  className="font-black leading-[1.05] mb-8 heading-font tracking-tighter uppercase max-w-3xl"
                >
                  {slide.heading}
                </h1>
                <p 
                  style={{ color: slide.subStyle.color, fontSize: slide.subStyle.fontSize }}
                  className="font-medium leading-relaxed max-w-2xl opacity-90"
                >
                  {slide.sub}
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-10 mt-10">
            <div className="flex gap-3">
              {content.slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 transition-all duration-500 rounded-full ${
                    activeIndex === idx ? 'w-12 bg-white' : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            
            <div className="flex gap-5">
              <button 
                onClick={() => document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 rounded-full text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-stone-900 active:scale-95 heading-font"
              >
                Our Solutions
              </button>
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 rounded-full bg-white text-stone-900 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-stone-100 transition-all shadow-2xl active:scale-95 heading-font"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
