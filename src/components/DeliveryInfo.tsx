import { motion } from 'motion/react';
import { Truck, Package, MapPin, Clock, Navigation } from 'lucide-react';

interface DeliveryProps {
  data: {
    title: string;
    localDelivery: any;
    nationalShipping: any;
    locations: any[]; // Cambiado a array
  };
}

export function DeliveryInfo({ data }: DeliveryProps) {
  const { localDelivery, nationalShipping, locations } = data;

  return (
    <section id="delivery" className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 mb-4 block uppercase">LOGÍSTICA</span>
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight text-black">{data.title}</h2>
          <div className="w-12 h-px bg-black mx-auto" />
        </motion.div>

        {/* Tarjetas de Servicio */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <DeliveryCard 
            icon={<Truck size={40} strokeWidth={1} />}
            title={localDelivery.title}
            description={localDelivery.description}
            scheduleTitle={localDelivery.scheduleTitle}
            scheduleValue={localDelivery.scheduleTime}
            note={localDelivery.note}
            delay={0}
          />
          <DeliveryCard 
            icon={<Package size={40} strokeWidth={1} />}
            title={nationalShipping.title}
            description={nationalShipping.description}
            scheduleTitle={nationalShipping.scheduleTitle}
            scheduleValue={nationalShipping.scheduleDays}
            note={nationalShipping.note}
            delay={0.2}
          />
        </div>

        {/* Sección de Sedes/Mapas */}
        <div className="space-y-8">
          <div className="text-center mb-12">
             <h3 className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase">Puntos de Retiro y Ubicación</h3>
          </div>
          
          <div className={`grid gap-8 ${locations.length > 1 ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            {locations.map((loc: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black text-white flex flex-col md:flex-row overflow-hidden group border border-white/5"
              >
                {/* Lado del Mapa */}
                <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[350px] bg-gray-900 relative">
                  {loc.mapEmbedUrl ? (
                    <iframe 
                      src={loc.mapEmbedUrl}
                      className="w-full h-full border-0 grayscale contrast-125 opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                      allowFullScreen 
                      loading="lazy" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <MapPin size={48} className="text-gray-800" strokeWidth={1} />
                    </div>
                  )}
                </div>

                {/* Lado de la Info */}
                <div className="p-10 md:p-12 flex flex-col justify-center w-full md:w-1/2">
                  <MapPin size={20} className="mb-6 text-gray-600" />
                  <h4 className="text-[10px] font-bold tracking-[0.4em] text-gray-500 mb-2 uppercase">{loc.city}</h4>
                  <p className="text-3xl font-light mb-4 tracking-tighter uppercase italic">{loc.area}</p>
                  <p className="text-gray-400 font-light text-sm mb-8 leading-relaxed">
                    {loc.address}
                  </p>
                  
                  <div className="mt-auto flex flex-col gap-6">
                    <a 
                      href={loc.googleMapsUrl}
                      target="_blank"
                      className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase group/link w-fit"
                    >
                      <span className="border-b border-white/20 group-hover/link:border-white pb-1 transition-colors italic">Cómo llegar</span>
                      <Navigation size={12} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                    
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-[10px] font-bold tracking-[0.4em] text-gray-500 mb-2 uppercase">{loc.type}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliveryCard({ icon, title, description, scheduleTitle, scheduleValue, note, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white p-12 border border-gray-100 hover:border-black transition-colors duration-500 group"
    >
      <div className="mb-8 text-black group-hover:scale-110 transition-transform duration-500 inline-block">
        {icon}
      </div>
      <h3 className="text-2xl font-light mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-500 mb-8 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: description.replace(/\*\*(.*?)\*\*/g, '<span class="text-black font-normal">$1</span>') }} />
      
      <div className="flex items-center gap-4 py-4 border-t border-gray-50">
        <Clock size={18} className="text-gray-400" />
        <div className="text-xs tracking-wide text-gray-500">
          <span className="block text-black font-medium mb-0.5 uppercase tracking-widest">{scheduleTitle}</span>
          {scheduleValue}
        </div>
      </div>
      <p className="text-[10px] text-gray-300 mt-6 tracking-widest uppercase italic font-medium">{note}</p>
    </motion.div>
  );
}