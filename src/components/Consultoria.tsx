import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, ExternalLink } from 'lucide-react';

interface ConsultoriaProps {
  data: {
    title: string;
    description: string;
    professionalName: string;
    professionalHandle: string;
    socialLink: string;
    image?: string;
    features: { title: string; desc: string }[];
  };
}

export function Consultoria({ data }: ConsultoriaProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `¡Hola! Me gustaría agendar una consultoría nutricional con ${data.professionalName}`
    );
    window.open(`https://wa.link/ncmuob?text=${message}`, '_blank');
  };

  return (
    <section id="consultoria" className="relative py-32 bg-white overflow-hidden">
      {/* Fondo con movimiento sutil */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white"
        style={{ x: -scrollY * 0.05 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Columna de Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 mb-4 block uppercase">
              CONSULTORÍA
            </span>
            <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight text-black leading-tight">
              {data.title}
            </h2>
            <div className="w-12 h-px bg-black mb-10" />

            <p className="text-gray-600 mb-10 leading-relaxed font-medium text-base max-w-md">
              {data.description}
            </p>

            <div className="space-y-8 mb-12">
              {data.features.map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-px h-10 bg-black/10 group-hover:bg-black transition-colors mt-1" />
                  <div>
                    <h3 className="text-xs font-bold tracking-widest mb-1 uppercase text-black">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="px-10 py-4 bg-black text-white text-[10px] font-bold tracking-[0.2em] hover:bg-gray-800 transition-all active:scale-95 uppercase"
            >
              AGENDAR CONSULTA
            </button>
          </motion.div>

          {/* Columna de Imagen (Redondeada y a Color) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gray-50 flex items-center justify-center overflow-hidden relative group rounded-2xl shadow-2xl border border-gray-100">
              {data.image ? (
                <motion.img 
                  src={data.image} 
                  alt={data.professionalName} 
                  className="object-cover w-full h-full transition-all duration-700"
                  whileHover={{ scale: 1.05 }}
                />
              ) : (
                <User size={180} strokeWidth={0.5} className="text-gray-200" />
              )}
            </div>
            
            {/* Etiqueta del Profesional */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-black text-white p-8 md:p-10 shadow-2xl rounded-sm"
            >
              <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 mb-3 uppercase">
                PROFESIONAL
              </p>
              <a 
                href={data.socialLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 hover:text-gray-300 transition-colors"
              >
                <span className="text-xl md:text-2xl font-light tracking-tight italic">
                  {data.professionalHandle}
                </span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}