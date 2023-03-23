import {backendUrl} from '../config';
import React, {useState} from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const category = {name};
            const token = localStorage.getItem('token');
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };

            const res = await axios.post(`${backendUrl}/category/add`, category, config);
            console.log(res.data);
            alert('Category added successfully!');
            setName('');
        } catch (error) {
            console.error(error);
            alert('Failed to add category!');
        }
    };

    return (
        <div>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;
