"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-slate-900 group-[.toaster]:text-slate-50 group-[.toaster]:border-slate-800 group-[.toaster]:shadow-lg",
          description: "group-[.toaster]:text-slate-400",
          actionButton:
            "group-[.toaster]:bg-slate-50 group-[.toaster]:text-slate-900",
          cancelButton:
            "group-[.toaster]:bg-slate-800 group-[.toaster]:text-slate-400",
        },
      }}
    />
  );
}
