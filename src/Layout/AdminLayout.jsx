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

const AdminLayout = () => {

    const [open, setOpen] = useState(true);
    const Menus = [
        {title: "Dashboard", src: chart_fill, anchor: "/admin"},
        {title: "Control Food Menu", src: chat, anchor: "/admin/controlmenu"},
        {title: "Accounts", src: userimg, gap: true, anchor: "#"},
        {title: "Schedule ", src: cal, anchor: "#"},
        {title: "Search", src: search, anchor: "#"},
        {title: "Analytics", src: chart, anchor: "#"},
        {title: "Files ", src: folder, gap: true, anchor: "#"},
        {title: "Setting", src: sett, anchor: "#"},
    ];

    return (
        <div className="flex">
            <div
                className={` ${
                    open ? "w-72" : "w-20 "
                } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
            >
                <img
                    src={control}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                 alt=""/>
                <div className="flex gap-x-4 items-center">
                    <img
                        src={dash}
                        className={`cursor-pointer duration-500 ${
                            open && "rotate-[360deg]"
                        }`}
                     alt=""/>
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${
                            !open && "scale-0"
                        }`}
                    >
                        Designer
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className="">

                            <Link to={`${Menu.anchor}`} className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} `}>
                                <img src={`${Menu.src}`} alt=""/>
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminLayout;
