"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Info, UtensilsCrossed, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuProvider, useMenu } from "@/context/MenuContext";
import { DishCard } from "@/components/DishCard";
import { DishDetailModal } from "@/components/DishDetailModal";

function MenuContent() {
  const { categories, menuItems, loading } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showItemDetail, setShowItemDetail] = useState<any>(null);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category?._id === selectedCategory || item.category === selectedCategory || item.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedItems = categories.filter(c => c.name !== "All").map(cat => ({
    category: cat,
    items: filteredItems.filter(item => item.category?._id === cat._id || item.category === cat._id)
  })).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#2d5a27]/10 selection:text-[#2d5a27] overflow-x-hidden">
      {/* Premium Header/Search Section */}
      <div className="sticky top-0 z-40 bg-black px-6 pt-10 pb-6 space-y-8 border-b border-zinc-100/50 shadow-sm animate-in slide-in-from-top duration-1000 overflow-hidden">
        {/* Texture Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Image src="/background.png" alt="texture" fill className="object-cover" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#050b14] rounded-[1.25rem] flex items-center justify-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#2d5a27] scale-0 group-hover:scale-100 " />
              <Image src="/images/buddha.png" alt="Logo" width={66} height={66} priority className="relative z-10  object-cover" />
            </div>
            <div>
              <h1 className="font-serif font-semibold text-2xl tracking-tight leading-none text-white">Antaraal <span className="text-[#2d5a27]">Resort</span></h1>
              <p className="text-[10px] text-zinc-400 mt-2 uppercase tracking-[0.3em] font-black opacity-80">A Village Resort</p>
            </div>
          </div>
          <button className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all active:scale-95">
            <Info size={22} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative group z-10">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#2d5a27] transition-colors" size={24} />
          <input
            type="text"
            placeholder="Search your craving..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-[2rem] focus:ring-4 focus:ring-[#2d5a27]/10 focus:bg-white/10 transition-all outline-none text-white placeholder:text-white/20 font-bold text-lg shadow-inner"
          />
        </div>

        {/* Categories Slider */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 relative z-10 -mx-6 px-6">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={cn(
                "px-8 py-3.5 rounded-full whitespace-nowrap text-[11px] font-serif font-bold uppercase tracking-[0.25em] transition-all duration-500 relative group",
                (selectedCategory === cat._id)
                  ? "text-white bg-[#2d5a27] shadow-[0_10px_30px_-10px_rgba(45,90,39,0.5)] scale-105"
                  : "text-white/40 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white/80"
              )}
            >
              {cat.name}
              {selectedCategory === cat._id && (
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <main className="px-6 py-12 max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative w-20 h-20 mb-8">
              <div className="absolute inset-0 border-4 border-[#2d5a27]/10 border-t-[#2d5a27] rounded-full animate-spin" />
              <div className="absolute inset-4 border-4 border-zinc-50 border-b-[#050b14] rounded-full animate-spin-slow" />
            </div>
            <p className="text-zinc-400 text-sm font-black uppercase tracking-[0.3em] animate-pulse">Igniting the kitchen...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-32 px-8">
            <div className="w-32 h-32 bg-zinc-50 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-zinc-200 shadow-inner">
              <Search size={56} />
            </div>
            <h3 className="text-3xl font-serif font-semibold text-zinc-900 tracking-tight mb-4 leading-none">NO FLAVORS FOUND</h3>
            <p className="text-zinc-400 font-medium max-w-xs mx-auto leading-relaxed">We couldn't find any dishes matching your search. Try broadening your horizon!</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-10 bg-[#2d5a27]/10 text-[#050b14] px-8 py-4 rounded-[2rem] font-serif font-semibold text-sm uppercase tracking-widest hover:bg-[#2d5a27]/20 transition-all flex items-center gap-3 mx-auto active:scale-95"
            >
              Reset exploration <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-20">
            {selectedCategory === "All" ? (
              groupedItems.map((group) => (
                <div key={group.category._id} className="space-y-10 group/section">
                  <div className="flex items-center gap-6">
                    <h3 className="text-4xl font-serif font-semibold tracking-tight text-zinc-900 group-hover/section:text-[#2d5a27] transition-colors uppercase leading-[0.8]">{group.category.name}</h3>
                    <div className="h-[2px] flex-1 bg-zinc-50 group-hover/section:bg-[#2d5a27]/10 transition-colors"></div>
                    <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] group-hover/section:text-[#2d5a27]/40 transition-colors">{group.items.length} OPTIONS</span>
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    {group.items.map((item, idx) => (
                      <DishCard key={item._id} item={item} index={idx} onClick={() => setShowItemDetail(item)} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 gap-8 pt-6">
                {filteredItems.map((item, idx) => (
                  <DishCard key={item._id} item={item} index={idx} onClick={() => setShowItemDetail(item)} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>



      {/* Premium Footer */}
      <footer className="p-16 bg-[#050b14] text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.1),transparent)] pointer-events-none" />
        <div className="flex flex-col items-center justify-center gap-4 relative z-10">
          <div className="w-48 h-24 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl border border-white/10 group bg-white/5">
            <Image src="/images/logo.png" alt="Antaraal Resort & Spa" width={192} height={96} priority className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <span className="font-serif font-semibold text-2xl text-white tracking-tight">Antaraal <span className="text-[#2d5a27]">Resort</span></span>
        </div>
        <p className="text-zinc-100/70 text-sm max-w-xs mx-auto leading-relaxed relative z-10 font-serif italic">
          Experience the calm and luxury of Antaraal through our digital experience.
        </p>
        <div className="pt-8 flex flex-col items-center justify-center gap-1 relative z-10">
          <div className="text-[10px] font-semibold text-[#2d5a27]/60 uppercase tracking-[0.5em] mb-2">SERVICE HOURS</div>
          <div className="text-white font-serif font-semibold text-xl tracking-tight">8:00 AM — 10:00 PM</div>
          <div className="w-2 h-2 bg-[#2d5a27] rounded-full animate-pulse mt-4 shadow-[0_0_15px_rgba(197,160,89,0.5)]" />
        </div>
      </footer>

      <DishDetailModal
        item={showItemDetail}
        isOpen={!!showItemDetail}
        onClose={() => setShowItemDetail(null)}
      />
    </div>
  );
}

export default function MenuApp() {
  return (
    <MenuProvider>
      <MenuContent />
    </MenuProvider>
  );
}
