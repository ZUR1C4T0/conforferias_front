"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

async function loadFlyonUI() {
  return import("flyonui/flyonui");
}

export function FlyonuiScript() {
  const path = usePathname();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      loadFlyonUI().then(() => {
        hasLoadedRef.current = true;
        if (
          window.HSStaticMethods &&
          typeof window.HSStaticMethods.autoInit === "function"
        ) {
          window.HSStaticMethods.autoInit();
          console.info("FlyonUI cargado e iniciado");
        }
      });
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Intenta cargar flyonui cuando cambia la ruta
  useEffect(() => {
    if (
      hasLoadedRef.current &&
      window.HSStaticMethods &&
      typeof window.HSStaticMethods.autoInit === "function"
    ) {
      window.HSStaticMethods.autoInit();
      console.info("autoInit() tras navegación");
    }
  }, [path]);

  return null;
}
