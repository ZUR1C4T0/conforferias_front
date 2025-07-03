"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

async function loadFlyonUI() {
  return import("flyonui/flyonui");
}

export function FlyonuiScript() {
  const path = usePathname();

  useEffect(() => {
    const initFlyonUI = async () => {
      await loadFlyonUI();
    };

    initFlyonUI();
    console.log("initFlyonUI");
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: is needed in doc
  useEffect(() => {
    setTimeout(() => {
      if (
        window.HSStaticMethods &&
        typeof window.HSStaticMethods.autoInit === "function"
      ) {
        window.HSStaticMethods.autoInit();
        console.log("autoInit");
      }
    }, 500);
  }, [path]);

  return null;
}
