import React from 'react';
import Navbar from "../UserComponents/Navbar/Navbar";
import {Outlet} from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="bg-amber-50 w-full h-screen">
            <Navbar/>
            <Outlet/>

        </div>
    );
};

export default UserLayout;
