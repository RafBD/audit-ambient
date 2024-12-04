import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/img/logoGV.png'

const NavBar = () => {

    return (
        <nav className="bg-[#42855b] relative w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <div className="flex items-center justify-center gap-2">
                    <img src={logo} alt="Logo" className="w-10 h-10" />
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Green Vision
                    </a>
                </div>
                
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link to="/dashboard" className="text-white bg-[#42855b] border-2 border-[#336245] hover:bg-[#336245] transition-all ease-in-out focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center">
                        Lanzar Aplicación
                    </Link>

                </div>
                <div
                    className={`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-300 ease-in-out md:opacity-100 md:max-h-full`}
                    id="navbar-sticky"
                >
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
