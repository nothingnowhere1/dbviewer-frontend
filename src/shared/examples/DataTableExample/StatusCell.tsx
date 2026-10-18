import type { CellContext } from '@tanstack/react-table';
import { CircleCheck, CircleMinus } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { DemoRecord } from './types';

export function StatusCell({ getValue }: CellContext<DemoRecord, unknown>) {
    const status = String(getValue());
    const active = status === 'Активен';
    const Icon = active ? CircleCheck : CircleMinus;
    return (
        <Badge variant={active ? 'secondary' : 'outline'}>
            <Icon
                data-icon="inline-start"
                aria-hidden="true"
            />
            {status}
        </Badge>
    );
}
