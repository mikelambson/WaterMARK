"use client"
// @/components/theme-provider.tsx
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps as NextThemesProviderProps } from "next-themes/dist/types";
import { useThemeStore } from '@/store/themeStore';

interface CustomThemeProviderProps extends NextThemesProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Don't render anything until the component is mounted to prevent flickering

  return (
    <NextThemesProvider
      themes={['light', 'dark', 'system']}
      defaultTheme="system"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
