"use client";

import { useEffect } from "react";

async function loadFlyonUI() {
  return import("flyonui/flyonui");
}

export function FlyonuiScript() {
  useEffect(() => {
    const initFlyonUI = async () => {
      await loadFlyonUI();
    };

    initFlyonUI();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (
        window.HSStaticMethods &&
        typeof window.HSStaticMethods.autoInit === "function"
      ) {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
  }, []);

  return null;
}
