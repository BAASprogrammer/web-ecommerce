"use client";
import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import type { AuthUser } from "@/types/api/auth";

const STORAGE_KEY = "nexamarket-user";

interface AuthContextValue {
  user: AuthUser | null;
  isAdmin: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

let listeners: Array<() => void> = [];
let cache: AuthUser | null | undefined;

function readStore(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function getSnapshot(): AuthUser | null {
  if (cache !== undefined) return cache;
  cache = readStore();
  return cache;
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emitChange() {
  for (const listener of listeners) listener();
}

function persist(next: AuthUser | null) {
  cache = next;
  if (typeof window !== "undefined") {
    try {
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  emitChange();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = useCallback((nextUser: AuthUser) => {
    persist(nextUser);
  }, []);

  const logout = useCallback(() => {
    persist(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAdmin: user?.role === "ADMIN", login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
