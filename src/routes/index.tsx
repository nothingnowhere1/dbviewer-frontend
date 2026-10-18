import { createFileRoute, Link } from '@tanstack/react-router';

import { FormExample } from '@/shared/examples';

export const Route = createFileRoute('/')({ component: App });

function App() {
    return (
        <div className="m-auto w-2/4 py-8">
            <Link
                to="/table"
                className="mb-6 block underline"
            >Таблица данных
            </Link>
            <FormExample/>
        </div>
    );
}
