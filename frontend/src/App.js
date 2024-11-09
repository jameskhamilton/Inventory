import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://127.0.0.1:5000/api/users');
        setUsers(response.data);
    };

    const addUser = async (e) => {
        e.preventDefault();
        const newUser = { name, email };
        await axios.post('http://127.0.0.1:5000/api/users', newUser);
        setName('');
        setEmail('');
        fetchUsers();
    };

    return (
        <div>
            <h1>User Management</h1>
            <form onSubmit={addUser}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Add User</button>
            </form>
            <h2>Users</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;