"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Clock, UtensilsCrossed, ShoppingCart } from "lucide-react";
import { useMenu } from "@/context/MenuContext";

interface DishDetailModalProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
}

export const DishDetailModal = ({ item, isOpen, onClose }: DishDetailModalProps) => {
  const { addToCart } = useMenu();
  return (
    <AnimatePresence>
      {isOpen && item ? (
        <motion.div 
          key="dish-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            key="dish-modal-container"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-white rounded-t-[3.5rem] sm:rounded-[4rem] overflow-hidden shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.3)] flex flex-col max-h-[95vh]"
          >
            {/* Close Button */}
            <div className="absolute top-8 right-8 z-20">
              <button
                onClick={onClose}
                className="w-12 h-12 bg-black/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center border border-white/20 hover:bg-black/40 transition-all active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Container */}
            <div className="overflow-y-auto no-scrollbar pb-10">
              {/* Hero section */}
              <div className="h-[400px] bg-zinc-100 relative">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-300">
                    <UtensilsCrossed size={120} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="bg-zinc-950 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4 inline-block shadow-lg leading-none text-white">
                    {item.category?.name || "Premium Dish"}
                  </span>
                  <h2 className="text-5xl md:text-6xl font-serif font-semibold tracking-tight text-white leading-none">
                    {item.name}
                  </h2>
                </div>
              </div>

              <div className="px-10 py-10 space-y-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-zinc-950 bg-zinc-950/5 px-4 py-2 rounded-2xl shadow-sm border border-zinc-950/10">
                      <Star size={18} fill="currentColor" />
                      <span className="font-serif font-semibold text-base">4.9</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 bg-zinc-50 px-4 py-2 rounded-2xl border border-zinc-100 whitespace-nowrap">
                      <Clock size={16} />
                      <span className="font-bold uppercase tracking-widest text-[10px]">15-20 min</span>
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-serif font-semibold text-zinc-950 tracking-tight">
                    ₹{item.price}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-zinc-950 rounded-full" />
                    <h4 className="font-serif font-semibold text-zinc-900 uppercase tracking-[0.2em] text-xs">Chef's Description</h4>
                  </div>
                  <p className="text-zinc-500 text-xl font-medium leading-relaxed italic opacity-90">
                    "{item.description || "Crafted with passion using hand-selected ingredients and traditional techniques to ensure an unforgettable dining experience."}"
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <button
                    onClick={() => {
                      addToCart(item);
                      onClose();
                    }}
                    className="w-full bg-[#050b14] text-white py-6 rounded-[2.5rem] font-serif font-semibold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all duration-500 shadow-2xl active:scale-[0.98]"
                  >
                    <ShoppingCart size={20} /> Add to Cart
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-zinc-100 text-zinc-400 py-5 rounded-[2.5rem] font-serif font-semibold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all duration-500"
                  >
                    Back to Menu
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
