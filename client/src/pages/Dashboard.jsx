import { useState, useEffect } from 'react';
import api from '../api/axios';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { key: '_id', name: 'ID', width: 220 },
        { key: 'name', name: 'Name' },
        { key: 'description', name: 'Description' },
        {
            key: 'status', name: 'Status', renderCell: ({ row }) => (
                <span className={row.status === 'Active' ? 'text-green-600' : 'text-red-600'}>
                    {row.status}
                </span>
            )
        },
        {
            key: 'action', name: 'Action', renderCell: () => (
                <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-blue-600"><Edit size={18} /></button>
                    <button className="text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
            )
        }
    ];

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await api.get('/items');
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Category
                    </h3>
                    <div className="relative">
                        <input type="text" placeholder="Search..." className="border rounded px-2 py-1" />
                    </div>
                </div>
                <button className="bg-[#5C218B] text-white px-4 py-2 rounded hover:bg-[#4a1a70]">Add New</button>
            </div>

            <div style={{ height: 500, width: '100%' }} className="rdg-light">
                <DataGrid
                    columns={columns}
                    rows={items}
                    className="rdg-header-yellow"
                />
            </div>
            <style>{`
        .rdg-header-yellow .rdg-header-row {
            background-color: #FFF8B7;
            color: #000;
            font-weight: bold;
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
