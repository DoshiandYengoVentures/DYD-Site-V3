"use client";

import { useEffect, useState } from "react";
import NotificationBadge from "@/components/NotificationBadge";
import { getUnreadCountAction } from "@/app/dashboard/messages/actions";

export default function MessagesNavBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getUnreadCountAction().then((value) => {
      if (!cancelled) setCount(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return <NotificationBadge count={count} />;
}
