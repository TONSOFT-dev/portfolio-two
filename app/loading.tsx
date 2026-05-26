// app/loading.tsx
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}