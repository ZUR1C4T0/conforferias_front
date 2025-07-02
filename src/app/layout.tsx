import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { PropsWithChildren } from "react";

import "./globals.css";

const roboto = Roboto({ preload: true, display: "swap" });

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <body style={roboto.style} className="antialiased">
        {children}
      </body>
    </html>
  );
}
