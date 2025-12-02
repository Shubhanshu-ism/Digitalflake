import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Active');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data } = await api.get('/categories');
                const category = data.find((c) => c._id === id);
                if (category) {
                    setName(category.name);
                    setDescription(category.description);
                    setStatus(category.status);
                }
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/categories/${id}`, { name, description, status });
            navigate('/category');
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Link to="/category" className="text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Category</h1>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5C218B] focus:border-[#5C218B] sm:text-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5C218B] focus:border-[#5C218B] sm:text-sm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
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

                    <div className="flex justify-end space-x-3">
                        <Link
                            to="/category"
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C218B]"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5C218B] hover:bg-[#4a1a70] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C218B]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;
