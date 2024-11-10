// frontend/src/App.js
import React from 'react';
import StockForm from './components/StockForm';
import './App.css'; // Import the App.css for styling

function App() {
    return (
        <div className="App">
            <div className="header">
                <h1>Stock Procurement Form</h1>
            </div>
                <StockForm />
        </div>
    );
}

export default App;
