// components/AuthProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  getIdToken: async () => null,
  signOutUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // subscribe auth change
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  async function getIdToken(force = false) {
    if (!auth.currentUser) return null;
    try {
      return await auth.currentUser.getIdToken(force);
    } catch (err) {
      console.error("getIdToken error", err);
      return null;
    }
  }

  async function signOutUser() {
    await auth.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, getIdToken, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
