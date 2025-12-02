import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import StatusBadge from '../components/StatusBadge';
import DeleteModal from '../components/DeleteModal';
import { Plus } from 'lucide-react';
import api from '../api/axios';
// 

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [search, setSearch] = useState('');

    const fetchCategories = async (searchTerm = '') => {
        try {
            const { data } = await api.get(`/categories?search=${searchTerm}`);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchCategories(search);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const columns = [
        { header: 'ID', accessor: '_id', render: (row) => row._id.substring(row._id.length - 6) }, // Show last 6 chars of ID
        { header: 'Name', accessor: 'name' },
        { header: 'Description', accessor: 'description' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => <StatusBadge status={row.status} />,
        },
    ];

    const navigate = useNavigate();

    const handleEdit = (category) => {
        navigate(`/category/edit/${category._id}`);
    };

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/categories/${selectedCategory._id}`);
            setIsDeleteModalOpen(false);
            fetchCategories(); // Refresh list
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-800">Category</h1>
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
                <Link to="/category/add" className="flex items-center px-4 py-2 bg-[#5C218B] text-white rounded-md hover:bg-[#4a1a70]">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New
                </Link>
            </div>

            <Table
                columns={columns}
                data={categories}
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

export default Category;
