"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getTotalUnreadCountAction } from "@/app/owner/messages/actions";

type UnreadCountContextValue = {
  totalUnread: number;
  decrementBy: (amount: number) => void;
};

const UnreadCountContext = createContext<UnreadCountContextValue | null>(null);

export function UnreadCountProvider({ children }: { children: React.ReactNode }) {
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    getTotalUnreadCountAction().then(setTotalUnread);
  }, []);

  function decrementBy(amount: number) {
    if (amount <= 0) return;
    setTotalUnread((prev) => Math.max(0, prev - amount));
  }

  return (
    <UnreadCountContext.Provider value={{ totalUnread, decrementBy }}>
      {children}
    </UnreadCountContext.Provider>
  );
}

export function useUnreadCount() {
  const ctx = useContext(UnreadCountContext);
  if (!ctx) throw new Error("useUnreadCount must be used within an UnreadCountProvider");
  return ctx;
}
