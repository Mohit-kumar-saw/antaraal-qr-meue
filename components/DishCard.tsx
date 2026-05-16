"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Plus } from "lucide-react";
import { useMenu } from "@/context/MenuContext";

interface DishCardProps {
  item: any;
  index: number;
  onClick: () => void;
}

export const DishCard = ({ item, index, onClick }: DishCardProps) => {
  const { addToCart } = useMenu();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      className="group relative flex gap-6 bg-white p-3 rounded-[3rem] hover:bg-zinc-50 transition-all duration-500 cursor-pointer border border-transparent hover:border-zinc-100 hover:shadow-2xl hover:shadow-zinc-100/50 active:scale-[0.98]"
    >
      <div className="w-32 h-32 bg-zinc-50 rounded-[2.5rem] overflow-hidden flex-shrink-0 relative shadow-inner">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-200">
            <UtensilsCrossed size={40} />
          </div>
        )}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] bg-zinc-900/80 px-3 py-1 rounded-full border border-white/20">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 py-2 flex flex-col justify-between pr-4">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-zinc-900/40 uppercase tracking-[0.2em] leading-none mb-1">
              {item.category?.name || "Featured"}
            </span>
          </div>
          <h4 className="font-serif font-semibold text-xl text-zinc-900 group-hover:text-zinc-950 transition-colors leading-tight tracking-tight">
            {item.name}
          </h4>
          <p className="text-zinc-400 text-sm font-medium line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {item.description || "Freshly prepared with authentic ingredients and the spice of life."}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900/5 text-zinc-900 px-4 py-1.5 rounded-2xl text-lg font-serif font-semibold tracking-tight border border-zinc-900/10 shadow-sm">
              ₹{item.price}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
              className="w-10 h-10 bg-zinc-900 text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="w-10 h-10 bg-zinc-900/5 text-zinc-400 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
