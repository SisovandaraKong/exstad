"use client";

import { useState, useEffect } from "react";

export default function OnlineStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  const offlineMessage =
    "Oops! Looks like you're offline. Please check your internet connection.";
  useEffect(() => {
    setIsOnline(navigator.onLine);

    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="w-[100vw] h-[100vh] bg-background text-foreground text-center py-2 z-50 fixed top-0 left-0 flex items-center justify-center">
      {offlineMessage}
    </div>
  );
}
