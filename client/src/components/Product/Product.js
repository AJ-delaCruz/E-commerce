import React, { useState } from 'react';
import axios from 'axios';
import {backendUrl} from "../../config";
import jwt_decode from 'jwt-decode';

export const Product = () =>  {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name: name,
            price: price,
            description: description,
        };

        try {
            // Get JWT token from local storage
            const token = localStorage.getItem('token');

            // Set authorization header with the JWT token
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };

            const res = await axios.post(`${backendUrl}/product/add`, newProduct, config);

            console.log(res.data);
            // reset form after successful submission
            setName('');
            setDescription('');
            setPrice(0);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <label>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <br />
            <button type="submit">Create Product</button>
        </form>
    );
}
