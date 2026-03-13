import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function MobileMenu() {
  const { isMenuOpen, setIsMenuOpen, setIsSearchOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();

  const links = [
    { name: "Shop", action: () => setIsMenuOpen(false) },
    { name: "Story", action: () => setIsMenuOpen(false) },
    { name: user ? "My Account" : "Sign In", action: () => { setIsMenuOpen(false); setIsAuthModalOpen(true); } },
    { name: "Search", action: () => { setIsMenuOpen(false); setIsSearchOpen(true); } }
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-ink z-[90] flex flex-col items-center justify-center"
        >
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex flex-col items-center gap-8">
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                onClick={(e) => {
                  e.preventDefault();
                  link.action();
                }}
                className="font-serif text-4xl text-white hover:text-gold-400 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
