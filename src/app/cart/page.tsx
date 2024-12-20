import Navbar from "@/components/Navbar";

export default function Cart() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-slate-800 rounded-lg p-6">
          <p className="text-gray-400 text-center py-8">Your cart is empty</p>
        </div>
      </main>
    </div>
  );
}
