import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const products = [
  {
    id: 1,
    name: "AURA NOIR",
    category: "Extrait de Parfum",
    price: "$280",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
    accent: "from-zinc-800 to-black",
    yOffset: [100, -100]
  },
  {
    id: 2,
    name: "AURA BLANC",
    category: "Eau de Parfum",
    price: "$210",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop",
    accent: "from-zinc-200 to-zinc-400",
    yOffset: [250, -250]
  },
  {
    id: 3,
    name: "AURA ROUGE",
    category: "Limited Edition",
    price: "$320",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    accent: "from-red-900 to-black",
    yOffset: [150, -150]
  }
];

export default function ProductGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-16 bg-ink relative overflow-hidden">
      {/* Background mist */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
        className="absolute top-0 left-0 w-full h-[500px] bg-gold-500/5 blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <motion.div
            style={{ 
              x: useTransform(scrollYProgress, [0, 0.4], [-100, 0]), 
              opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]) 
            }}
          >
            <h2 className="font-serif text-5xl md:text-7xl font-light">The <span className="italic text-gradient-gold">Collection</span></h2>
          </motion.div>
          
          <motion.a 
            href="#"
            style={{ 
              x: useTransform(scrollYProgress, [0, 0.4], [100, 0]), 
              opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]) 
            }}
            className="font-sans text-xs tracking-widest text-white/60 uppercase hover:text-gold-400 transition-colors mt-6 md:mt-0 border-b border-white/20 pb-1 hover:border-gold-400"
          >
            View All Fragrances
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" style={{ perspective: '2000px' }}>
          {products.map((product) => {
            const y = useTransform(scrollYProgress, [0, 1], product.yOffset);
            const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
            
            return (
              <motion.div
                key={product.id}
                style={{ y }}
                className="group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ scale: 1.02, rotateX: 5, rotateY: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-8 glass-panel shadow-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Overlay gradient based on product accent */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${product.accent} opacity-30 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-10`} />
                  
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-[120%] object-cover object-center absolute top-[-10%]"
                    style={{ y: imgY }}
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-10" />
                  
                  {/* Quick Add Button */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 ease-out">
                    <button className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans text-xs tracking-widest uppercase hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all duration-300">
                      Quick Add
                    </button>
                  </div>
                </motion.div>
                
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-2">{product.name}</h3>
                    <p className="font-sans text-xs text-white/50 uppercase tracking-widest">{product.category}</p>
                  </div>
                  <p className="font-sans text-sm text-gold-400 mt-1">{product.price}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
