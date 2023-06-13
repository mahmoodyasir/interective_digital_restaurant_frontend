import React from 'react';
import {useGlobalState} from "../state/provider";
import {Navigate, useLocation} from "react-router-dom";
import {adminToken} from "../env";

const AdminRoute = ({children}) => {

    // HERE, We limit access of all the admin components from Regular User
    // Only Authorized Admin User is permitted

    const [{admin_profile, page_reload}, dispatch] = useGlobalState();
    const location = useLocation();

    if (admin_profile !== null)
    {
        return children;
    }

    if (adminToken !== null && adminToken !== undefined)
    {
        return children
    }

    return <Navigate to="/admin_login" state={{from: location}} replace/>;
};

export default AdminRoute;
