import React, {useContext, useEffect} from 'react';
import {stateContext, useGlobalState} from "./state/provider";
import {domain, header, userToken} from "./env";
import Axios from "axios";

const Prefetch = () => {

    const { isLoggedIn, setIsLoggedIn} = useContext(stateContext);
    const [{profile, page_reload}, dispatch] = useGlobalState();

    useEffect(() => {
        if(userToken !== null)
        {
            const getUserProfile = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/auth/user/`,
                    headers: header
                }).then(response => {
                    console.log(response.data["data"][0]);
                    dispatch({
                        type: "ADD_PROFILE",
                        profile: response.data["data"][0]
                    })
                })
            }
            getUserProfile();
        }
    }, [dispatch, page_reload]);


    return (
        <>
        </>
    );
};

export default Prefetch;
