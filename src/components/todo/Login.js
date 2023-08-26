import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

function Login() {
    const[warning, setWarning] = useState("");
    const[warning2, setWarning2] = useState("");

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[errorMesage, setErrorMessage] = useState(false);

    const navigate = useNavigate();

    const authContext = useAuth();
    // const username = authContext.username;
    
    function handleInput(e){
        setWarning(e.target.value);
        setUsername(e.target.value)
    }

    function handleInputPassword(e){
        setWarning2(e.target.value);
        setPassword(e.target.value);
    }

    function handleLogin(e){
        e.preventDefault();
        if(authContext.login(username, password)){
            navigate(`/welcome/${username}`);
        } else{
            setErrorMessage(true);
        }
    }

    return (
        <div className='bg-gradient-to-br from-gray-700  to-sky-800 h-screen mb-0 p-16'>
        
        <div className="grid-cols-3 relative flex justify-between items-center">
            <div className="col-span-1" />
            <div className="col-span-1">

                <form className="w-full max-w-lg  bg-gradient-to-tl from-gray-800 to-sky-700 mt-24 mb-0 m-4 p-12 pb- rounded-lg shadow-lg shadow-black">
                {
                    errorMesage && 
                        <div className='text-center pb-4 text-red-400'>Authentication failed</div>
                }
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full  px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-fuchsia-400 text-center text-xs font-bold mb-2" for="grid-first-name">
                                Username
                            </label>
                            <input className="appearance-none block w-full bg-transparent text-gray-500  border-sky-600 border-b-2 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none {/*focus:bg-gray-600*/}
                            focus:border-sky-300" 
                            name="username" value={username}
                            onChange={handleInput}
                            type="text" placeholder="Enter your username" />
                            
                            {
                                warning.length===0 && 
                                <p className="text-sky-500 text-xs italic">Please fill out this field.</p>
                                
                            } 
                        </div>
                        
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-fuchsia-400 text-xs text-center font-bold mb-2" for="grid-password">
                                Password
                            </label>
                            <input 
                            className="appearance-none block w-full bg-transparent text-gray-500  border-sky-600 border-b-2 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none {/*focus:bg-gray-600*/} focus:border-sky-300" 
                            onChange={handleInputPassword}
                            name="password" value={password}
                            type="password" placeholder="Enter your password" />
                            {
                                warning2.length===0 &&
                            <p className="text-sky-500 text-xs italic">Please Enter your password</p>
                            }
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className=''>
                            <label className='ml-2 text-sky-500'>
                                <input type="checkbox" className='mr-2 '/>
                            Remember me</label>
                        </div>
                        <button 
                        onClick={handleLogin}
                        className='btn-red-800 bg-gray-700 focus:bg-gray-800
                         hover:bg-gray-800
                         p-2 px-4 rounded-lg justify-center text-sky-500
                        transform hover:scale-125
                        transition ease-in
                        shadow-inner
                        shadow-sky-500
                        '>Login</button>
                    </div>

                </form>
            </div>
            <div className="col-span-1"></div>
        </div>
        </div>
    )
}

export default Login