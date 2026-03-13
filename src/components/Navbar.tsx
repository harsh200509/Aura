import { motion } from 'motion/react';
import { Menu, ShoppingBag, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsMenuOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference"
    >
      <div className="flex items-center gap-8">
        <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-gold-400 transition-colors">
          <Menu className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <div className="hidden md:flex gap-6 font-sans text-xs tracking-widest uppercase text-white/80">
          <a href="#" className="hover:text-gold-400 transition-colors">Shop</a>
          <a href="#" className="hover:text-gold-400 transition-colors">Story</a>
        </div>
      </div>

      <a href="#" className="font-serif text-2xl tracking-[0.2em] text-white absolute left-1/2 -translate-x-1/2">
        AURA
      </a>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6 font-sans text-xs tracking-widest uppercase text-white/80">
          <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-gold-400 transition-colors uppercase flex items-center gap-2">
            {user ? (
              <>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
                <span>Account</span>
              </>
            ) : (
              "Account"
            )}
          </button>
          <button onClick={() => setIsSearchOpen(true)} className="hover:text-gold-400 transition-colors uppercase">Search</button>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="text-white hover:text-gold-400 transition-colors relative">
          <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-black text-[9px] font-bold flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </motion.nav>
  );
}
