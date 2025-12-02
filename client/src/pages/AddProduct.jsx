import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';

const AddProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [status, setStatus] = useState('Active');
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/categories');
                setCategories(data);
                if (data.length > 0) setCategoryId(data[0]._id);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (!categoryId) return;
            try {
                const { data } = await api.get('/subcategories');
                const filtered = data.filter(sub => sub.category._id === categoryId);
                setSubcategories(filtered);
                if (filtered.length > 0) setSubcategoryId(filtered[0]._id);
                else setSubcategoryId('');
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };
        fetchSubcategories();
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', categoryId);
        formData.append('subcategory', subcategoryId);
        formData.append('status', status);
        if (image) {
            formData.append('image', image);
        }

        try {
            await api.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/products');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Link to="/products" className="text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5C218B] focus:border-[#5C218B] sm:text-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                id="category"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5C218B] focus:border-[#5C218B] sm:text-sm"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                                Subcategory
                            </label>
                            <select
                                id="subcategory"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5C218B] focus:border-[#5C218B] sm:text-sm"
                                value={subcategoryId}
                                onChange={(e) => setSubcategoryId(e.target.value)}
                            >
                                {subcategories.map((sub) => (
                                    <option key={sub._id} value={sub._id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5C218B] file:text-white hover:file:bg-[#4a1a70]"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5C218B] focus:border-[#5C218B] sm:text-sm"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <Link
                            to="/products"
                            className="px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C218B]"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#5C218B] hover:bg-[#4a1a70] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C218B]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
