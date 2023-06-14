import React, {useEffect} from 'react';
import {useGlobalState} from "./state/provider";
import {admin_header, adminToken, domain, header, userToken} from "./env";
import Axios from "axios";

const ApiCheck = () => {
    const [{profile, page_reload, admin_profile}, dispatch] = useGlobalState();

    // Getting Regular User Data
    useEffect(() => {
        if (userToken !== null) {
            const getUserProfile = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/auth/user/`,
                    headers: header
                }).then(response => {
                    // console.log(response.data["data"][0]);
                    dispatch({
                        type: "ADD_PROFILE",
                        profile: response.data["data"][0]
                    })
                })
            }
            getUserProfile();
        }
    }, [dispatch, page_reload]);

    // Getting admin user data
    useEffect(() => {
        if (adminToken !== null) {
            const getadmindata = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/auth/admin_profile/`,
                    headers: admin_header
                }).then(response => {
                    // console.log(response.data["data"])
                    dispatch({
                        type: "ADMIN_PROFILE",
                        admin_profile: response.data["data"][0]
                    })
                })
            }
            getadmindata()
        }
    }, [dispatch, page_reload]);

    // Checking if user is logged in, then CART is complete or not
    useEffect(() => {
        if (userToken !== null) {
            const getcart = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/cart/`,
                    headers: header
                }).then(response => {
                    // console.log(response.data, " CART");
                    {
                        const all_data = []
                        // eslint-disable-next-line array-callback-return
                        response?.data.map(data => {
                            if (data.complete) {
                                all_data.push(data)
                                dispatch({
                                    type: "ADD_CARTCOMPLETE",
                                    cart_complete: all_data
                                })
                            } else {
                                dispatch({
                                    type: "ADD_CARTINCOMPLETE",
                                    cart_incomplete: data
                                })
                            }
                        })
                    }
                })
            }
            getcart()
        }
    }, [dispatch, page_reload]);

    // Fetching all menu Items on app start
    useEffect(() => {
        const only_product = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/nopagitem/`,

            }).then(response => {
                // console.log(response.data, " ONLY PRODUCTS ");
                dispatch({
                    type: "ONLY_PRODUCT",
                    only_product: response.data
                })
            })
        }
        only_product()
    }, [page_reload]);

    return (
        <div>

        </div>
    );
};

export default ApiCheck;
