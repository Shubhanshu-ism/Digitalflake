import React from 'react';
import { Edit, Trash2, ArrowUpDown } from 'lucide-react';
import clsx from 'clsx';

const Table = ({ columns, data, onEdit, onDelete, onSort, sortConfig }) => {

    const renderCell = (row, col) => {
        const value = col.accessor.split('.').reduce((o, i) => o?.[i], row);

        if (col.render) {
            return col.render(row);
        }

        switch (col.type) {
            case 'image':
                const imageUrl = value ? (value.startsWith('http') ? value : `http://localhost:5001${value}`) : 'https://via.placeholder.com/40';
                return (
                    <img
                        src={imageUrl}
                        alt={row.name || ''}
                        className="h-10 w-10 rounded-standard object-cover"
                    />
                );
            case 'status':
                return (
                    <span
                        className={clsx(
                            'font-medium',
                            value === 'Active' ? 'text-success' : 'text-error'
                        )}
                    >
                        {value}
                    </span>
                );
            default:
                return value;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-light">
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-light">
                    <thead className="bg-accent">
                        <tr className="h-[48px]">
                            {columns.map((col) => (
                                <th
                                    key={col.header}
                                    scope="col"
                                    className="px-sm py-3 text-left text-caption font-semibold text-neutral-darkest"
                                    style={{ width: col.width }}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.header}
                                        {col.sortable && (
                                            <button onClick={() => onSort && onSort(col.accessor)}>
                                                <ArrowUpDown className="h-4 w-4 text-neutral-medium" />
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}
                            <th scope="col" className="px-sm py-3 text-center text-caption font-semibold text-neutral-darkest" style={{ width: '100px' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-light">
                        {data.map((row) => (
                            <tr key={row._id} className="h-table-row transition-colors duration-150 hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td key={col.accessor} className="px-sm py-3 text-body text-neutral-dark">
                                        {renderCell(row, col)}
                                    </td>
                                ))}
                                <td className="px-sm py-3 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => onEdit(row)}
                                            className="text-neutral-dark hover:text-primary transition-colors"
                                            aria-label={`Edit ${row.name}`}
                                        >
                                            <Edit className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(row)}
                                            className="text-neutral-dark hover:text-error transition-colors"
                                            aria-label={`Delete ${row.name}`}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View (Card Layout) */}
            <div className="md:hidden bg-neutral-50 p-sm space-y-sm">
                {data.map((row) => (
                    <div key={row._id} className="bg-white p-sm rounded-lg shadow-sm border border-neutral-light">
                        <div className="space-y-xs">
                            {columns.map((col) => (
                                <div key={col.header} className="flex justify-between items-center">
                                    <span className="text-caption font-semibold text-neutral-medium">{col.header}</span>
                                    <span className="text-body text-neutral-dark text-right">{renderCell(row, col)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-md mt-sm pt-sm border-t border-neutral-light">
                            <button
                                onClick={() => onEdit(row)}
                                className="flex items-center gap-1 text-neutral-dark hover:text-primary transition-colors text-sm"
                            >
                                <Edit className="h-4 w-4" /> Edit
                            </button>
                            <button
                                onClick={() => onDelete(row)}
                                className="flex items-center gap-1 text-neutral-dark hover:text-error transition-colors text-sm"
                            >
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;
