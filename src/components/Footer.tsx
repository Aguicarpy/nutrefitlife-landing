import { MapPin, MessageCircle } from 'lucide-react';

interface FooterProps {
  data: {
    brandName: string;
    description: string;
    logoPath: string;
    officialBrands: string[];
    socials: { label: string; handle: string; link: string }[];
    credits: { designer: string; expert: string };
  };
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-black text-white py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-20 mb-20">
          
          {/* BRAND SECTION */}
          <div className="space-y-6">
            <img 
              src={data.logoPath} 
              alt={data.brandName} 
              className="w-14 h-14 invert opacity-90 object-contain" 
            />
            <div>
              <h3 className="text-xl font-light tracking-tight mb-2">{data.brandName}</h3>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs font-light">
                {data.description}
              </p>
            </div>
          </div>

          {/* BRANDS SECTION */}
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-gray-600 mb-8 block uppercase">MARCAS OFICIALES</span>
            <div className="space-y-3 text-sm font-light text-gray-400 italic">
              {data.officialBrands.map((brand, i) => (
                <p key={i} className="hover:text-white transition-colors cursor-default">{brand}</p>
              ))}
            </div>
          </div>

          {/* CONTACT & SOCIAL SECTION */}
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-gray-600 mb-8 block uppercase">CONTACTO</span>
            <div className="space-y-6">
              {data.socials.map((social, i) => (
                <div key={i} className="flex items-center gap-4 text-xs font-light">
                  {social.label.toLowerCase() === 'instagram' ? <MapPin size={14} className="text-gray-600" /> : <MessageCircle size={14} className="text-gray-600" />}
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors tracking-widest uppercase text-[10px] font-bold"
                  >
                    {social.handle}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600">
          <p className="text-[10px] tracking-widest uppercase font-medium">
            &copy; {new Date().getFullYear()} {data.brandName}. All Rights Reserved.
          </p>
          
          <div className="flex gap-8 text-[9px] tracking-[0.2em] uppercase font-bold">
            <div className="flex flex-col items-end">
              <span className="text-gray-800 mb-1 tracking-[0.1em] font-normal lowercase italic">Design by</span>
              <span className="text-gray-400">{data.credits.designer}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gray-800 mb-1 tracking-[0.1em] font-normal lowercase italic">Expert advice</span>
              <span className="text-gray-400">{data.credits.expert}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}