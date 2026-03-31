import { MessageCircle, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  brand: string;
  isOfficial: boolean;
  image?: string;
  category?: string;
}

export function ProductCard({ name, description, price, image, brand, isOfficial }: ProductCardProps) {

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`¡Hola! Estoy interesado en: ${name} (${brand})\nPrecio: ${price}`);
    window.open(`https://wa.link/ncmuob?text=${message}`, '_blank');
  };

  return (
    <div className="group bg-white border border-gray-100 overflow-hidden hover:border-black transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col h-full">
      <div className="aspect-square bg-gray-50 flex items-center justify-center border-b border-gray-100 relative overflow-hidden p-6">
        
        {isOfficial && (
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-black px-3 py-1 shadow-sm">
        <ShieldCheck size={12} className="text-black" />
        <span className="text-[8px] font-bold tracking-[0.1em] text-black uppercase">Distribuidor Oficial</span>
      </div>
    )}

        {image ? (
    <img 
      src={image} 
      alt={name} 
      className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700" 
    />
  ) : (
          <div className="text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
            <MessageCircle size={80} strokeWidth={1} />
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-2 uppercase">
          {brand}
        </span>
        
        <h3 className="text-xl font-light mb-3 tracking-tight text-black leading-tight min-h-[3.5rem]">
          {name}
        </h3>
        
        <p className="text-sm text-gray-400 mb-8 font-light line-clamp-2 flex-grow">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-xl font-medium tracking-tighter text-black">{price}</span>
          <button
            onClick={handleWhatsAppClick}
            className="px-6 py-2.5 bg-black text-white text-[10px] font-bold tracking-[0.2em] hover:bg-gray-800 transition-all active:scale-95"
          >
            CONSULTAR
          </button>
        </div>
      </div>
    </div>
  );
}