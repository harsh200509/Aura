import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import FragranceNotes from './components/FragranceNotes';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ink selection:bg-gold-500/30 selection:text-gold-300">
      <Navbar />
      <main>
        <Hero />
        <StorySection />
        <FragranceNotes />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
