
import React, { useState } from 'react';
import { SiteTheme, SiteContent, Inquiry } from '../types';
import { THEME_CONFIGS } from '../constants';

interface ContactProps {
  theme: SiteTheme;
  content: SiteContent['contact'];
  onSubmit: (inquiry: Omit<Inquiry, 'id' | 'date'>) => void;
}

const Contact: React.FC<ContactProps> = ({ theme, content, onSubmit }) => {
  const config = THEME_CONFIGS[theme];
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'email': return "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
      case 'phone': return "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z";
      default: return "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z";
    }
  };

  return (
    <section id="contact" className="py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="heading-font mb-12 tracking-tighter uppercase leading-none font-black">
              <span style={{ color: content.titleStyle.color, fontSize: content.titleStyle.fontSize }}>{content.title}</span> <br/>
              <span style={{ color: content.subtitleStyle.color, fontSize: content.subtitleStyle.fontSize }}>{content.subtitle}</span>
            </h2>
            <div className="space-y-12">
              <div className="p-16 rounded-[4.5rem] bg-white border border-stone-200 shadow-sm">
                <h4 className="font-black heading-font text-3xl mb-10 text-stone-900 uppercase tracking-tight">Global Connectivity</h4>
                <div className="space-y-10">
                  {content.details.map((detail) => (
                    <div key={detail.id} className="flex items-start gap-10">
                      <div className="w-16 h-16 rounded-3xl bg-stone-900 shrink-0 flex items-center justify-center shadow-lg shadow-stone-200">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIcon(detail.type)} />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[12px] font-black text-stone-400 uppercase tracking-[0.5em] block mb-3 heading-font">{detail.label}</span>
                        <p className="text-2xl font-bold text-stone-900 heading-font lowercase tracking-tight">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-12 md:p-24 rounded-[6rem] shadow-2xl border border-stone-100">
            <h3 className="text-4xl font-black heading-font mb-16 text-stone-900 uppercase tracking-tighter">Secure Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-stone-400 ml-8 heading-font">Principal Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full px-10 py-7 rounded-[2rem] bg-stone-50 border-transparent outline-none focus:ring-2 focus:ring-stone-200 font-medium transition-all" />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-stone-400 ml-8 heading-font">Corporate Email</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="executive@firm.com" className="w-full px-10 py-7 rounded-[2rem] bg-stone-50 border-transparent outline-none focus:ring-2 focus:ring-stone-200 font-medium transition-all" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-stone-400 ml-8 heading-font">Partnership Brief</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Strategic requirements and project details..." className="w-full px-10 py-8 rounded-[2.5rem] bg-stone-50 border-transparent outline-none focus:ring-2 focus:ring-stone-200 font-medium resize-none transition-all" />
              </div>
              <button type="submit" className="w-full py-10 rounded-[3rem] text-white font-black text-xl uppercase tracking-[0.4em] transition-all bg-stone-900 hover:bg-stone-800 shadow-2xl active:scale-95 heading-font">
                {submitted ? 'Request Received' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
