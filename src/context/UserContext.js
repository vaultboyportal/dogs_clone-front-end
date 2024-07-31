// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for user
export const UserContext = createContext();

export const UserProvider = ({ children, telegramId }) => {
    // Initialize state for user with default values
    const [user, setUser] = useState({
        username: '',
        balance: 0.0,
        // Add other default properties as necessary
    });
    // Fetch user data from the API when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${telegramId}`);
                setUser(response.data.user);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        if (telegramId) {
            fetchUser();
        }
    }, [telegramId]);

    // Provide the user data and a setter function
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
