"use client";

import { useState, useEffect } from "react";

// This component will only render its children on the client-side.
// This is a standard pattern to avoid SSR/hydration errors with client-heavy libraries.
export function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // On the server or during the first render, return null.
    return null;
  }

  // Once mounted on the client, render the children.
  return <>{children}</>;
}