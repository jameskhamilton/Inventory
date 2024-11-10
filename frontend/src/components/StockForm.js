// frontend/src/components/StockForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './StockForm.css'; // Import the CSS file for styling

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
            alert(response.data.message);  // Alert on success
        } catch (error) {
            console.error("There was an error adding the stock!", error);
            alert('Error saving stock data');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="item_name">Item Name:</label>
                <input
                    type="text"
                    id="item_name"
                    name="item_name"
                    value={formData.item_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="supplier">Supplier:</label>
                <input
                    type="text"
                    id="supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="cost">Cost:</label>
                <input
                    type="number"
                    id="cost"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    required
                    step="0.01"
                />

                <button type="submit" className="submit-btn">Add Stock</button>
            </form>
        </div>
    );
};

export default StockForm;
