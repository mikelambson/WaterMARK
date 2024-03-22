// /store/themeStore.ts
import create from 'zustand';

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set:any) => ({
  isDarkMode: false,
  toggleTheme: () => set((state:ThemeState) => ({ isDarkMode: !state.isDarkMode })),
}));
