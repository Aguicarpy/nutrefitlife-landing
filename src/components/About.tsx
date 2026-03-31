import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AboutProps {
  data: {
    badge: string;
    title: string;
    titleItalic: string;
    imagePath: string;
    sections: { subtitle: string; content: string }[];
  };
}

export function About({ data }: AboutProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="relative py-40 bg-white overflow-hidden w-full">
      
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 pointer-events-none"
        style={{ x: scrollY * 0.05 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 mb-6 block uppercase break-words">
                {data.badge}
              </span>
              <h2 className="text-5xl md:text-6xl font-light mb-12 tracking-tighter text-black leading-tight break-words">
                {data.title} <br />
                <span className="italic font-normal">{data.titleItalic}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {data.sections.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                  className="min-w-0"
                >
                  <h3 className="text-xs font-bold tracking-widest mb-4 text-black border-b border-gray-100 pb-2 inline-block uppercase break-words">
                    {item.subtitle}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm font-light mt-4 break-words">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="lg:col-span-5 flex justify-center lg:justify-end items-center min-w-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative group max-w-full">
              <img 
                src={data.imagePath} 
                alt="NutreFitLife Group" 
                className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain grayscale opacity-10 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 ease-in-out" 
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.02))'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}