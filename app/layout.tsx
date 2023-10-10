// /app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { RoleProvider } from "@/components/RoleContext";
import { Open_Sans } from "next/font/google";


const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WaterMARK",
  description: "Water Measurement Administration & Record Keeping",
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
          </RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
