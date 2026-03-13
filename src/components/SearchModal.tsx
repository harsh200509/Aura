import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState('');

  const filteredProducts = query === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[80] flex flex-col items-center pt-32 px-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)} 
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="w-full max-w-3xl relative">
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-white/40" />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances..."
                autoFocus
                className="w-full bg-transparent border-b-2 border-white/20 pb-4 pl-12 text-3xl md:text-5xl font-serif text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-white/20"
              />
            </div>

            <div className="w-full max-w-3xl mt-16">
              {query !== '' && filteredProducts.length === 0 && (
                <p className="text-white/50 font-sans text-center">No results found for "{query}"</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map(product => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={product.id} 
                    className="flex gap-6 group cursor-pointer"
                    onClick={() => {
                      addToCart(product.id);
                      setIsSearchOpen(false);
                      setQuery('');
                    }}
                  >
                    <div className="w-24 h-32 bg-zinc-900 rounded-lg overflow-hidden shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-serif text-xl text-white group-hover:text-gold-400 transition-colors">{product.name}</h3>
                      <p className="font-sans text-xs text-white/50 uppercase tracking-widest mt-1 mb-3">{product.category}</p>
                      <p className="font-sans text-sm text-gold-500">${product.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
