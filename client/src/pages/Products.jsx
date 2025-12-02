import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import StatusBadge from '../components/StatusBadge';
import DeleteModal from '../components/DeleteModal';
import { Plus } from 'lucide-react';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [search, setSearch] = useState('');

    const fetchProducts = async (searchTerm = '') => {
        try {
            const { data } = await api.get(`/products?search=${searchTerm}`);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts(search);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const columns = [
        { header: 'ID', accessor: '_id', render: (row) => row._id.substring(row._id.length - 6) },
        { header: 'Name', accessor: 'name' },
        { header: 'Category', accessor: 'category', render: (row) => row.category?.name || 'N/A' },
        { header: 'Subcategory', accessor: 'subcategory', render: (row) => row.subcategory?.name || 'N/A' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => <StatusBadge status={row.status} />,
        },
    ];

    const navigate = useNavigate();

    const handleEdit = (product) => {
        navigate(`/products/edit/${product._id}`);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/products/${selectedProduct._id}`);
            setIsDeleteModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>
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
                <Link to="/products/add" className="flex items-center px-4 py-2 bg-[#5C218B] text-white rounded-md hover:bg-[#4a1a70]">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New
                </Link>
            </div>

            <Table
                columns={columns}
                data={products}
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

export default Products;
