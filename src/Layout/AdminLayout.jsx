import React, {useState} from 'react';
import control from '../assets/control.png'
import dash from '../assets/logo.png'
import chart_fill from '../assets/Chart_fill.png'
import chart from '../assets/Chart.png'
import userimg from '../assets/User.png'
import cal from '../assets/Calendar.png'
import search from '../assets/Search.png'
import chat from '../assets/Chat.png'
import folder from '../assets/Folder.png'
import sett from '../assets/Setting.png'
import {Link, Outlet} from "react-router-dom";
import {MdDashboard, MdFastfood} from "react-icons/md";
import {BsCartPlusFill} from "react-icons/bs";

const AdminLayout = () => {

    const [open, setOpen] = useState(false);
    const Menus = [
        {title: "Dashboard", src: <MdDashboard/>, anchor: "/admin", data: "Dashboard"},
        {title: "Control Food Menu", src: <MdFastfood/>, anchor: "/admin/controlmenu", data: "Control Food Menu"},
        // {title: "Accounts", src: userimg, gap: true, anchor: "#"},
        {title: "Order Management", src: <BsCartPlusFill/>, anchor: "/admin/manageorders", data: "Order Management"},
        // {title: "Search", src: search, anchor: "#"},
        // {title: "Analytics", src: chart, anchor: "#"},
        // {title: "Files ", src: folder, gap: true, anchor: "#"},
        // {title: "Setting", src: sett, anchor: "#"},
    ];

    return (
        <div className="">
            <div className={` ${open ? "w-72" : "w-20 "} bg-dark-purple h-screen p-5  pt-8 duration-300 z-10 fixed`}>
                <img
                    src={control}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                    alt=""/>
                <div className="flex gap-x-4 items-center">
                    <img
                        src={dash}
                        className={`cursor-pointer duration-500 ${
                            open && "rotate-[360deg]"
                        }`}
                        alt=""/>
                    <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
                        Designer
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className="">

                            <Link to={`${Menu.anchor}`} className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} `}>
                                {/*<img src={`${Menu.src}`} alt=""/>*/}
                                <div className="tooltip tooltip-right text-xl" data-tip={Menu?.data}>
                                    <span>{Menu.src}</span>
                                </div>
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen pt-7 ml-24 mr-4">
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminLayout;
