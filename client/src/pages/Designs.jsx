import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Table from '../components/Table';

const Designs = () => {
    const [designs, setDesigns] = useState([]);
    const navigate = useNavigate();

    const fetchDesigns = useCallback(async () => {
        const { data } = await axios.get('/api/designs');
        setDesigns(data);
    }, []);

    useEffect(() => {
        fetchDesigns();
    }, [fetchDesigns]);

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Description', accessor: 'description' },
    ];

    const handleEdit = (design) => {
        navigate(`/designs/edit/${design._id}`);
    };

    const handleDelete = async (design) => {
        try {
            await axios.delete(`/api/designs/${design._id}`);
            fetchDesigns();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Designs</h1>
            <Link to="/designs/add">Add Design</Link>
            <Table
                columns={columns}
                data={designs}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Designs;
