import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const Table = ({ columns, data, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#FFF8B7]">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900 tracking-wider"
                            >
                                {col.header}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-gray-900 tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {col.render ? col.render(row) : row[col.accessor]}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onEdit(row)}
                                    className="text-gray-400 hover:text-gray-600 mx-2"
                                >
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => onDelete(row)}
                                    className="text-gray-400 hover:text-red-600 mx-2"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
