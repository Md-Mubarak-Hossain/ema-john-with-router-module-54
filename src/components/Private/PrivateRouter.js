import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../UserContext/UserContext';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) { return <p>loading....</p> }
    if (user && user.uid) { return children }

    return (
        <Navigate to='/login'>

        </Navigate>
    );
};

export default PrivateRouter;