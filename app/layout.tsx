// /app/layout.tsx
import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Open_Sans, Work_Sans } from "next/font/google";
import LoadingAnimation from "@/features/loader/loading.module";
import { ReactQueryProvider } from "@/components/auth/ReactQueryProvider"

import { SessionProvider } from "@/components/auth/SessionManagement";
import { ThemeProvider } from "@/components/nav/theme-provider";
import { RoleProvider } from "@/components/nav/RoleContext";
import Navbar from "@/components/nav/Navbar";
import { Toaster } from "@/components/ui/toaster";



const workFont = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  // Add variable to the font
  variable: '--font-work',
});

const font = workFont;

export const metadata: Metadata = {
  title: "WaterMARK",
  description: "Water Measurement Administration & Record Keeping",
  authors: [
    { name: "Mike Lambson", 
      url: "https://github.com/mikelambson/WaterMARK"
    }
  ],
  icons: {
    icon: "favicon.ico",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set the default role to "Anonymous" if it's not already set

  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class" enableSystem>
          <ReactQueryProvider>
            <SessionProvider>
              <RoleProvider>
                <Suspense fallback={<LoadingAnimation />}>
                  <Navbar />
                </Suspense>
                <Suspense fallback={<LoadingAnimation />}>
                  <main className={"min-h-screen  w-full"}>
                    {children}
                  </main>
                </Suspense>
                <Toaster />
              </RoleProvider>
            </SessionProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
