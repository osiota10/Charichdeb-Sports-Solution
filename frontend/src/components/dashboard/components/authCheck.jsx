import { useState, useLayoutEffect, useCallback } from 'react';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);

    const checkAuthenticated = useCallback(() => {
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the token payload
            const tokenExpirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
            const currentTime = Date.now();

            if (currentTime > tokenExpirationTime) {
                // Token has expired, remove it from local storage
                localStorage.removeItem('access');
                setAuthenticated(false);
            } else {
                setAuthenticated(true);
            }
        } else {
            setAuthenticated(false);
        }
    }, []);

    useLayoutEffect(() => {
        checkAuthenticated();

        // Get the token expiration time
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the token payload
            const tokenExpirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
            const currentTime = Date.now();
            const remainingTime = tokenExpirationTime - currentTime;

            // Run the checkAuthenticated function after the remaining time has passed
            const interval = setInterval(() => {
                checkAuthenticated();
            }, remainingTime);

            // Clean up the interval when the component is unmounted
            return () => {
                clearInterval(interval);
            };
        }
    }, [checkAuthenticated]);

    return authenticated;
};

export default useAuth;