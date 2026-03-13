import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import FragranceNotes from './components/FragranceNotes';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import MobileMenu from './components/MobileMenu';
import AuthModal from './components/AuthModal';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-ink selection:bg-gold-500/30 selection:text-gold-300">
          <Navbar />
          <main>
            <Hero />
            <StorySection />
            <FragranceNotes />
            <ProductGrid />
          </main>
          <Footer />
          
          {/* Modals and Drawers */}
          <CartDrawer />
          <SearchModal />
          <MobileMenu />
          <AuthModal />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
