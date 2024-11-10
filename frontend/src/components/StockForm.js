import React, { useState } from 'react';
import axios from 'axios';
import './StockForm.css'; // Import the CSS file for styling

const StockForm = () => {
    const availableItems = ["T-shirt", "Trousers", "Top"]; // List of all items
    const [formData, setFormData] = useState({
        supplier: '',
        cost: '',
        procurement_date: '',
        items: [] // Store the added items with their quantities
    });

    const [newItem, setNewItem] = useState({
        item_name: '',
        quantity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleAddItem = () => {
        // Ensure item_name and quantity are provided before adding
        if (newItem.item_name && newItem.quantity > 0) {
            setFormData(prevData => ({
                ...prevData,
                items: [...prevData.items, newItem] // Add the new item to the list of items
            }));
            setNewItem({ item_name: '', quantity: '' }); // Reset the input fields for next item
        } else {
            alert('Please select an item and enter a valid quantity.');
        }
    };

    // Handle item removal
    const handleRemoveItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index); // Remove item by index
        setFormData(prevData => ({
            ...prevData,
            items: updatedItems
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            supplier: formData.supplier,
            cost: formData.cost,
            procurement_date: formData.procurement_date,
            items: formData.items // Send the grouped items here
        };
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/add_stock', payload);
            alert(response.data.message);  // Alert on success
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : 'Unknown error';
            console.error("There was an error adding the stock!", errorMessage);
            alert(`Error: ${errorMessage}`);
        }
    };

    // Filter available items to exclude those already added
    const filteredItems = availableItems.filter(
        item => !formData.items.some(addedItem => addedItem.item_name === item)
    );

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="item_name">Item Name:</label>
                <select
                    id="item_name"
                    name="item_name"
                    value={newItem.item_name}
                    onChange={handleItemChange}
                >
                    <option value="">Select an Item</option>
                    {filteredItems.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>

                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={newItem.quantity}
                    onChange={handleItemChange}
                    min="1"
                />

                <button type="button" className="submit-btn" onClick={handleAddItem}>
                    Add Item
                </button>

                <h3>Items Added:</h3>
                <ul>
                    {formData.items.map((item, index) => (
                        <li key={index}>
                            <span className="item-text">{item.item_name} - {item.quantity}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="remove-btn"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>

                <label htmlFor="supplier">Supplier:</label>
                <input
                    type="text"
                    id="supplier"
                    name="supplier"
                    value={formData.supplier}
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

                <label htmlFor="procurement_date">Procurement Date:</label>
                <input
                    type="date"
                    id="procurement_date"
                    name="procurement_date"
                    value={formData.procurement_date}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="submit-btn">Submit All</button>
            </form>
        </div>
    );
};

export default StockForm;
