import { useState, useEffect } from 'react';
import api from '../api/axios';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

const columns = [
    { key: 'name', name: 'Name' },
    { key: 'description', name: 'Description' },
    { key: 'category', name: 'Category' },
    { key: 'status', name: 'Status' },
    { key: 'createdAt', name: 'Created At' },
];

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Items List
            </h3>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid columns={columns} rows={items} />
            </div>
        </div>
    );
};

export default Dashboard;
