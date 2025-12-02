import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';

const AddCategory = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!name) {
            setError('Category name is required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await api.post('/categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/category');
        } catch (error) {
            console.error('Error creating category:', error);
            setError('Failed to create category. Please try again.');
        }
    };

    return (
        <div className="space-y-md">
            {/* Page Header */}
            <div className="flex items-center gap-sm">
                <Button variant="ghost" onClick={() => navigate('/category')} className="px-2">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-title font-semibold">Add Category</h1>
            </div>

            {/* Form Container */}
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-lg">
                <form onSubmit={handleSubmit} className="space-y-md">
                    {/* Form Fields */}
                    <div>
                        <label htmlFor="name" className="block text-body font-medium text-neutral-darkest mb-xs">
                            Category Name <span className="text-error">*</span>
                        </label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter category name"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-body font-medium text-neutral-darkest mb-xs">
                            Image
                        </label>
                        <ImageUpload onFileSelect={setImageFile} />
                    </div>

                    {error && <p className="text-error text-sm">{error}</p>}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-sm pt-md">
                        <Button variant="secondary" onClick={() => navigate('/category')}>
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

export default AddCategory;

