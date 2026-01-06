
import React from 'react';
import { SiteTheme } from '../types';
import { THEME_CONFIGS } from '../constants';

interface InsightsPanelProps {
  theme: SiteTheme;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ theme }) => {
  const config = THEME_CONFIGS[theme];

  return (
    <div className="h-full w-full flex flex-col p-12 lg:p-24 bg-stone-900">
      <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        <h2 className="text-4xl md:text-6xl font-black heading-font mb-10 text-white tracking-tighter text-center uppercase leading-none">
          AI-Powered <br/>
          <span className="text-stone-500">Mobility Intelligence</span>
        </h2>
        
        <div className="space-y-12">
          <p className="text-stone-300 text-xl md:text-2xl font-medium leading-relaxed text-center italic opacity-90">
            "We leverage proprietary AI-Powered Mobility Intelligence to drastically increase cross-border operational efficiency and selection precision."
          </p>
          
          <div className="h-[2px] w-24 bg-stone-700 mx-auto"></div>

          <p className="text-stone-400 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto font-medium">
            By integrating advanced neural recruitment frameworks and predictive geopolitical algorithmic modeling, 
            World Recruitment Center accelerates strategic technical placements across five continents. Our AI engine 
            analyzes shifting industrial landscapes in real-time, optimizing selection precision to identify 
            elite high-caliber specialists with unprecedented velocity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 text-center group hover:bg-white/10 transition-all">
              <div className="text-5xl font-black heading-font text-white mb-3 tracking-tighter">99.8%</div>
              <div className="text-[10px] font-black text-stone-500 uppercase tracking-[0.4em] heading-font">Precision Index</div>
            </div>
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 text-center group hover:bg-white/10 transition-all">
              <div className="text-5xl font-black heading-font text-white mb-3 tracking-tighter">60%</div>
              <div className="text-[10px] font-black text-stone-500 uppercase tracking-[0.4em] heading-font">Efficiency Gain</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full bg-stone-500 animate-pulse`}></div>
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-500 heading-font">System Status: Intelligence Active</span>
        </div>
        <button className="text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors border border-white/10 px-10 py-4 rounded-full hover:bg-white/5 heading-font">
          Technical Specs
        </button>
      </div>
    </div>
  );
};

export default InsightsPanel;
