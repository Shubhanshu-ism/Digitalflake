import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';
import Dropdown from '../components/Dropdown';
import MultiSelectDropdown from '../components/MultiSelectDropdown';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([]);
    const [status, setStatus] = useState('Active');
    const [imageFile, setImageFile] = useState(null);
    const [initialImageUrl, setInitialImageUrl] = useState(null);
    
    const [categories, setCategories] = useState([]);
    const [allSubcategories, setAllSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, subcategoriesRes, productRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/subcategories'),
                    api.get(`/products/${id}`)
                ]);
                
                setCategories(categoriesRes.data.map(cat => ({ value: cat._id, label: cat.name })));
                setAllSubcategories(subcategoriesRes.data);

                const product = productRes.data;
                setName(product.name);
                setCategoryId(product.category._id || product.category);
                setSelectedSubcategoryIds(product.subcategories.map(sub => sub._id || sub));
                setStatus(product.status);
                if (product.image) {
                    setInitialImageUrl(product.image.url);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load product data.');
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (categoryId) {
            setFilteredSubcategories(
                allSubcategories
                    .filter(sub => sub.category && sub.category._id === categoryId)
                    .map(sub => ({ value: sub._id, label: sub.name }))
            );
        } else {
            setFilteredSubcategories([]);
        }
    }, [categoryId, allSubcategories]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!name || !categoryId || selectedSubcategoryIds.length === 0) {
            setError('Product name, category, and at least one subcategory are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', categoryId);
        selectedSubcategoryIds.forEach(subId => {
            formData.append('subcategories[]', subId); // Send as array
        });
        formData.append('status', status);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await api.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/products');
        } catch (err) {
            console.error('Error updating product:', err);
            setError('Failed to update product. Please try again.');
        }
    };

    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    return (
        <div className="space-y-md">
            <div className="flex items-center gap-sm">
                <Button variant="ghost" onClick={() => navigate('/products')} className="px-2">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-title font-semibold">Edit Product</h1>
            </div>

            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-lg">
                <form onSubmit={handleSubmit} className="space-y-md">
                    <div>
                        <label htmlFor="name" className="block text-body font-medium text-neutral-darkest mb-xs">
                            Product Name <span className="text-error">*</span>
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
                            Category <span className="text-error">*</span>
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
                        <label htmlFor="subcategories" className="block text-body font-medium text-neutral-darkest mb-xs">
                            Subcategories <span className="text-error">*</span>
                        </label>
                        <MultiSelectDropdown
                            id="subcategories"
                            options={filteredSubcategories}
                            selected={selectedSubcategoryIds}
                            onChange={setSelectedSubcategoryIds}
                            placeholder="Select subcategories"
                            dependsOn={categoryId}
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
                        <Button variant="secondary" onClick={() => navigate('/products')}>
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

export default EditProduct;
