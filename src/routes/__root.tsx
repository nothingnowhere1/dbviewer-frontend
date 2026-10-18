import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import appCss from '../styles.css?url';
import { getStoredTheme } from '@/shared/utils';
import { ThemeProvider } from '@/shared/contexts';
import { ThemeToggle } from '@/shared/components';

export const Route = createRootRoute({
    beforeLoad: async () => ({ theme: await getStoredTheme() }),
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'Template',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),

    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    const { theme } = Route.useRouteContext();

    return (
        <html
            lang="en"
            className={theme === 'dark' ? 'dark' : undefined}
        >
        <head>
            <HeadContent/>
        </head>
        <body>
        <ThemeProvider initialTheme={theme}>
            <ThemeToggle/>
            {children}
        </ThemeProvider>
        <TanStackDevtools
            config={{
                position: 'bottom-right',
            }}
            plugins={[
                {
                    name: 'Tanstack Router',
                    render: <TanStackRouterDevtoolsPanel/>,
                },
            ]}
        />
        <Scripts/>
        </body>
        </html>
    );
}
