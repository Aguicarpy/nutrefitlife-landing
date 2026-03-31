import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  data: {
    titleMain: string;
    titleItalic: string;
    description: string;
    logoPath: string;
    whatsappLink: string;
    primaryBtnText: string;
    secondaryBtnText: string;
  };
}

export function Hero({ data }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white w-full">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none"
        style={{ y: scrollY * 0.5 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center min-w-0"
        >
          <motion.img
            src={data.logoPath} 
            alt={data.titleMain}
            className="w-48 h-48 md:w-56 md:h-56 mx-auto mb-12 object-contain select-none"
            style={{ y: -scrollY * 0.2 }}
          />

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 text-black leading-tight break-words">
            {data.titleMain}<br />
            <span className="font-normal italic">{data.titleItalic}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light break-words">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={data.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-black text-white text-[10px] font-bold tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-sm active:scale-95 text-center uppercase"
            >
              {data.primaryBtnText}
            </a>
            <button
              onClick={() => scrollToSection('products')}
              className="w-full sm:w-auto px-10 py-4 border border-black text-black text-[10px] font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-colors active:scale-95 uppercase"
            >
              {data.secondaryBtnText}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}