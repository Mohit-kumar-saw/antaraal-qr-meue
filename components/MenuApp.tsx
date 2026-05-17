"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Info, UtensilsCrossed, ArrowRight, ShoppingCart, Trash2, Plus, Minus, X, Layers } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MenuProvider, useMenu } from "@/context/MenuContext";
import { DishCard } from "@/components/DishCard";
import { DishDetailModal } from "@/components/DishDetailModal";

function MenuContent() {
  const { categories, menuItems, loading, cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showItemDetail, setShowItemDetail] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categorySuggestions = categories.filter(c =>
    c.name !== "All" && c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemSuggestions = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasSuggestions = searchQuery.length > 0 && (categorySuggestions.length > 0 || itemSuggestions.length > 0);

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
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900/10 selection:text-zinc-900 overflow-x-hidden">
      {/* Premium Header/Search Section */}
      <div className="sticky top-0 z-40 bg-[#17281e] px-6 pt-10 pb-6 space-y-8 border-b border-white/10 shadow-xl animate-in slide-in-from-top duration-1000">
        {/* <Image src="/background.png" alt="Header Background" fill className="object-cover opacity-50 absolute inset-0" priority /> */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-[1.25rem] flex items-center justify-center shadow-xl relative overflow-hidden group border border-white/20">
              <Image src="/images/buddha.png" alt="Logo" width={66} height={66} priority className="relative z-10 object-cover" />
            </div>
            <div>
              <h1 className="font-serif font-semibold text-2xl tracking-tight leading-none text-white">Antaraal <span className="text-white/80">Resort</span></h1>
              <p className="text-[10px] text-white/60 mt-2 uppercase tracking-[0.3em] font-black">A Village Resort</p>
            </div>
          </div>
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 text-white hover:bg-white/20 transition-all active:scale-95">
            <Info size={22} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative group z-20">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors" size={24} />
          <input
            type="text"
            placeholder="Search your craving..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full pl-16 pr-6 py-5 bg-white/10 border border-white/20 rounded-[2rem] focus:ring-4 focus:ring-white/10 focus:bg-white/20 transition-all outline-none text-white placeholder:text-white/40 font-bold text-lg shadow-inner"
          />

          <AnimatePresence>
            {showSuggestions && hasSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-100 p-2 z-50 max-h-[60vh] overflow-y-auto no-scrollbar"
              >
                {categorySuggestions.length > 0 && (
                  <div className="p-4">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">Categories</p>
                    {categorySuggestions.map(cat => (
                      <button
                        key={cat._id}
                        onClick={() => {
                          setSelectedCategory(cat._id);
                          setSearchQuery("");
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left p-3 hover:bg-zinc-50 rounded-2xl flex items-center gap-3 transition-colors group"
                      >
                        <div className="w-8 h-8 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                          <Layers size={16} />
                        </div>
                        <span className="font-serif font-bold text-zinc-900">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {itemSuggestions.length > 0 && (
                  <div className="p-4 pt-0">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 px-2">Dishes</p>
                    {itemSuggestions.map(item => (
                      <button
                        key={item._id}
                        onClick={() => {
                          setShowItemDetail(item);
                          setSearchQuery("");
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left p-3 hover:bg-zinc-50 rounded-2xl flex items-center gap-4 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-100">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-200">
                              <UtensilsCrossed size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-serif font-bold text-zinc-900">{item.name}</p>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">₹{item.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
                  ? "text-zinc-950 bg-white shadow-xl scale-105"
                  : "text-white/60 bg-white/10 border border-white/10 hover:bg-white/20 hover:text-white"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <main className="px-6 py-12 max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative w-20 h-20 mb-8">
              <div className="absolute inset-0 border-4 border-zinc-900/10 border-t-zinc-900 rounded-full animate-spin" />
              <div className="absolute inset-4 border-4 border-zinc-50 border-b-zinc-900 rounded-full animate-spin-slow" />
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
              className="mt-10 bg-zinc-900/10 text-zinc-900 px-8 py-4 rounded-[2rem] font-serif font-semibold text-sm uppercase tracking-widest hover:bg-zinc-900/20 transition-all flex items-center gap-3 mx-auto active:scale-95"
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
                    <h3 className="text-4xl font-serif font-semibold tracking-tight text-zinc-900 group-hover/section:text-zinc-950 transition-colors uppercase leading-[0.8]">{group.category.name}</h3>
                    <div className="h-[2px] flex-1 bg-zinc-50 group-hover/section:bg-zinc-900/10 transition-colors"></div>
                    <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] group-hover/section:text-zinc-900 transition-colors">{group.items.length} OPTIONS</span>
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
      <footer className="p-16 bg-[#17281e] text-center space-y-8 relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.1),transparent)] pointer-events-none" /> */}
        <div className="flex flex-col items-center justify-center gap-4 relative z-10">
          <div className="w-48 h-24 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl border border-white/10 group bg-white/5">
            <Image src="/images/logo.png" alt="Antaraal Resort & Spa" width={192} height={96} priority className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <span className="font-serif font-semibold text-2xl text-white tracking-tight">Antaraal Resort</span>
        </div>
        <p className="text-zinc-100/70 text-sm max-w-xs mx-auto leading-relaxed relative z-10 font-serif italic">
          Experience the calm and luxury of Antaraal through our digital experience.
        </p>
        <div className="pt-8 flex flex-col items-center justify-center gap-1 relative z-10">
          <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.5em] mb-2">SERVICE HOURS</div>
          <div className="text-white font-serif font-semibold text-xl tracking-tight">8:00 AM — 10:00 PM</div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse mt-4 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
      </footer>

      <DishDetailModal
        item={showItemDetail}
        isOpen={!!showItemDetail}
        onClose={() => setShowItemDetail(null)}
      />

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-10 right-8 z-50 bg-[#050b14] text-white p-5 rounded-[2.5rem] shadow-2xl flex items-center gap-4 hover:scale-105 active:scale-95 transition-all group border border-white/10"
          >
            <div className="relative">
              <ShoppingCart size={28} />
              <span className="absolute -top-3 -right-3 bg-white text-zinc-950 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border border-zinc-100">
                {cartCount}
              </span>
            </div>
            <div className="pr-2">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Your Order</p>
              <p className="text-lg font-serif font-semibold leading-none">₹{cartTotal}</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-serif font-semibold tracking-tight text-zinc-900">Your Selection</h2>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mt-1">{cartCount} items selected</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-4 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-zinc-900 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-24 h-24 bg-zinc-50 rounded-[2.5rem] flex items-center justify-center text-zinc-200">
                      <ShoppingCart size={48} />
                    </div>
                    <p className="text-zinc-400 font-medium italic">Your cart is empty.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-zinc-50 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-100">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-200">
                            <UtensilsCrossed size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-serif font-semibold text-lg text-zinc-900 leading-tight">{item.name}</h4>
                          <p className="text-zinc-400 text-xs font-bold mt-1">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-zinc-50 p-1 rounded-xl border border-zinc-100">
                            <button onClick={() => removeFromCart(item._id)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-zinc-400 hover:text-zinc-900 transition-colors">
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center font-bold text-sm text-zinc-900">{item.quantity}</span>
                            <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-zinc-400 hover:text-zinc-900 transition-colors">
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-serif font-bold text-zinc-900">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 bg-zinc-50 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-3xl font-serif font-semibold text-zinc-900">₹{cartTotal}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 bg-[#050b14] text-white font-serif font-semibold uppercase tracking-[0.2em] text-sm py-6 rounded-[2rem] shadow-xl hover:bg-zinc-900 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <Trash2 size={20} /> Clear Selection
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
