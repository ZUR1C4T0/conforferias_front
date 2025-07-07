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
          console.info("🚀 FlyonUI cargado e iniciado");
        }
      });
    }

    const handleRouteChange = () => {
      const overlays = document.querySelectorAll<HTMLElement>(".overlay.open");
      for (const overlay of overlays) {
        const instance = window.HSOverlay.getInstance(overlay, true);
        instance?.element.close(true);
      }
    };
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    const wrap = (originalFn: typeof window.history.pushState) => {
      return function (
        this: typeof window.history,
        ...args: Parameters<typeof window.history.pushState>
      ) {
        handleRouteChange();
        return originalFn.apply(this, args);
      };
    };
    window.history.pushState = wrap(originalPushState);
    window.history.replaceState = wrap(originalReplaceState);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Intenta cargar flyonui cuando cambia la ruta
  useEffect(() => {
    if (
      hasLoadedRef.current &&
      window.HSStaticMethods &&
      typeof window.HSStaticMethods.autoInit === "function"
    ) {
      window.HSStaticMethods.autoInit();
      console.info("🔃 autoInit() tras navegación");
    }
  }, [path]);

  return null;
}
