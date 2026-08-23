"use client";

import { createContext, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";

type RequestModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  defaultCategory: string;
};

const RequestModalContext = createContext<RequestModalContextValue | null>(null);

export function RequestModalProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(searchParams.get("open") === "1");

  return (
    <RequestModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        defaultCategory: searchParams.get("category") ?? "",
      }}
    >
      {children}
    </RequestModalContext.Provider>
  );
}

export function useRequestModal() {
  const ctx = useContext(RequestModalContext);
  if (!ctx) throw new Error("useRequestModal must be used within a RequestModalProvider");
  return ctx;
}
