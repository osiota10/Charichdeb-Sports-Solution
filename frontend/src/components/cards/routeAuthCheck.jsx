import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../dashboard/components/authCheck';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authenticated = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
};

export default PrivateRoute;



// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import useAuth from '../dashboard/components/authCheck';

// const withAuth = (Component) => {
//     return (props) => {
//         const isAuthenticated = useAuth(); // Replace useAuth() with your custom hook for authentication

//         if (isAuthenticated === false) {
//             return <Navigate to="/login" />;
//         }

//         return <Component {...props} />;
//     };
// };

// export default withAuth;
