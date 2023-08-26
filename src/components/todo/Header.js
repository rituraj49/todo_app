import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

function Header() {
    const[menu, setMenu] = useState(true);

    const authContext = useAuth();

    const isAuthenticated = authContext.isAuthenticated

    // console.log(authContext);

    function handleMenu () {
        console.log("clicked");
        menu?setMenu(false):setMenu(true);
    }

    function handleLogout(){
        authContext.logout();
    }

    return (
        <div>
            <nav className= " border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="#" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </Link>
                    {
                     
                    <button
                    onClick={handleMenu} data-collapse-toggle="navbar-hamburger" type="button" className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    
                    }
                    
                    <div className={ menu? "md:block w-full" : "hidden md:block w-full" }>
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <li>
                                {
                                    isAuthenticated &&
                                <Link to="/welcome/user" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded dark:bg-blue-600">Home</Link>
                                }
                            </li>
                            <li>
                                {isAuthenticated && 
                                <Link to="/todos" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Todos</Link>
                                }
                            </li>
                            <li>
                                {
                                    !isAuthenticated &&
                                <Link to="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Login</Link>
                                }
                            </li>
                            <li>
                                {
                                    isAuthenticated &&
                                <Link 
                                onClick={handleLogout}
                                to="/logout" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Logout</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header