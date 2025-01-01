"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const cartItems = useCartStore((state) => state.items);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 
                     bg-clip-text text-transparent hover:from-indigo-200 hover:to-pink-200 
                     transition-colors duration-300"
        >
          ✦ Orbiting stArt
        </Link>
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-slate-200 hover:text-white transition-colors duration-300 
                       relative group text-sm font-medium"
          >
            <span>Home ✦</span>
            <span
              className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent 
                           via-purple-400 to-transparent scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300"
            />
          </Link>
          <Link
            href="/shop"
            className="text-slate-200 hover:text-white transition-colors duration-300 
                       relative group text-sm font-medium"
          >
            <span>Shop ✦</span>
            <span
              className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent 
                           via-purple-400 to-transparent scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300"
            />
          </Link>
          <Link
            href="/gallery"
            className="text-slate-200 hover:text-white transition-colors duration-300 
                       relative group text-sm font-medium"
          >
            <span>Gallery ✦</span>
            <span
              className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent 
                           via-purple-400 to-transparent scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300"
            />
          </Link>
          {session ? (
            <>
              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-slate-200 hover:text-white transition-colors duration-300"
                >
                  ⚙️ Admin
                </Link>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-slate-200 hover:text-white transition-colors duration-300 
                             p-2 rounded-full hover:bg-white/5"
                >
                  <User className="w-5 h-5" />
                </button>
                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-slate-800/95 rounded-lg shadow-xl py-1 
                              border border-slate-700/50 backdrop-blur-md"
                  >
                    <div className="px-4 py-2 text-sm text-slate-200">
                      {session.user.email}
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-slate-200 
                               hover:bg-purple-500/20"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-white/5"
              >
                <ShoppingCart className="w-5 h-5 text-slate-200 hover:text-white transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-slate-200 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                Login ✦
              </Link>
              <Link
                href="/auth/register"
                className="bg-purple-500 hover:bg-purple-600 px-4 py-1.5 rounded-full text-sm font-medium
                         transition-all duration-300 shadow-md hover:shadow-purple-500/20"
              >
                Register ✦
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
