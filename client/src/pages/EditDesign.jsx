import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

const EditDesign = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchDesign = async () => {
            const { data } = await axios.get(`/api/designs/${id}`);
            setName(data.name);
            setDescription(data.description);
        };
        fetchDesign();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/designs/${id}`, { name, description });
            navigate('/designs');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Edit Design</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Update Design</button>
            </form>
        </div>
    );
};

export default EditDesign;
