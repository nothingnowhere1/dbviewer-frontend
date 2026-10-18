import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import { Theme } from '@/shared/utils';

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children, initialTheme }: { children: ReactNode; initialTheme: Theme }) {
    const [theme, setThemeState] = useState(initialTheme);

    const setTheme = (nextTheme: Theme) => {
        setThemeState(nextTheme);
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        document.cookie = `theme=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax`;
    };

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
