import { Camera, MessageCircle } from 'lucide-react';

interface FooterProps {
  data: {
    brandName: string;
    description: string;
    logoPath: string;
    officialBrands: string[];
    socials: { label: string; handle: string; link: string }[];
  };
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          
          <div className="flex items-center gap-4 min-w-0">
            <img 
              src={data.logoPath} 
              alt={data.brandName} 
              className="h-32 w-32 object-contain" 
            />
            <div className="min-w-0">
              <h3 className="text-lg font-bold tracking-tight text-black truncate uppercase">
                {data.brandName}
              </h3>
              <p className="text-gray-600 text-[11px] font-medium leading-relaxed max-w-[240px]">
                {data.description}
              </p>
            </div>
          </div>

          <div className="max-w-md">
            <span className="text-[10px] font-black tracking-[0.3em] text-gray-400 mb-4 block uppercase">Distribuidor de</span>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold tracking-widest text-gray-700 uppercase">
              {data.officialBrands.map((brand, i) => (
                <span key={i} className="hover:text-black transition-colors cursor-default border-b border-transparent hover:border-black">
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-8">
            {data.socials.map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-black hover:text-gray-500 transition-all"
                title={social.label}
              >
                {social.label.toLowerCase() === 'instagram' 
                  ? <Camera size={20} strokeWidth={2} /> 
                  : <MessageCircle size={20} strokeWidth={2} />
                }
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase hidden lg:block">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
            &copy; {new Date().getFullYear()} {data.brandName}
          </p>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-400 lowercase italic">Powered by</span>
            <a 
              href="#" 
              className="px-4 py-2 border-2 border-black text-[10px] font-black tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all rounded-none uppercase"
            >
              e-ñemu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}