import { useState, useEffect } from 'react';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);

    const checkAuthenticated = () => {
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the token payload
            const tokenExpirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
            if (Date.now() > tokenExpirationTime) {
                // Token has expired, remove it from local storage
                localStorage.removeItem('access');
                setAuthenticated(false)
            } else {
                setAuthenticated(true); // Token is valid and not expired
            }
        } else {
            setAuthenticated(false); // No token found in local storage
        }
    };

    useEffect(() => {
        checkAuthenticated();
    }, []);

    return authenticated;
};

export default useAuth;
