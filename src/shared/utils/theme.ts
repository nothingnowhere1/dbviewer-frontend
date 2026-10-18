import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';

export type Theme = 'light' | 'dark';

export const getStoredTheme = createServerFn().handler((): Theme => {
    return getCookie('theme') === 'light' ? 'light' : 'dark';
});
