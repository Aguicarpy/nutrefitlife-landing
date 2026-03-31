import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  data: {
    brandName: string;
    logoPath: string;
    contactLink: string;
    navItems: { label: string; sectionId: string }[];
  };
}

export function Header({ data }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 min-w-0">
          {/* LOGO / BRAND */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 min-w-0 group"
          >
            <img 
              src={data.logoPath} 
              alt={data.brandName} 
              className="h-10 w-10 md:h-12 md:w-12 object-contain" 
            />
            <span className="text-lg md:text-xl font-medium tracking-tight truncate max-w-[150px] md:max-w-none">
              {data.brandName}
            </span>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-black">
            {data.navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-[10px] font-bold tracking-[0.2em] hover:opacity-50 transition-opacity uppercase"
              >
                {item.label}
              </button>
            ))}
            <a
              href={data.contactLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-black text-white text-[10px] font-bold tracking-[0.2em] hover:bg-gray-800 transition-colors uppercase"
            >
              CONTACTO
            </a>
          </nav>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden">
          <nav className="flex flex-col p-6 gap-6">
            {data.navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-[10px] font-bold tracking-[0.2em] text-left hover:opacity-50 uppercase"
              >
                {item.label}
              </button>
            ))}
            <a
              href={data.contactLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-black text-white text-[10px] font-bold tracking-[0.2em] text-center uppercase"
            >
              CONTACTO
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}