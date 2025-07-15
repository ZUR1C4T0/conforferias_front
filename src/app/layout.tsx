import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import type { PropsWithChildren } from "react";
import { FlyonUIProvider } from "@/components/FlyonuiScript";

import "./globals.css";

const publicSans = Public_Sans({
  preload: true,
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: ".:: Conforferias ::.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es" data-theme="corporate">
      <body style={publicSans.style} className="antialiased">
        <FlyonUIProvider>{children}</FlyonUIProvider>
      </body>
    </html>
  );
}
