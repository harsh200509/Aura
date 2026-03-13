export default function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
        <div className="md:col-span-2">
          <h2 className="font-serif text-3xl tracking-widest text-white mb-6">AURA</h2>
          <p className="font-sans text-sm text-white/50 max-w-sm leading-relaxed mb-8">
            Crafting olfactory masterpieces that transcend time. Each bottle is a vessel of memories, waiting to be unlocked.
          </p>
          <div className="flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border-b border-white/20 pb-2 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors w-64 font-sans"
            />
            <button className="font-sans text-xs tracking-widest text-gold-500 uppercase hover:text-white transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="font-sans text-xs tracking-widest text-white uppercase mb-6">Explore</h3>
          <ul className="space-y-4 font-sans text-sm text-white/50">
            <li><a href="#" className="hover:text-gold-400 transition-colors">All Fragrances</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Discovery Set</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Journal</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs tracking-widest text-white uppercase mb-6">Assistance</h3>
          <ul className="space-y-4 font-sans text-sm text-white/50">
            <li><a href="#" className="hover:text-gold-400 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-sans text-xs text-white/30">
        <p>&copy; {new Date().getFullYear()} Aura Perfumes. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Pinterest</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
