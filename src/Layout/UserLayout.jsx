import React from 'react';
import Navbar from "../UserComponents/Navbar/Navbar";
import {Outlet} from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="">
            <Navbar />
            <div className="pb-24"></div>
            <Outlet />

        </div>
    );
};

export default UserLayout;
