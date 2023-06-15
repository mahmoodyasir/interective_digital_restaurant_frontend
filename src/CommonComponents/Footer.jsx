import React from 'react';
import logo from '../assets/food.png'

const Footer = () => {
    return (
        <div className="mt-8">
            <footer className="footer p-10 bg-neutral text-neutral-content">
                <div>
                    <img src={logo} alt=""/>
                    <p><span className="text-2xl">Food Mania</span><br/>Providing Best and Fresh Foods on Your Doors.</p>
                    <p>Copyright © 2023 - All right reserved by FOOD MANIA</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
