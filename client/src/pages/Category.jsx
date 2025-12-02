import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import DeleteModal from '../components/DeleteModal';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, Grid, Search } from 'lucide-react';
import api from '../api/axios';

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
        { header: 'ID', accessor: '_id', width: '100px', sortable: true, render: (row) => row._id.substring(row._id.length - 6) },
        { header: 'Name', accessor: 'name', width: 'flex-1', sortable: true },
        { header: 'Image', accessor: 'image.url', width: '80px', sortable: false, type: 'image' },
        { header: 'Status', accessor: 'status', width: '120px', sortable: true, type: 'status' },
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
            fetchCategories(search); // Refresh list
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="space-y-md">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-sm">
                    <Grid className="h-6 w-6 text-neutral-dark" />
                    <h1 className="text-title font-semibold">Categories</h1>
                </div>
                <div className="flex items-center gap-sm">
                    <div className="w-[280px]">
                        <Input 
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            icon={Search}
                        />
                    </div>
                    <Button variant="primary" onClick={() => navigate('/category/add')}>
                        <Plus className="h-5 w-5 mr-2" />
                        Add New
                    </Button>
                </div>
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
                title="Delete Category"
                message={`Are you sure you want to delete the category "${selectedCategory?.name}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default Category;
