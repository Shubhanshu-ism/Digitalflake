import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';
import Dropdown from '../components/Dropdown';

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Active');
    const [imageFile, setImageFile] = useState(null);
    const [initialImageUrl, setInitialImageUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data } = await api.get(`/categories/${id}`);
                setName(data.name);
                setStatus(data.status);
                if (data.image) {
                    setInitialImageUrl(data.image.url);
                }
            } catch (error) {
                console.error('Error fetching category:', error);
                setError('Failed to load category data.');
            }
        };
        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!name) {
            setError('Category name is required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('status', status);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await api.put(`/categories/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/category');
        } catch (error) {
            console.error('Error updating category:', error);
            setError('Failed to update category. Please try again.');
        }
    };

    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    return (
        <div className="space-y-md">
            <div className="flex items-center gap-sm">
                <Button variant="ghost" onClick={() => navigate('/category')} className="px-2">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-title font-semibold">Edit Category</h1>
            </div>

            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-lg">
                <form onSubmit={handleSubmit} className="space-y-md">
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
                        <ImageUpload
                            onFileSelect={setImageFile}
                            initialPreview={initialImageUrl}
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-body font-medium text-neutral-darkest mb-xs">
                            Status <span className="text-error">*</span>
                        </label>
                        <Dropdown
                            id="status"
                            options={statusOptions}
                            selected={status}
                            onChange={(option) => setStatus(option.value)}
                        />
                    </div>

                    {error && <p className="text-error text-sm">{error}</p>}

                    <div className="flex justify-end gap-sm pt-md">
                        <Button variant="secondary" onClick={() => navigate('/category')}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;
