import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Droplet, Wind, Flame } from 'lucide-react';

const notes = [
  {
    title: "Top Notes",
    icon: Wind,
    ingredients: "Bergamot, White Pepper, Sicilian Lemon",
    description: "An effervescent opening that awakens the senses with bright citrus and a whisper of spice, disappearing like morning mist.",
  },
  {
    title: "Heart Notes",
    icon: Droplet,
    ingredients: "Damask Rose, Iris, Midnight Jasmine",
    description: "The soul of the fragrance. A lush, intoxicating floral bouquet that blooms on the skin as it warms.",
  },
  {
    title: "Base Notes",
    icon: Flame,
    ingredients: "Oud, Vanilla Bean, Smoked Amber",
    description: "A lingering, sensual foundation that anchors the scent, leaving an unforgettable trail of dark luxury.",
  }
];

export default function FragranceNotes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Distinct, non-overlapping animation phases for each note
  const topOpacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.35], [0, 1, 1, 0]);
  const topY = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.35], [50, 0, 0, -50]);
  const topScale = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.35], [0.9, 1, 1, 1.1]);

  const heartOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const heartY = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [50, 0, 0, -50]);
  const heartScale = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0.9, 1, 1, 1.1]);

  const baseOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0, 1, 1, 1]);
  const baseY = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [50, 0, 0, 0]);
  const baseScale = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0.9, 1, 1, 1]);

  const transforms = [
    { opacity: topOpacity, y: topY, scale: topScale },
    { opacity: heartOpacity, y: heartY, scale: heartScale },
    { opacity: baseOpacity, y: baseY, scale: baseScale }
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Background dynamic elements */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, rgba(120,50,0,0.2) 0%, transparent 70%)"
              ]
            )
          }}
        />

        {/* 3D Glass Orb - Fixed aspect ratio to prevent distortion */}
        <motion.div 
          className="absolute w-[500px] h-[500px] max-w-[80vw] max-h-[80vw] rounded-full glass-panel border border-white/10"
          style={{
            rotateX: useTransform(scrollYProgress, [0, 1], [0, 180]),
            rotateY: useTransform(scrollYProgress, [0, 1], [0, 360]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]),
            boxShadow: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [
                "inset 0 0 40px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.5)",
                "inset 0 0 60px rgba(212,175,55,0.2), 0 30px 80px rgba(0,0,0,0.8)",
                "inset 0 0 80px rgba(120,50,0,0.3), 0 40px 100px rgba(0,0,0,0.9)"
              ]
            )
          }}
        >
           <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent" />
           <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </motion.div>

        {/* Text Content */}
        <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center h-full justify-center">
          <h2 className="absolute top-32 font-serif text-xl md:text-2xl font-light text-white/40 uppercase tracking-widest">
            Olfactory Pyramid
          </h2>

          <div className="relative w-full flex items-center justify-center mt-16">
            {notes.map((note, index) => {
              const { opacity, y, scale } = transforms[index];

              return (
                <motion.div 
                  key={note.title}
                  style={{ opacity, y, scale }}
                  className="absolute flex flex-col items-center justify-center pointer-events-none w-full"
                >
                  <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center mb-8 border border-gold-500/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <note.icon className="w-8 h-8 text-gold-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-5xl md:text-7xl mb-4 text-white drop-shadow-lg">{note.title}</h3>
                  <p className="font-sans text-sm md:text-base tracking-[0.2em] text-gold-500 uppercase mb-6 drop-shadow-md">
                    {note.ingredients}
                  </p>
                  <p className="font-sans text-base md:text-lg text-white/80 leading-relaxed max-w-xl drop-shadow-md">
                    {note.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
