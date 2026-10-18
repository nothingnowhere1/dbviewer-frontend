import { useRef, useState } from 'react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';

type DataTableProps<TData> = {
    data: Array<TData>;
    columns: Array<ColumnDef<TData>>;
    getRowId: (row: TData) => string;
    rowHeight?: number;
};

export function DataTable<TData>({ data, columns, getRowId, rowHeight = 56 }: DataTableProps<TData>) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getRowId,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    const rows = table.getRowModel().rows;
    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => scrollRef.current,
        // Initial scrollbar estimate; rendered rows are measured below.
        estimateSize: () => rowHeight,
        getItemKey: (index) => rows[index].id,
        overscan: 8,
        initialRect: { width: 1000, height: 520 },
    });
    const items = virtualizer.getVirtualItems();
    const paddingTop = items[0]?.start ?? 0;
    const paddingBottom = Math.max(0, virtualizer.getTotalSize() - (items.at(-1)?.end ?? 0));
    const columnCount = table.getVisibleLeafColumns().length;

    return (
        <Table
            aria-label="Таблица"
            className="table-fixed border-separate border-spacing-0"
            style={{ minWidth: table.getTotalSize() }}
            containerProps={{
                ref: scrollRef,
                tabIndex: 0,
                role: 'region',
                'aria-label': 'Прокручиваемая таблица',
                className: 'h-[min(560px,65dvh)] min-h-64 rounded-lg border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2',
            }}
        >
            <TableHeader>
                {table.getHeaderGroups().map((group) => (
                    <TableRow key={group.id}>
                        {group.headers.map((header) => {
                            const sorted = header.column.getIsSorted();
                            const Icon = sorted === 'asc' ? ArrowUp : sorted === 'desc' ? ArrowDown : ArrowUpDown;
                            return (
                                <TableHead
                                    key={header.id}
                                    className="sticky top-0 z-10 h-12 border-b bg-muted px-5 text-xs text-muted-foreground"
                                    style={{ width: header.getSize() }}
                                    aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none'}
                                >
                                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                        <Button
                                            variant="ghost"
                                            size="xs"
                                            className="-ml-2"
                                            onClick={(event) => {
                                                header.column.getToggleSortingHandler()?.(event);
                                                scrollRef.current?.scrollTo({ top: 0 });
                                            }}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <Icon
                                                className="size-3"
                                                aria-hidden="true"
                                            />
                                        </Button>
                                    ) : (
                                        flexRender(header.column.columnDef.header, header.getContext())
                                    )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {paddingTop > 0 && (
                    <TableRow aria-hidden="true">
                        <TableCell
                            colSpan={columnCount}
                            className="p-0"
                            style={{ height: paddingTop }}
                        />
                    </TableRow>
                )}
                {items.map((item) => {
                    const row = rows[item.index];
                    return (
                        <TableRow
                            key={row.id}
                            data-index={item.index}
                            ref={virtualizer.measureElement}
                            className="hover:bg-muted/50"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    className="border-b border-border/60 px-5 py-4 align-top whitespace-normal"
                                >
                                    <div className="break-words leading-6">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
                {paddingBottom > 0 && (
                    <TableRow aria-hidden="true">
                        <TableCell
                            colSpan={columnCount}
                            className="p-0"
                            style={{ height: paddingBottom }}
                        />
                    </TableRow>
                )}
                {rows.length === 0 && (
                    <TableRow>
                        <TableCell
                            colSpan={columnCount}
                            className="h-32 text-center text-muted-foreground"
                        >
                            Нет записей
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
