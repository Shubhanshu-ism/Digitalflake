import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';
import Dropdown from '../components/Dropdown';

const EditSubcategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [status, setStatus] = useState('Active');
    const [imageFile, setImageFile] = useState(null);
    const [initialImageUrl, setInitialImageUrl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, subcategoryRes] = await Promise.all([
                    api.get('/categories'),
                    api.get(`/subcategories/${id}`)
                ]);
                
                setCategories(categoriesRes.data.map(cat => ({ value: cat._id, label: cat.name })));
                
                const subcategory = subcategoryRes.data;
                setName(subcategory.name);
                setCategoryId(subcategory.category._id || subcategory.category);
                setStatus(subcategory.status);
                if (subcategory.image) {
                    setInitialImageUrl(subcategory.image.url);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data. Please try again.');
            }
        };
        fetchData();
    }, [id]);

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
        formData.append('status', status);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await api.put(`/subcategories/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/subcategory');
        } catch (error) {
            console.error('Error updating subcategory:', error);
            setError('Failed to update subcategory. Please try again.');
        }
    };

    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    return (
        <div className="space-y-md">
            <div className="flex items-center gap-sm">
                <Button variant="ghost" onClick={() => navigate('/subcategory')} className="px-2">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-title font-semibold">Edit Subcategory</h1>
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
                        <Button variant="secondary" onClick={() => navigate('/subcategory')}>
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

export default EditSubcategory;