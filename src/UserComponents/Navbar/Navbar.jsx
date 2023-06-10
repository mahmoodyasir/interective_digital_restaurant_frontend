import React, {useState} from 'react';
import Button from "./Button";
import {Link} from "react-router-dom";
import './Nav.css'

const Navbar = () => {

    let [open, setOpen] = useState(false);

    return (
        <div className='shadow-md w-full fixed top-0 left-0 z-10'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins]
      text-gray-800'>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
        <ion-icon name="logo-ionic"></ion-icon>
        </span>
                    Food Mania
                </div>

                <div onClick={() => setOpen(!open)}
                     className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-violet-600'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`xl:flex xl:items-center xl:pb-0 pb-12 absolute xl:static bg-white xl:z-auto z-[-1] left-0 w-full xl:w-auto xl:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>

                    <li className='parent-list'>
                        <Link to="/" className='each-link'>HOME</Link>
                    </li>
                    <li  className='parent-list'>
                        <Link to="/profile" className='each-link'>PROFILE</Link>
                    </li>
                    <li  className='parent-list'>
                        <Link to="" className='each-link'>ORDERS</Link>
                    </li>
                    <li  className='parent-list'>
                        <Link to="" className='each-link'>CART</Link>
                    </li>
                    <li  className='parent-list'>
                        <Link to="" className='each-link'>FEEDBACKS</Link>
                    </li>
                    <li  className='parent-list'>
                        <Link to="" className='each-link'>LOGOUT</Link>
                    </li>
                    <li  className='parent-list'>
                        <Link to="/login" className='each-link'>LOGIN</Link>
                    </li>
                    <li  className='parent-list'>
                        <Link to="/register" className='each-link'>REGISTER</Link>
                    </li>

                    <Button>
                        Get Started
                    </Button>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
