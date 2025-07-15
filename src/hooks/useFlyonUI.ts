"use client";

import { createContext, useContext } from "react";

export const FlyonUIContext = createContext<{
  loaded: boolean;
} | null>(null);

export const useFlyonUI = () => {
  const context = useContext(FlyonUIContext);
  if (!context) {
    throw new Error("useFlyonUI must be used within a FlyonUIProvider");
  }
  return context;
};
