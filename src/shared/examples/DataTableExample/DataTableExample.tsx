import { demoColumns, demoRecords, getDemoRowId } from './DemoData';
import { DataTable } from '@/shared/components';

export function DataTableExample() {
    return (
        <DataTable
            data={demoRecords}
            columns={demoColumns}
            getRowId={getDemoRowId}
        />
    );
}
