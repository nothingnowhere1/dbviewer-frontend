import { Moon, Sun } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { useTheme } from '@/shared/contexts';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button
            variant="outline"
            size="icon-sm"
            className="fixed right-4 top-4 z-50 shadow-sm"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
            aria-pressed={theme === 'dark'}
            title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        >
            {theme === 'dark' ? <Sun aria-hidden="true"/> : <Moon aria-hidden="true"/>}
        </Button>
    );
}
