import React, {useContext, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import './Nav.css'
import {BsCart4} from "react-icons/bs";
import {stateContext, useGlobalState} from "../../state/provider";

const Navbar = () => {

    const {isLoggedIn, setIsLoggedIn} = useContext(stateContext);
    const [{profile, page_reload, cart_incomplete}, dispatch] = useGlobalState();
    let [open, setOpen] = useState(false);
    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("/");

    let quantity = 0;

    for (let i = 0; i < cart_incomplete?.cartproduct?.length; i++) {
        quantity = quantity + (cart_incomplete?.cartproduct[i]?.quantity);
    }

    const logout = () => {
        console.log("Logout")
        window.localStorage.clear()
        dispatch({
            type: "ADD_PROFILE",
            profile: null
        })
        setIsLoggedIn(false);
        window.location.href = '/'
    }

    return (
        <div className='shadow-md w-full fixed top-0 left-0 z-10'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-5 px-7'>
                <Link to="/">
                    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
        <ion-icon name="logo-ionic"></ion-icon>
        </span>
                        Food Mania
                    </div>
                </Link>

                <div onClick={() => setOpen(!open)}
                     className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-violet-600'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>

                    <li className='parent-list'>
                        <Link to="/"
                              className={splitLocation[1] === "" ? 'now-link each-link' : 'each-link'}>HOME</Link>
                    </li>

                    {
                        profile !== null ?
                            <>
                                <li className='parent-list'>
                                    <Link to="/profile"
                                          className={splitLocation[1] === "profile" ? 'now-link each-link' : 'each-link'}>PROFILE</Link>
                                </li>

                                <li className='parent-list'>
                                    <Link to="/cart"
                                          className={splitLocation[1] === "cart" || splitLocation[1] === "order" ? 'now-link each-link' : 'each-link'}>
                                        <div className="indicator">
                                            <span
                                                className="indicator-item badge badge-success font-bold">{quantity}</span>
                                            <BsCart4 className="text-2xl"/>

                                        </div>
                                    </Link>
                                </li>
                                <li className='parent-list'>
                                    <Link to="/order_history"
                                          className={splitLocation[1] === "order_history" ? 'now-link each-link' : 'each-link'}>HISTORY</Link>
                                </li>
                                <li className='parent-list'>
                                    <Link to=""
                                          className={splitLocation[1] === "feeddbacks" ? 'now-link each-link' : 'each-link'}>FEEDBACKS</Link>
                                </li>

                                <Link onClick={logout}
                                      className="bg-red-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-red-400 duration-500"
                                      to="#">
                                    Logout
                                </Link>

                            </>
                            :
                            <>
                                <li className='parent-list'>
                                    <Link to="/login"
                                          className={splitLocation[1] === "login" ? 'now-link each-link' : 'each-link'}>LOGIN</Link>
                                </li>
                                <li className='parent-list'>
                                    <Link to="/register"
                                          className={splitLocation[1] === "register" ? 'now-link each-link' : 'each-link'}>REGISTER</Link>
                                </li>
                            </>
                    }


                </ul>
            </div>
        </div>
    );
};

export default Navbar;
