"use client";

import { ReactNode } from "react";
import { useAuth } from "@/components/auth-provider";
import { AuthorizeForm } from "@/components/authorize-form";

export function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthorized, isChecking } = useAuth();

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!isAuthorized) {
    return <AuthorizeForm />;
  }

  return <>{children}</>;
}
