import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import type { PropsWithChildren } from "react";
import { FlyonUIProvider } from "@/components/FlyonuiScript";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    <html lang="es">
      <body style={publicSans.style} className="dark antialiased">
        <TooltipProvider>
          <FlyonUIProvider>{children}</FlyonUIProvider>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
