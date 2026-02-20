import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <span className="block mb-8">
                <span className="block font-serif text-3xl tracking-widest font-bold">LOHAGARH</span>
                <span className="block text-[0.6rem] tracking-[0.4em] uppercase text-primary mt-1">Group of Hotels</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Experience the timeless elegance and warm hospitality of The Lohagarh Group, where heritage meets modern luxury.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif mb-6">Our Hotels</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Lohagarh Fort Resort</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Lohagarh Desert Resort (Jaisalmer)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Townhall Restaurant & Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mahalkhas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kothi Lohagarh</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Lohagarh Corbett Resort</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <span className="block text-white mb-1">Reservations</span>
                +91 123 456 7890
              </li> 
              <li>
                <span className="block text-white mb-1">Email</span>
                reservations@lohagarh.com
              </li>
              <li>
                <span className="block text-white mb-1">Corporate Office</span>
                Jaipur, Rajasthan, India
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6">Subscribe to receive exclusive offers and updates.</p>
            <div className="flex border-b border-white/30 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-500"
              />
              <button className="text-primary text-xs font-bold tracking-widest uppercase hover:text-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2024 The Lohagarh Group. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}