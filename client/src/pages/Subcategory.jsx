import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import StatusBadge from '../components/StatusBadge';
import DeleteModal from '../components/DeleteModal';
import { Plus } from 'lucide-react';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const Subcategory = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [search, setSearch] = useState('');

    const fetchSubcategories = async (searchTerm = '') => {
        try {
            const { data } = await api.get(`/subcategories?search=${searchTerm}`);
            setSubcategories(data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSubcategories(search);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const columns = [
        { header: 'ID', accessor: '_id', render: (row) => row._id.substring(row._id.length - 6) },
        { header: 'Subcategory Name', accessor: 'name' },
        { header: 'Category Name', accessor: 'category', render: (row) => row.category?.name || 'N/A' },
        { header: 'Image', accessor: 'image', render: (row) => row.image ? <img src={row.image} alt={row.name} className="h-10 w-10 object-cover rounded" /> : 'No Image' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => <StatusBadge status={row.status} />,
        },
    ];

    const navigate = useNavigate();

    const handleEdit = (subcategory) => {
        navigate(`/subcategory/edit/${subcategory._id}`);
    };

    const handleDeleteClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/subcategories/${selectedSubcategory._id}`);
            setIsDeleteModalOpen(false);
            fetchSubcategories();
        } catch (error) {
            console.error('Error deleting subcategory:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-800">Subcategory</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5C218B]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                    </div>
                </div>
                <Link to="/subcategory/add" className="flex items-center px-4 py-2 bg-[#5C218B] text-white rounded-md hover:bg-[#4a1a70]">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New
                </Link>
            </div>

            <Table
                columns={columns}
                data={subcategories}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete"
                message="Are you sure you want to delete?"
            />
        </div>
    );
};

export default Subcategory;
