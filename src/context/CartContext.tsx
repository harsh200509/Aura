import { createContext, useContext, useState, ReactNode } from 'react';
import { products } from '../data/products';

type CartItem = {
  product: typeof products[0];
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (productId: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing) {
        return prev.map(item => item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      const product = products.find(p => p.id === productId);
      if (product) {
        return [...prev, { product, quantity: 1 }];
      }
      return prev;
    });
    setIsCartOpen(true); // Auto open cart on add
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const cartTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount,
      isCartOpen, setIsCartOpen, isSearchOpen, setIsSearchOpen, isMenuOpen, setIsMenuOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
