"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://qr-menue-backend.onrender.com/api";

interface MenuContextType {
  categories: any[];
  menuItems: any[];
  loading: boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catsRes, itemsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/categories`),
        axios.get(`${API_BASE_URL}/menu`)
      ]);
      setCategories([{ _id: "All", name: "All" }, ...catsRes.data]);
      setMenuItems(itemsRes.data.filter((item: any) => item.isAvailable !== false));
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MenuContext.Provider value={{ categories, menuItems, loading }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
