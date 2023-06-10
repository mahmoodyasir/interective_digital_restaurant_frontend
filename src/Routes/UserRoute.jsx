import React, {useContext, useEffect} from 'react';
import {stateContext, useGlobalState} from "../state/provider";
import {domain, header, userToken} from "../env";
import Axios from "axios";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const UserRoute = ({children}) => {
    const {currentPage, setCurrentPage} = useContext(stateContext);
    const [{profile, page_reload}, dispatch] = useGlobalState();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(currentPage)

    // useEffect(() => {
    //     const get_data = async () => {
    //         if (userToken !== null)
    //         {
    //             await Axios({
    //                 method: "get",
    //                 url: `${domain}/auth/user/`,
    //                 headers: header
    //             }).then(response => {
    //                 console.log(response.data["data"][0])
    //                 dispatch({
    //                     type: "ADD_PROFILE",
    //                     profile: response.data["data"][0]
    //                 })
    //             })
    //             get_data()
    //         }
    //     }
    // }, [dispatch, page_reload]);


    if (currentPage)
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
