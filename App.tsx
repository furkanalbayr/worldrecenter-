
import React, { useState, useEffect } from 'react';
import { SiteTheme, SiteContent, Inquiry } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Solutions from './components/Solutions';
import WhyUs from './components/WhyUs';
import WorldMapAnimation from './components/WorldMapAnimation';
import InsightsPanel from './components/InsightsPanel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import { INITIAL_CONTENT } from './constants';

const App: React.FC = () => {
  const theme = SiteTheme.MINIMALIST;
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('site_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // Listen for hash changes to toggle admin mode
  useEffect(() => {
    const checkHash = () => {
      setIsAdmin(window.location.hash === '#admin-portal');
    };
    
    // Check on initial load
    checkHash();
    
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {
    localStorage.setItem('site_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const closeAdmin = () => {
    window.location.hash = ''; // Clear hash to return to main site
  };

  if (isAdmin) {
    return (
      <Admin 
        content={content} 
        setContent={setContent} 
        inquiries={inquiries}
        setInquiries={setInquiries}
        onClose={closeAdmin} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar theme={theme} content={content.header} />
      
      <main>
        <Hero theme={theme} content={content.hero} />
        <About theme={theme} content={content.about} />
        <Solutions theme={theme} content={content.solutions} sectors={content.sectors} />
        <WhyUs theme={theme} content={content.whyUs} />
        <WorldMapAnimation theme={theme} content={content.map} />

        <section id="insights" className="py-8 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-stone-200">
              <InsightsPanel theme={theme} />
            </div>
          </div>
        </section>
        
        <Contact theme={theme} content={content.contact} onSubmit={addInquiry} />
      </main>

      <Footer theme={theme} content={content.footer} headerContent={content.header} />
    </div>
  );
};

export default App;
