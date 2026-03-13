import { motion, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background Mist */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] animate-mist pointer-events-none" />
      
      {/* Text Background */}
      <motion.div style={{ y: y1, opacity }} className="absolute z-0 text-center w-full pointer-events-none">
        <h1 className="text-[18vw] font-serif leading-none tracking-tighter opacity-[0.03] text-white whitespace-nowrap select-none">
          AURA
        </h1>
      </motion.div>

      {/* 3D Bottle Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center cursor-pointer group"
        onHoverStart={() => setIsOpen(true)}
        onHoverEnd={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        style={{ y: y2 }}
        initial={{ scale: 0.8, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Interaction Hint */}
        <motion.div 
          className="absolute -top-16 text-gold-400/60 font-sans text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {isOpen ? "Release" : "Reveal"}
        </motion.div>

        {/* Mist coming out of the bottle */}
        <motion.div 
          className="absolute top-[80px] w-[250px] h-[400px] bg-gradient-to-t from-gold-400/30 via-gold-500/10 to-transparent blur-3xl rounded-t-full pointer-events-none"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            scale: isOpen ? 1.5 : 0.5,
            y: isOpen ? -200 : 50
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Cap */}
        <motion.div 
          className="w-16 h-20 rounded-t-lg relative z-20"
          style={{
            background: 'linear-gradient(90deg, #8A6D22 0%, #E6C762 30%, #FFF2A8 50%, #E6C762 70%, #8A6D22 100%)',
            boxShadow: 'inset 0px -5px 10px rgba(0,0,0,0.5), 0 15px 25px rgba(0,0,0,0.6)'
          }}
          animate={{ 
            y: isOpen ? -60 : 0,
            rotateZ: isOpen ? 5 : 0,
            x: isOpen ? 10 : 0
          }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
        >
          {/* Cap details */}
          <div className="absolute bottom-0 w-full h-2 bg-black/40" />
          <div className="absolute top-2 w-full h-1 bg-white/50" />
          <div className="absolute top-4 w-full h-px bg-black/20" />
        </motion.div>

        {/* Spray Nozzle */}
        <motion.div 
          className="w-4 h-6 bg-zinc-300 relative z-10 -mt-2"
          style={{
            background: 'linear-gradient(90deg, #52525b 0%, #e4e4e7 50%, #52525b 100%)'
          }}
          animate={{ 
            height: isOpen ? 32 : 16, 
            y: isOpen ? -30 : 0 
          }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
        />

        {/* Bottle Body */}
        <div className="relative mt-0 z-20">
          {/* Glass exterior */}
          <div 
            className="w-64 h-80 rounded-[2rem] relative overflow-hidden glass-panel flex items-end justify-center pb-4"
            style={{
              boxShadow: 'inset 0 0 40px rgba(255,255,255,0.05), 0 30px 60px rgba(0,0,0,0.9), inset 2px 2px 5px rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderBottom: '8px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* Liquid */}
            <motion.div 
              className="absolute bottom-0 w-full rounded-b-[1.5rem]"
              style={{
                background: 'linear-gradient(180deg, rgba(212,175,55,0.3) 0%, rgba(170,140,44,0.7) 100%)',
                boxShadow: 'inset 0 10px 20px rgba(255,255,255,0.15)'
              }}
              initial={{ height: '85%' }}
              animate={{ 
                height: isOpen ? '82%' : '85%',
                background: isOpen 
                  ? 'linear-gradient(180deg, rgba(212,175,55,0.2) 0%, rgba(170,140,44,0.6) 100%)' 
                  : 'linear-gradient(180deg, rgba(212,175,55,0.3) 0%, rgba(170,140,44,0.7) 100%)'
              }}
              transition={{ duration: 1 }}
            >
              {/* Liquid surface reflection */}
              <div className="w-full h-2 bg-white/20 absolute top-0 rounded-full blur-[2px]" />
            </motion.div>

            {/* Internal Pipe */}
            <div className="absolute top-0 w-1 h-full bg-white/10 left-1/2 -translate-x-1/2 blur-[0.5px]" />

            {/* Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 border border-gold-500/40 flex items-center justify-center backdrop-blur-md bg-black/30 rounded-sm shadow-2xl">
              <div className="text-center">
                <h2 className="font-serif text-gold-400 text-3xl tracking-widest">AURA</h2>
                <p className="font-sans text-[9px] tracking-[0.3em] text-white/70 uppercase mt-3">Eau de Parfum</p>
                <p className="font-sans text-[7px] tracking-[0.2em] text-gold-500/60 uppercase mt-1">100ml - 3.4 FL.OZ</p>
              </div>
            </div>

            {/* Glass Reflections */}
            <div className="absolute top-0 left-4 w-12 h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 skew-x-12 pointer-events-none" />
            <div className="absolute top-0 right-8 w-6 h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 pointer-events-none" />
            
            {/* Curved highlight */}
            <div className="absolute top-2 left-2 right-2 h-20 bg-gradient-to-b from-white/10 to-transparent rounded-t-[1.5rem] pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Foreground Text - Left */}
      <div className="absolute bottom-12 left-6 md:left-16 z-30 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="font-sans text-xs md:text-sm tracking-[0.2em] text-gold-500 uppercase mb-3">Signature Collection</p>
          <h2 className="font-serif text-4xl md:text-7xl font-light leading-tight">
            Breathe the <br /> <span className="text-gradient-gold italic">Unseen</span>
          </h2>
        </motion.div>
      </div>

      {/* Foreground Text - Right */}
      <div className="absolute bottom-12 right-6 md:right-16 z-30 flex flex-col items-end">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-right pointer-events-auto"
        >
          <p className="font-sans text-xs md:text-sm text-white/60 max-w-[250px] leading-relaxed hidden md:block">
            Interact with the bottle to release the essence of Aura. A symphony of rare botanicals and deep amber.
          </p>
          <button className="mt-6 px-8 py-4 border border-gold-500/40 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-black transition-all duration-500 backdrop-blur-sm bg-black/20">
            Add to Cart — $240
          </button>
        </motion.div>
      </div>
    </section>
  );
}
