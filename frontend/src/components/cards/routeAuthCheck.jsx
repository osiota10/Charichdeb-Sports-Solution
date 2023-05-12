import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthenticated } from '../../actions/auth';
import { Navigate } from 'react-router-dom';

export const withAuth = (WrappedComponent) => {
    const HOC = (props) => {
        const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
        const dispatch = useDispatch();

        useEffect(() => {
            checkAuthenticated();
        }, []);

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        return <WrappedComponent {...props} />;
    };

    return HOC;
};
