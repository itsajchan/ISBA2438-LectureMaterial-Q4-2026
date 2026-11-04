"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

export const COMPARE_LIMIT = 3;

interface CompareContextValue {
  ids: string[];
  loaded: boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

const COMPARE_KEY = "compare";

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setIds(readJSON<string[]>(COMPARE_KEY, []));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeJSON(COMPARE_KEY, ids);
  }, [ids, loaded]);

  const toggle = (id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= COMPARE_LIMIT) return prev;
      return [...prev, id];
    });
  };

  const remove = (id: string) => setIds((prev) => prev.filter((x) => x !== id));
  const clear = () => setIds([]);
  const isSelected = (id: string) => ids.includes(id);

  return (
    <CompareContext.Provider
      value={{ ids, loaded, toggle, remove, clear, isSelected, isFull: ids.length >= COMPARE_LIMIT }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
