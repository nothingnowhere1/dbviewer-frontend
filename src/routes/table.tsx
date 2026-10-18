import { createFileRoute } from '@tanstack/react-router';

import { DataTableExample } from '@/shared/examples/DataTableExample';

export const Route = createFileRoute('/table')({ component: TablePreview });

function TablePreview() {
    return (
        <main
            className="min-h-screen bg-background p-4 pt-16 text-foreground sm:p-8 sm:pt-20"
        >
            <div className="mx-auto max-w-6xl">
                <DataTableExample/>
            </div>
        </main>
    );
}
