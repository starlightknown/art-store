import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-sm border-b border-white/10 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                     bg-clip-text text-transparent hover:from-blue-300 hover:to-pink-300 
                     transition-colors duration-300"
        >
          Cosmic Art
        </Link>
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors duration-300 
                       relative group"
          >
            <span>Home</span>
            <span
              className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent 
                           via-white to-transparent scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300"
            />
          </Link>
          <Link
            href="/shop"
            className="text-gray-400 hover:text-white transition-colors duration-300 
                       relative group"
          >
            <span>Shop</span>
            <span
              className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent 
                           via-white to-transparent scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300"
            />
          </Link>
          <Link
            href="/gallery"
            className="text-gray-400 hover:text-white transition-colors duration-300 
                       relative group"
          >
            <span>Gallery</span>
            <span
              className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent 
                           via-white to-transparent scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300"
            />
          </Link>
          <Link href="/cart" className="relative group">
            <ShoppingCart className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
