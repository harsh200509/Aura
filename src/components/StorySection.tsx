import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [400, -400]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-[150vh] bg-ink flex items-center justify-center overflow-hidden py-32">
      <div className="absolute inset-0 pointer-events-none">
         {/* Abstract glass shapes floating */}
         <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full glass-panel opacity-20 blur-xl" />
         <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <motion.div style={{ scale, opacity }} className="relative z-10 text-center max-w-3xl px-6">
        <h2 className="font-serif text-5xl md:text-7xl font-light mb-8">
          Born from <span className="italic text-gradient-gold">Nature</span>, <br/> Perfected by Time.
        </h2>
        <p className="font-sans text-lg text-white/60 leading-relaxed">
          Every drop of Aura is a testament to the art of extraction. We source the rarest botanicals at the peak of their bloom, capturing their ephemeral beauty in a timeless, glass vessel.
        </p>
        
        {/* A 3D glass droplet */}
        <div className="mt-24 flex justify-center">
           <motion.div 
             animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
             className="w-24 h-32 rounded-full glass-panel relative overflow-hidden"
             style={{
               borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
               boxShadow: 'inset 0 0 20px rgba(255,255,255,0.2), 0 20px 40px rgba(0,0,0,0.5)'
             }}
           >
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
             <div className="absolute bottom-0 w-full h-1/2 bg-gold-500/30 blur-md" />
             <div className="absolute top-4 left-4 w-4 h-8 bg-white/40 rounded-full blur-[1px] rotate-12" />
           </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
