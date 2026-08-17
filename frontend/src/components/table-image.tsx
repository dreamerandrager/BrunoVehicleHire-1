import { ImageIcon } from "lucide-react";

export function TableImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="flex size-10 items-center justify-center rounded bg-muted">
        <ImageIcon className="size-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="size-10 rounded object-cover" />
  );
}
