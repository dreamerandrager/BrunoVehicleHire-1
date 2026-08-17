"use client";

import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { clearApiKey, getApiKey, setApiKey } from "@/services/auth-service";
import { ApiError } from "@/lib/api-error";
import { getVehiclesPaged } from "@/services/vehicle-service";

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
