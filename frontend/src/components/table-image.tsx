"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TableImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

export function TableImage({ src, alt, className = "size-10 rounded" }: TableImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={cn("flex items-center justify-center bg-muted", className)}>
        <ImageIcon className="size-1/3 text-muted-foreground" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={cn("object-cover", className)} onError={() => setFailed(true)} />
  );
}
