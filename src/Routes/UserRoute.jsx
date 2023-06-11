import React, {useContext, useEffect} from 'react';
import {stateContext, useGlobalState} from "../state/provider";
import {domain, header, userToken} from "../env";
import Axios from "axios";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const UserRoute = ({children}) => {
    const { isLoggedIn, setIsLoggedIn} = useContext(stateContext);
    const [{profile, page_reload}, dispatch] = useGlobalState();
    const location = useLocation();
    const navigate = useNavigate();


    if (profile !== null)
    {
        return children;
    }

    if(userToken !== null)
    {
        return children;
    }



    return <Navigate to="/login" state={{from: location}} replace/>;
};

export default UserRoute;
