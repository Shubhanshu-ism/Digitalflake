import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import DeleteModal from '../components/DeleteModal';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, List, Search } from 'lucide-react';
import api from '../api/axios';

const Subcategory = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState('');

    const fetchSubcategories = async (searchTerm = '') => {
        try {
            // Assuming the API can handle a search query
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
        { header: 'ID', accessor: '_id', width: '100px', sortable: true, render: (row) => row._id.substring(row._id.length - 6) },
        { header: 'Subcategory Name', accessor: 'name', width: 'flex-1', sortable: true },
        { header: 'Category Name', accessor: 'category.name', width: '200px', sortable: true },
        { header: 'Image', accessor: 'image.url', width: '80px', sortable: false, type: 'image' },
        { header: 'Status', accessor: 'status', width: '120px', sortable: true, type: 'status' },
    ];

    const navigate = useNavigate();

    const handleEdit = (item) => {
        navigate(`/subcategory/edit/${item._id}`);
    };



    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/subcategories/${selectedItem._id}`);
            setIsDeleteModalOpen(false);
            fetchSubcategories(search); // Refresh list
        } catch (error) {
            console.error('Error deleting subcategory:', error);
        }
    };

    return (
        <div className="space-y-md">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-sm">
                    <List className="h-6 w-6 text-neutral-dark" />
                    <h1 className="text-title font-semibold">Subcategories</h1>
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
                    <Button variant="primary" onClick={() => navigate('/subcategory/add')}>
                        <Plus className="h-5 w-5 mr-2" />
                        Add New
                    </Button>
                </div>
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
                title="Delete Subcategory"
                message={`Are you sure you want to delete the subcategory "${selectedItem?.name}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default Subcategory;
