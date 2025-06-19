// app/snippet/[id]/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-64" />
        <Button variant="ghost" className="flex items-center gap-2 text-sm" disabled>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Code box skeleton */}
      <div className="rounded-lg border bg-muted p-4 shadow-sm space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button variant="secondary" className="flex items-center gap-2 text-sm" disabled>
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
        <Button variant="destructive" className="flex items-center gap-2 text-sm" disabled>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
