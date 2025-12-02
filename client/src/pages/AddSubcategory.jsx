import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';
import Dropdown from '../components/Dropdown';

const AddSubcategory = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/categories');
                setCategories(data.filter(cat => cat.status === 'Active').map(cat => ({ value: cat._id, label: cat.name })));
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories.');
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!name || !categoryId) {
            setError('Subcategory name and parent category are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', categoryId);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await api.post('/subcategories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/subcategory');
        } catch (error) {
            console.error('Error creating subcategory:', error);
            setError('Failed to create subcategory. Please try again.');
        }
    };

    return (
        <div className="space-y-md">
            <div className="flex items-center gap-sm">
                <Button variant="ghost" onClick={() => navigate('/subcategory')} className="px-2">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-title font-semibold">Add Subcategory</h1>
            </div>

            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-lg">
                <form onSubmit={handleSubmit} className="space-y-md">
                    <div>
                        <label htmlFor="name" className="block text-body font-medium text-neutral-darkest mb-xs">
                            Subcategory Name <span className="text-error">*</span>
                        </label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter subcategory name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-body font-medium text-neutral-darkest mb-xs">
                            Parent Category <span className="text-error">*</span>
                        </label>
                        <Dropdown
                            id="category"
                            options={categories}
                            selected={categoryId}
                            onChange={(option) => setCategoryId(option.value)}
                            placeholder="Select a category"
                        />
                    </div>

                    <div>
                        <label className="block text-body font-medium text-neutral-darkest mb-xs">
                            Image
                        </label>
                        <ImageUpload onFileSelect={setImageFile} />
                    </div>

                    {error && <p className="text-error text-sm">{error}</p>}

                    <div className="flex justify-end gap-sm pt-md">
                        <Button variant="secondary" onClick={() => navigate('/subcategory')}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSubcategory;
