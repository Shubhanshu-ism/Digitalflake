import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';
import Dropdown from '../components/Dropdown';
import MultiSelectDropdown from '../components/MultiSelectDropdown';

const AddProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [allSubcategories, setAllSubcategories] = useState([]); // All subcategories
    const [filteredSubcategories, setFilteredSubcategories] = useState([]); // Subcategories filtered by category
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categoriesRes, subcategoriesRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/subcategories'),
                ]);
                setCategories(categoriesRes.data.map(cat => ({ value: cat._id, label: cat.name })));
                setAllSubcategories(subcategoriesRes.data);
            } catch (err) {
                console.error('Error fetching initial data:', err);
                setError('Failed to load categories or subcategories.');
            }
        };
        fetchInitialData();
    }, []);

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
        setSelectedSubcategoryIds([]); // Clear selected subcategories when category changes
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
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await api.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/products');
        } catch (err) {
            console.error('Error creating product:', err);
            setError('Failed to create product. Please try again.');
        }
    };

    return (
        <div className="space-y-md">
            <div className="flex items-center gap-sm">
                <Button variant="ghost" onClick={() => navigate('/products')} className="px-2">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-title font-semibold">Add Product</h1>
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
                            placeholder="Enter product name"
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
                        <ImageUpload onFileSelect={setImageFile} />
                    </div>

                    {error && <p className="text-error text-sm">{error}</p>}

                    <div className="flex justify-end gap-sm pt-md">
                        <Button variant="secondary" onClick={() => navigate('/products')}>
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

export default AddProduct;
