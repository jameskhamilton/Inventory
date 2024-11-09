// frontend/src/components/StockForm.js
import React, { useState } from 'react';
import axios from 'axios';

const StockForm = () => {
    const [formData, setFormData] = useState({
        item_name: '',
        supplier: '',
        quantity: 0,
        cost: 0.0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/add_stock', formData);
            alert(response.data.message);
        } catch (error) {
            console.error("There was an error adding the stock!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Item Name:
                <input type="text" name="item_name" value={formData.item_name} onChange={handleChange} required />
            </label>
            <label>
                Supplier:
                <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} required />
            </label>
            <label>
                Quantity:
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </label>
            <label>
                Cost:
                <input type="number" name="cost" value={formData.cost} onChange={handleChange} required />
            </label>
            <button type="submit">Add Stock</button>
        </form>
    );
};

export default StockForm;
