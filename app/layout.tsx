// /app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";
import { ThemeProvider } from "@/components/nav/theme-provider";
import { RoleProvider } from "@/components/nav/RoleContext";
import { Open_Sans, Work_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  // Add variable to the font
  variable: '--font-opensans',
});

const work = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  // Add variable to the font
  variable: '--font-work',
});

const font = work;

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
          <RoleProvider>
            <Navbar />
            <main className={"min-h-screen  w-full"}>
              {children}
            </main>
            <Toaster />
          </RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
