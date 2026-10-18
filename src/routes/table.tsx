import { createFileRoute } from '@tanstack/react-router';
import { DataTableExample } from '@/shared/examples/DataTableExample';

export const Route = createFileRoute('/table')({ component: TablePreview });

function TablePreview() {
    return (
        <main
            className="min-h-screen bg-muted/30 p-4 sm:p-8"
        >
            <div className="mx-auto max-w-6xl">
                <DataTableExample/>
            </div>
        </main>
    );
}
