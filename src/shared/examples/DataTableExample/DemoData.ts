import type { ColumnDef } from '@tanstack/react-table';
import { StatusCell } from './StatusCell';
import { DemoRecord } from './types';

export const demoColumns: Array<ColumnDef<DemoRecord>> = [
    { accessorKey: 'id', header: 'ID', size: 120, cell: ({ getValue }) => `#${String(getValue()).padStart(5, '0')}` },
    { accessorKey: 'name', header: 'Имя', size: 240 },
    { accessorKey: 'email', header: 'Email', size: 300 },
    { accessorKey: 'status', header: 'Статус', size: 200, enableSorting: false, cell: StatusCell },
];
export const demoRecords: Array<DemoRecord> = Array.from({ length: 10_000 }, (_, index) => ({
    id: index + 1,
    name: `Пользователь ${index + 1}`,
    email: `user${index + 1}@example.com`,
    status: index % 3 === 0 ? 'Неактивен' : 'Активен',
}));
export const getDemoRowId = (row: DemoRecord) => String(row.id);
