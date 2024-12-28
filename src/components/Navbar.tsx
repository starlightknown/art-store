"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);

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
          {session ? (
            <>
              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Admin
                </Link>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <User className="w-6 h-6" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1">
                    <div className="px-4 py-2 text-sm text-gray-300">
                      {session.user.email}
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-300" />
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
