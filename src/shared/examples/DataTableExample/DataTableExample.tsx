import { DataTable } from '@/shared/components/data-table/data-table';
import { demoColumns, demoRecords, getDemoRowId } from './DemoData';

export function DataTableExample() {
    return (
        <DataTable
            data={demoRecords}
            columns={demoColumns}
            getRowId={getDemoRowId}
        />
    )
}
