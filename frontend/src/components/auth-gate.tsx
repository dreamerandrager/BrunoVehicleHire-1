"use client";

import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AuthorizeForm } from "@/components/authorize-form";
import { LoadingSpinner } from "@/components/loading-spinner";

export function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthorized, isChecking } = useAuth();

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner className="size-6 text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthorized) {
    return <AuthorizeForm />;
  }

  return <>{children}</>;
}
