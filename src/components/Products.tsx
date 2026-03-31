import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from './ProductCard';
import { X, Info, ClipboardList, Zap } from 'lucide-react';

const categories = [
  { id: 'todos', name: 'TODOS' },
  { id: 'creatinas', name: 'CREATINAS' },
  { id: 'vitaminas', name: 'VITAMINAS' },
  { id: 'magnesio', name: 'MAGNESIO' },
  { id: 'herbal', name: 'HERBAL' }
];

interface ProductData {
  id: string;
  data: {
    name: string;
    description: string;
    fullDescription?: string; // Info extendida
    benefits?: string[];      // Lista de beneficios
    usage?: string;           // Recomendación de uso
    format?: string;          // Polvo, capsulas, etc.
    price: string;
    category: string;
    brand: string;
    image?: string;
  };
}

export function Products({ initialProducts }: { initialProducts: ProductData[] }) {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Ajusta según prefieras

  // Resetear página al cambiar categoría
  useEffect(() => { setCurrentPage(1); }, [activeCategory]);

  const filteredProducts = activeCategory === 'todos'
    ? initialProducts
    : initialProducts.filter(p => p.data.category === activeCategory);

  // Lógica de Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section id="products" className="relative py-32 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Cabecera (Se mantiene igual...) */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 mb-4 block uppercase">CATÁLOGO</span>
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight text-black">Nuestros Productos</h2>
          <div className="w-12 h-px bg-black mx-auto" />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-3 text-[10px] font-bold tracking-[0.2em] transition-all border ${
                activeCategory === category.id ? 'bg-black text-white border-black' : 'text-gray-400 border-gray-100 hover:border-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grilla y Mensaje de Vacío */}
        {filteredProducts.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 border border-dashed border-gray-100">
            <p className="text-gray-400 font-light tracking-widest text-sm uppercase">No hay productos disponibles en esta categoría</p>
          </motion.div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode='popLayout'>
                {currentProducts.map((product) => (
                  <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                    <ProductCard {...product.data} />
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-20 gap-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 text-[10px] font-bold transition-all ${
                      currentPage === i + 1 ? 'bg-black text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL DE DETALLE (Basado en tu imagen) */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} strokeWidth={1} />
              </button>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Imagen en el Modal */}
                <div className="aspect-square bg-gray-50 flex items-center justify-center border border-gray-100">
                  <img src={selectedProduct.data.image} alt={selectedProduct.data.name} className="object-contain w-full h-full p-8" />
                </div>

                {/* Info Detallada */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 mb-2 uppercase">{selectedProduct.data.brand}</span>
                  <h3 className="text-3xl font-light mb-4 tracking-tight">{selectedProduct.data.name}</h3>
                  <p className="text-2xl font-medium mb-8 tracking-tighter">{selectedProduct.data.price}</p>
                  
                  <div className="space-y-8 mb-10">
                    <div className="flex gap-4">
                      <Info size={18} className="text-gray-300 shrink-0" />
                      <div>
                        <h4 className="text-[10px] font-bold tracking-widest uppercase mb-2">Información</h4>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">{selectedProduct.data.fullDescription || selectedProduct.data.description}</p>
                      </div>
                    </div>

                    {selectedProduct.data.benefits && (
                      <div className="flex gap-4">
                        <Zap size={18} className="text-gray-300 shrink-0" />
                        <div>
                          <h4 className="text-[10px] font-bold tracking-widest uppercase mb-2">Beneficios</h4>
                          <ul className="text-sm text-gray-500 font-light space-y-1">
                            {selectedProduct.data.benefits.map((b, i) => <li key={i}>• {b}</li>)}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <ClipboardList size={18} className="text-gray-300 shrink-0" />
                      <div>
                        <h4 className="text-[10px] font-bold tracking-widest uppercase mb-2">Uso y Formato</h4>
                        <p className="text-sm text-gray-500 font-light italic">{selectedProduct.data.usage || "Consumir según indicación profesional."}</p>
                        <p className="text-[10px] mt-2 font-bold text-gray-300 uppercase">Formato: {selectedProduct.data.format || "No especificado"}</p>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.link/ncmuob?text=Interesado en ${selectedProduct.data.name}`}
                    target="_blank"
                    className="mt-auto w-full py-4 bg-black text-white text-[10px] font-bold tracking-[0.3em] text-center hover:bg-gray-800 transition-colors"
                  >
                    CONSULTAR DISPONIBILIDAD
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}