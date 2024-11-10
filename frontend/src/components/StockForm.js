import React, { useState } from 'react';
import axios from 'axios';
import './StockForm.css';
import itemsData from '../data/items.json';  // Import the JSON file

const StockForm = () => {
    // List of all item categories with group ID
    const availableGroups = Object.keys(itemsData).sort((a, b) => a.localeCompare(b));

    const [formData, setFormData] = useState({
        supplier: '',
        cost: '',
        procurement_date: '',
        items: []
    });

    const [newItem, setNewItem] = useState({
        group: '',   // Store the selected group
        group_id: '', // Store the associated group ID
        quantity: '' // Store the quantity for the selected group
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleGroupChange = (e) => {
        const { value } = e.target;
        // Get the group ID from the selected group
        const group_id = itemsData[value]?.group_id || '';
        setNewItem({ ...newItem, group: value, group_id });
    };

    const handleAddItem = () => {
        if (newItem.group && newItem.quantity > 0 && newItem.quantity < 10000) {
            // Add the new item with group name, ID, and quantity to the formData
            const updatedItems = [...formData.items, {
                group_name: newItem.group,
                group_id: newItem.group_id, // Save the group ID
                quantity: newItem.quantity  // Save the quantity
            }];
            updatedItems.sort((a, b) => a.group_name.localeCompare(b.group_name));

            // Update formData
            setFormData(prevData => ({
                ...prevData,
                items: updatedItems
            }));

            // Reset the newItem state
            setNewItem({ group: '', group_id: '', quantity: '' });
        } else if (newItem.quantity >= 10000) {
            alert('Please enter a valid quantity less than 10,000.');
        } else {
            alert('Please select a valid group and enter a valid quantity.');
        }
    };

    const handleRemoveItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
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
            items: formData.items
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/add_stock', payload);
            alert(response.data.message);
            setFormData({
                supplier: '',
                cost: '',
                procurement_date: '',
                items: []
            });
            setNewItem({ group: '', group_id: '', quantity: '' });
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : 'Unknown error';
            console.error("There was an error adding the stock!", errorMessage);
            alert(`Error: ${errorMessage}`);
        }
    };

    // Filter out groups that have already been added to the list
    const filteredGroups = availableGroups.filter(group => 
        !formData.items.some(item => item.group_name === group)
    );

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>

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

                <div className="section-divider"></div>

                <label htmlFor="group">Item Groups:</label>
                <select
                    id="group"
                    name="group"
                    value={newItem.group}
                    onChange={handleGroupChange}
                >
                    <option value="">Select Items</option>
                    {filteredGroups.map((group, index) => (
                        <option key={index} value={group}>{group}</option>
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
                    Add Items
                </button>

                <h3>Selected Items:</h3>
                <ul>
                    {formData.items.map((item, index) => (
                        <li key={index}>
                            <span className="item-text">{item.group_name} - {item.quantity}</span>
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
                
                <div className="section-divider"></div>

                <button type="submit" className="submit-btn">Submit All</button>
            </form>
        </div>
    );
};

export default StockForm;
