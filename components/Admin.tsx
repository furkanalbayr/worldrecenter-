
import React, { useState, useRef } from 'react';
import { SiteContent, Inquiry, ContactDetail, MapHub, HeaderStyle, TextStyle } from '../types';
import { WORLD_MAP_URL } from '../constants';

interface AdminProps {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
  inquiries: Inquiry[];
  setInquiries: (inquiries: Inquiry[]) => void;
  onClose: () => void;
}

const Admin: React.FC<AdminProps> = ({ content, setContent, inquiries, setInquiries, onClose }) => {
  const [activeTab, setActiveTab] = useState<'header' | 'hero' | 'about' | 'solutions' | 'why' | 'map' | 'contact' | 'footer' | 'inquiries'>('header');
  const [pendingPoint, setPendingPoint] = useState<{ x: number, y: number } | null>(null);
  const [pendingPointData, setPendingPointData] = useState({ name: '', type: 'source' as 'source' | 'dest' });
  const mapRef = useRef<SVGSVGElement>(null);

  const updateContent = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let ref = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      ref = ref[keys[i]];
    }
    ref[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const updateArrayItem = (path: string, index: number, field: string, value: any) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let ref = newContent;
    for (let i = 0; i < keys.length; i++) {
      ref = ref[keys[i]];
    }
    ref[index] = { ...ref[index], [field]: value };
    setContent(newContent);
  };

  const addArrayItem = (path: string, defaultValue: any) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let ref = newContent;
    for (let i = 0; i < keys.length; i++) {
      ref = ref[keys[i]];
    }
    ref.push(defaultValue);
    setContent(newContent);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let ref = newContent;
    for (let i = 0; i < keys.length; i++) {
      ref = ref[keys[i]];
    }
    ref.splice(index, 1);
    setContent(newContent);
  };

  const StyleControls = ({ path, style }: { path: string, style: TextStyle }) => (
    <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-xl border border-stone-200 mt-2 shadow-sm w-max">
      <div className="flex items-center gap-2 pr-4 border-r border-stone-100">
        <div className="w-4 h-4 rounded-full border border-stone-200 overflow-hidden shrink-0" style={{ backgroundColor: style.color }}>
          <input 
            type="color" 
            className="opacity-0 w-full h-full cursor-pointer" 
            value={style.color} 
            onChange={(e) => updateContent(`${path}.color`, e.target.value)} 
          />
        </div>
        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{style.color}</span>
      </div>
      <div className="flex items-center gap-2 pl-2">
        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Size</span>
        <input 
          type="text" 
          className="w-16 bg-transparent text-[10px] font-black text-stone-900 border-b border-stone-200 outline-none text-center" 
          value={style.fontSize} 
          onChange={(e) => updateContent(`${path}.fontSize`, e.target.value)} 
          placeholder="e.g. 18px"
        />
      </div>
    </div>
  );

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent('header.logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!mapRef.current) return;
    const svg = mapRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const cursor = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    setPendingPoint({ x: Math.round(cursor.x), y: Math.round(cursor.y) });
  };

  const applyPendingPoint = () => {
    if (!pendingPoint) return;
    const newHub: MapHub = {
      id: Math.random().toString(36).substr(2, 9),
      name: pendingPointData.name || 'New Location',
      x: pendingPoint.x,
      y: pendingPoint.y,
      anchor: 'middle',
      dx: 0,
      dy: pendingPointData.type === 'source' ? 15 : -15
    };
    if (pendingPointData.type === 'source') addArrayItem('map.sourcingHubs', newHub);
    else addArrayItem('map.destinationHubs', newHub);
    setPendingPoint(null);
    setPendingPointData({ name: '', type: 'source' });
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-main text-stone-900 overflow-hidden">
      <header className="bg-white border-b border-stone-200 p-6 flex justify-between items-center shrink-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-stone-100 flex items-center justify-center p-1.5 overflow-hidden">
            <img src={content.header.logoUrl} className="w-full h-full object-contain" alt="Logo" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-tighter">Studio Pro <span className="text-stone-300 text-[10px] ml-2 tracking-widest">v6.0</span></h1>
        </div>
        <button onClick={onClose} className="px-8 py-2.5 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl">Exit Admin</button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto p-6 gap-6 overflow-hidden">
        <aside className="lg:w-72 space-y-1.5 shrink-0 overflow-y-auto pr-2 no-scrollbar">
          {['header', 'hero', 'about', 'solutions', 'why', 'map', 'contact', 'footer', 'inquiries'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`w-full text-left px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === tab ? 'bg-stone-900 text-white border-stone-900 shadow-xl' : 'bg-white text-stone-400 border-white hover:border-stone-200'}`}
            >
              {tab.replace('-', ' ')}
              {tab === 'inquiries' && inquiries.length > 0 && <span className="ml-3 bg-red-500 text-white px-2 py-0.5 rounded-full text-[8px]">{inquiries.length}</span>}
            </button>
          ))}
        </aside>

        <main className="flex-1 bg-white rounded-[3rem] shadow-2xl p-10 lg:p-14 overflow-y-auto custom-scrollbar border border-stone-100">
          
          {activeTab === 'header' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {(['modern', 'centered', 'floating', 'stacked'] as HeaderStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => updateContent('header.headerStyle', style)}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-4 text-left ${content.header.headerStyle === style ? 'border-stone-900 bg-stone-50 shadow-lg' : 'border-stone-100 hover:border-stone-200'}`}
                  >
                    <div className="h-8 w-full rounded-lg bg-stone-200/50 flex items-center px-2 gap-2">
                      <div className="w-3 h-3 rounded-full bg-stone-400"></div>
                      <div className="h-1 flex-1 bg-stone-300 rounded"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{style}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Company Name</label>
                  <input className="w-full p-5 bg-stone-50 rounded-2xl border-none font-bold text-lg" value={content.header.companyName} onChange={(e) => updateContent('header.companyName', e.target.value)} />
                  <StyleControls path="header.nameStyle" style={content.header.nameStyle} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Tagline</label>
                  <input className="w-full p-5 bg-stone-50 rounded-2xl border-none font-bold text-lg" value={content.header.tagline} onChange={(e) => updateContent('header.tagline', e.target.value)} />
                  <StyleControls path="header.taglineStyle" style={content.header.taglineStyle} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-12">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Banner Background URL</label>
                <input className="w-full p-5 bg-stone-50 rounded-2xl border-none shadow-inner" value={content.hero.bannerImage} onChange={(e) => updateContent('hero.bannerImage', e.target.value)} />
              </div>
              <div className="space-y-8">
                {content.hero.slides.map((slide, i) => (
                  <div key={i} className="p-8 bg-stone-50 rounded-[3rem] border border-stone-100 space-y-6 relative group">
                    <button onClick={() => removeArrayItem('hero.slides', i)} className="absolute top-8 right-8 text-red-400 text-[10px] font-black uppercase opacity-0 group-hover:opacity-100">Remove</button>
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest ml-4">Slide Heading</span>
                      <input className="w-full p-4 rounded-xl border-none font-black text-2xl shadow-sm" value={slide.heading} onChange={(e) => updateArrayItem('hero.slides', i, 'heading', e.target.value)} />
                      <StyleControls path={`hero.slides.${i}.headingStyle`} style={slide.headingStyle} />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest ml-4">Slide Description</span>
                      <textarea className="w-full p-4 rounded-xl border-none text-sm font-medium shadow-sm" value={slide.sub} onChange={(e) => updateArrayItem('hero.slides', i, 'sub', e.target.value)} rows={2} />
                      <StyleControls path={`hero.slides.${i}.subStyle`} style={slide.subStyle} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Section Title</label>
                  <input className="w-full p-5 bg-stone-50 rounded-2xl font-black text-xl" value={content.about.title} onChange={(e) => updateContent('about.title', e.target.value)} />
                  <StyleControls path="about.titleStyle" style={content.about.titleStyle} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Subtitle</label>
                  <input className="w-full p-5 bg-stone-50 rounded-2xl font-black text-xl" value={content.about.subtitle} onChange={(e) => updateContent('about.subtitle', e.target.value)} />
                  <StyleControls path="about.subtitleStyle" style={content.about.subtitleStyle} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Narrative Description</label>
                <textarea className="w-full p-6 bg-stone-50 rounded-[3rem] text-sm font-medium leading-relaxed shadow-inner" value={content.about.description} onChange={(e) => updateContent('about.description', e.target.value)} rows={5} />
                <StyleControls path="about.descriptionStyle" style={content.about.descriptionStyle} />
              </div>
            </div>
          )}

          {activeTab === 'solutions' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <h2 className="text-3xl font-black uppercase tracking-tight">Solutions & Sectors</h2>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Solutions Main Title</label>
                <input className="w-full p-5 bg-stone-50 rounded-2xl font-black text-xl" value={content.solutions.title} onChange={(e) => updateContent('solutions.title', e.target.value)} />
                <StyleControls path="solutions.titleStyle" style={content.solutions.titleStyle} />
              </div>
              
              <div className="space-y-4 pt-10 border-t border-stone-100">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Sectors Section Title</label>
                <input className="w-full p-5 bg-stone-50 rounded-2xl font-black text-xl" value={content.sectors.title} onChange={(e) => updateContent('sectors.title', e.target.value)} />
                <StyleControls path="sectors.titleStyle" style={content.sectors.titleStyle} />
              </div>
            </div>
          )}

          {activeTab === 'why' && (
            <div className="space-y-12">
              <h2 className="text-3xl font-black uppercase tracking-tight">Competitive Advantage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Why Us Title</label>
                  <input className="w-full p-5 bg-stone-50 rounded-2xl font-black text-xl" value={content.whyUs.title} onChange={(e) => updateContent('whyUs.title', e.target.value)} />
                  <StyleControls path="whyUs.titleStyle" style={content.whyUs.titleStyle} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Why Us Accent Title</label>
                  <input className="w-full p-5 bg-stone-50 rounded-2xl font-black text-xl" value={content.whyUs.subtitle} onChange={(e) => updateContent('whyUs.subtitle', e.target.value)} />
                  <StyleControls path="whyUs.subtitleStyle" style={content.whyUs.subtitleStyle} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-12">
              <h2 className="text-3xl font-black uppercase tracking-tight">Contact Styling</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Contact Title</label>
                  <input className="w-full p-5 bg-stone-50 rounded-2xl font-black text-xl" value={content.contact.title} onChange={(e) => updateContent('contact.title', e.target.value)} />
                  <StyleControls path="contact.titleStyle" style={content.contact.titleStyle} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Contact Subtitle</label>
                  <input className="w-full p-5 bg-stone-50 rounded-2xl font-black text-xl" value={content.contact.subtitle} onChange={(e) => updateContent('contact.subtitle', e.target.value)} />
                  <StyleControls path="contact.subtitleStyle" style={content.contact.subtitleStyle} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-12">
              <h2 className="text-3xl font-black uppercase tracking-tight">Footer Controls</h2>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Footer Description</label>
                <textarea className="w-full p-6 bg-stone-50 rounded-3xl text-sm font-medium leading-relaxed shadow-inner" value={content.footer.description} onChange={(e) => updateContent('footer.description', e.target.value)} rows={3} />
                <StyleControls path="footer.descriptionStyle" style={content.footer.descriptionStyle} />
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="space-y-12">
              <div className="relative bg-stone-950 rounded-[4rem] p-8 shadow-2xl overflow-hidden border border-white/5">
                <svg ref={mapRef} onClick={handleMapClick} viewBox="0 0 1000 500" className="w-full h-auto cursor-crosshair">
                  <image href={WORLD_MAP_URL} x="0" y="0" width="1000" height="500" opacity="0.25" style={{ filter: 'grayscale(1)' }} />
                  {content.map.sourcingHubs.map(h => (
                    <circle key={h.id} cx={h.x} cy={h.y} r="5" className="fill-stone-500/60" />
                  ))}
                  {content.map.destinationHubs.map(h => (
                    <circle key={h.id} cx={h.x} cy={h.y} r="8" className="fill-white/80 shadow-xl" />
                  ))}
                </svg>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Map Section Title</label>
                <input className="w-full p-5 bg-stone-50 rounded-2xl font-black text-xl" value={content.map.title} onChange={(e) => updateContent('map.title', e.target.value)} />
                <StyleControls path="map.titleStyle" style={content.map.titleStyle} />
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-8 bg-stone-50 rounded-[3rem] border border-stone-100">
                  <h4 className="text-xl font-black">{inq.name}</h4>
                  <p className="text-sm text-stone-500">{inq.company} • {inq.date}</p>
                  <p className="mt-4 p-6 bg-white rounded-2xl text-stone-600 font-medium">{inq.message}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
