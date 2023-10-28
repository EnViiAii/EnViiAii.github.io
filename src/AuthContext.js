import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const [user, setUser] = useState('');
    const [role, setRole] = useState('');

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
                user,
                setUser,
                role,
                setRole
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
