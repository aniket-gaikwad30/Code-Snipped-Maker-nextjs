// components/ui/skeleton.tsx

import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("bg-gradient-to-r from-gray-200/60 via-gray-300/80 to-gray-200/60 animate-pulse rounded-xl relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:animate-shimmer", className)}
    />
  );
}
