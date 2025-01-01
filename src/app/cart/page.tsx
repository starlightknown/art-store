"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function Cart() {
  const { data: session } = useSession();
  const { items, removeItem, clearCart } = useCartStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    try {
      if (!session) {
        toast.error("Please login to place an order");
        return;
      }

      const response = await fetch("/api/send-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send confirmation email");
      }

      setShowConfirmation(true);
      clearCart();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart ✦</h1>
        {items.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-gray-400 text-center py-8">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-slate-800 rounded-lg p-4 flex items-center gap-6"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.title} ✦</h3>
                  <p className="text-slate-400">By {item.artist}</p>
                </div>
                <div className="text-purple-300 font-bold">${item.price}</div>
                <button
                  onClick={() => removeItem(item._id.toString())}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="bg-slate-800 rounded-lg p-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-2xl font-bold text-purple-300">
                  ${total}
                </span>
              </div>
              <button
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className="w-full bg-purple-500 hover:bg-purple-600 px-4 py-3 rounded-full
                         transition-all duration-300 shadow-md hover:shadow-purple-500/20
                         font-medium text-lg disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Confirm Order ✦"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Order Confirmed! ✦</h2>
            <div className="text-slate-300 space-y-4 mb-6">
              <p>
                Thank you for your purchase! Your order has been successfully
                placed.
              </p>
              <p>
                The artist will reach out to you at{" "}
                <span className="text-purple-300">{session?.user?.email}</span>{" "}
                within 24-48 hours to discuss:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Delivery arrangements</li>
                <li>Payment confirmation</li>
                <li>Any special requests you may have</li>
              </ul>
            </div>
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full
                       transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
