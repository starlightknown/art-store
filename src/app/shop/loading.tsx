export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-slate-800 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-800/80 rounded-xl overflow-hidden backdrop-blur-sm
                          border border-slate-700/50 shadow-xl"
              >
                <div className="h-64 bg-slate-700/50"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 w-3/4 bg-slate-700/50 rounded-lg"></div>
                  <div className="h-4 w-1/2 bg-slate-700/50 rounded-lg"></div>
                  <div className="h-4 w-full bg-slate-700/50 rounded-lg"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 w-20 bg-slate-700/50 rounded-lg"></div>
                    <div className="h-8 w-28 bg-slate-700/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
