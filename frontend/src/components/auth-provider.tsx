"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { clearApiKey, getApiKey, setApiKey } from "@/lib/auth-storage";
import { ApiError } from "@/lib/http-client";
import { getVehiclesPaged } from "@/services/vehicle-service";

type AuthContextValue = {
  isAuthorized: boolean;
  isChecking: boolean;
  authorize: (apiKey: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!getApiKey()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time auth check on mount, not derived state
      setIsChecking(false);
      return;
    }

    getVehiclesPaged(1, 1)
      .then(() => setIsAuthorized(true))
      .catch(() => clearApiKey())
      .finally(() => setIsChecking(false));
  }, []);

  async function authorize(apiKey: string): Promise<boolean> {
    setApiKey(apiKey);

    try {
      await getVehiclesPaged(1, 1);
      setIsAuthorized(true);
      return true;
    } catch (error) {
      clearApiKey();
      if (error instanceof ApiError && error.status === 401) {
        return false;
      }
      throw error;
    }
  }

  function logout() {
    clearApiKey();
    setIsAuthorized(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthorized, isChecking, authorize, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
