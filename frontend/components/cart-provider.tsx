"use client";
import { createContext, useContext, useState, useCallback } from "react";
type CartItem = { id: string; qty: number };
type CartContext = { items: CartItem[]; add: (id: string) => void; remove: (id: string) => void; clear: () => void; totalCount: number };
const Cart = createContext<CartContext | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (id: string) => setItems((previous) => {
    const found = previous.find((item) => item.id === id);
    return found ? previous.map((item) => item.id === id ? { ...item, qty: Math.min(10, item.qty + 1) } : item) : [...previous, { id, qty: 1 }];
  });
  const remove = (id: string) => setItems((previous) => previous.filter((item) => item.id !== id));
  const clear = useCallback(() => setItems([]), []);
  return <Cart.Provider value={{items, add, remove, clear, totalCount: items.reduce((sum, item) => sum + item.qty, 0)}}>{children}</Cart.Provider>;
}
export function useCart() { const context = useContext(Cart); if (!context) throw new Error("CartProvider faltante"); return context; }
