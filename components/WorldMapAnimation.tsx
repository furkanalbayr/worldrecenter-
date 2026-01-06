
import React, { useEffect, useState } from 'react';
import { TalentPath, SiteTheme, SiteContent } from '../types';
import { THEME_CONFIGS, WORLD_MAP_URL } from '../constants';

interface WorldMapProps { 
  theme: SiteTheme;
  content: SiteContent['map'];
}

const WorldMapAnimation: React.FC<WorldMapProps> = ({ theme, content }) => {
  const [paths, setPaths] = useState<TalentPath[]>([]);
  const config = THEME_CONFIGS[theme];

  useEffect(() => {
    const generatePaths = () => {
      if (content.sourcingHubs.length === 0 || content.destinationHubs.length === 0) return;
      const newPaths: TalentPath[] = [];
      for (let i = 0; i < 6; i++) {
        const from = content.sourcingHubs[Math.floor(Math.random() * content.sourcingHubs.length)];
        const to = content.destinationHubs[Math.floor(Math.random() * content.destinationHubs.length)];
        newPaths.push({
          id: Math.random().toString(36).substr(2, 9),
          from, to,
          duration: 8 + Math.random() * 6
        });
      }
      setPaths(newPaths);
    };
    generatePaths();
    const interval = setInterval(generatePaths, 12000);
    return () => clearInterval(interval);
  }, [content.sourcingHubs, content.destinationHubs]);

  return (
    <section id="mobility" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            style={{ color: content.titleStyle.color, fontSize: content.titleStyle.fontSize }}
            className="font-black heading-font tracking-tighter uppercase leading-none"
          >
            {content.title}
          </h2>
          <div className="h-1 w-20 bg-stone-900 mx-auto mt-8"></div>
        </div>

        <div className="relative aspect-[16/7] w-full bg-stone-50 overflow-hidden rounded-[4rem] border border-stone-100 shadow-inner group">
          <div className="absolute inset-0 flex items-center justify-center">
             <img 
               src={WORLD_MAP_URL} 
               className="w-full h-full object-fill filter grayscale opacity-[0.1] contrast-[0.8] group-hover:opacity-[0.12] transition-opacity duration-700"
               alt="Global Mobility Infrastructure"
             />
             <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>

          <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            {content.sourcingHubs.map((loc) => (
              <g key={loc.id} transform={`translate(${loc.x}, ${loc.y})`}>
                <circle r="5" className="fill-stone-400/80 shadow-lg" />
                <circle r="12" className="stroke-stone-300 fill-none animate-pulse" opacity="0.4" strokeWidth="1" />
                <text 
                  x={loc.dx}
                  y={loc.dy} 
                  textAnchor={loc.anchor} 
                  className="text-[10px] font-black fill-stone-400 uppercase tracking-widest heading-font"
                >
                  {loc.name}
                </text>
              </g>
            ))}

            {content.destinationHubs.map((loc) => (
              <g key={loc.id} transform={`translate(${loc.x}, ${loc.y})`}>
                <circle r="8" className="fill-stone-900" />
                <circle r="18" className="stroke-stone-900 fill-none animate-ping" opacity="0.1" strokeWidth="2" />
                <text 
                  x={loc.dx}
                  y={loc.dy} 
                  textAnchor={loc.anchor} 
                  className="text-[11px] font-black fill-stone-900 uppercase tracking-[0.2em] heading-font"
                >
                  {loc.name}
                </text>
              </g>
            ))}

            {paths.map((path) => {
              const dx = path.to.x - path.from.x;
              const dy = path.to.y - path.from.y;
              const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
              const sweep = dx > 0 ? 0 : 1;
              const d = `M${path.from.x},${path.from.y} A${dr},${dr} 0 0,${sweep} ${path.to.x},${path.to.y}`;
              
              return (
                <g key={path.id} className="opacity-40">
                  <path d={d} fill="none" className="stroke-stone-900" strokeWidth="0.5" strokeDasharray="3 6" />
                  <circle r="4" className="fill-stone-900">
                    <animateMotion dur={`${path.duration}s`} repeatCount="indefinite" path={d} />
                  </circle>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default WorldMapAnimation;
