import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-zinc-950 border-l border-white/10 z-[70] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <h2 className="font-serif text-2xl text-white">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-sans text-sm tracking-widest uppercase">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-24 h-32 bg-zinc-900 rounded-lg overflow-hidden shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-lg text-white">{item.product.name}</h3>
                            <button onClick={() => removeFromCart(item.product.id)} className="text-white/40 hover:text-white">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-sans text-xs text-white/50 uppercase tracking-widest mt-1">{item.product.category}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 border border-white/20 rounded-full px-3 py-1">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-white/60 hover:text-white">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-sans text-xs text-white w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-white/60 hover:text-white">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-sans text-sm text-gold-400">${item.product.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-zinc-950">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-sm text-white/60 uppercase tracking-widest">Subtotal</span>
                  <span className="font-serif text-2xl text-white">${cartTotal}</span>
                </div>
                <button className="w-full py-4 bg-gold-500 text-black font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-400 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
