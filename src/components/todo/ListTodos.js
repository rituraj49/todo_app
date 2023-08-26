import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { deleteTodo, retrieveTodos, searchTodo } from './apiService/ApiService';
import { useAuth } from './auth/AuthContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

function ListTodos() {
    const[actions, setActions] = useState(true);
    const[todos, setTodos] = useState([]);
    const [deleted, setDeleted] = useState('')
    const[search, setSearch] = useState('');
    const {id} = useParams();

    const authContext = useAuth();
    const navigate = useNavigate();
   
    function handleActions(){
        actions?setActions(false):setActions(true)
    }

    const username = authContext.username;

    useEffect(()=>{
        getData();
    },[]);
    
    async function getData(){
        let result = await retrieveTodos(username);
        const items = await result.data;
        setTodos(items);
        console.log(todos);
    }
    
    async function handleDeleteById(id){
        await deleteTodo(username, id);
        await getData();
        console.log("delete ",id);
        setDeleted(`To with id: ${id} deleted successfully`);
    }

    function handleUpdate(id){
        console.log("update ",id)
        navigate(`/todo/${id}`)
    }

    function addTodo(e){
        e.preventDefault();
        navigate("/todo/-1")
    }

    function handleSearch(e){
        // searchTodo(username, desc)
        setSearch(e.target.value)

    }

    console.log(search);


    return (
        <div className='container-fluid m-4 flex justify-center items-center'>
            <div className="relative overflow-x-auto shadow-lg p-4 w-full sm:rounded-lg ">
                {
                    deleted
                    && <div
                    className ='bg-red-400 pl-2 h-8 border-b-2 border-red-800 shadow-lg mb-3 flex items-center
                    text-xs uppercase text-gray-800 rounded-full '
                    >{deleted}</div>
              }
                <div className="flex items-center justify-between pb-4 p-4 bg-white dark:bg-gray-900">
                    <div>
                        <button 
                        onClick={handleActions}
                        id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Action button</span>
                            Action
                            {
                                actions ?
                                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                            : <svg className='w-2.5 h-2.5 ml-2.5' 
                            aria-hidden="true"
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 14L12 10L8 14" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            
                            } 
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        
                        <div id="dropdownAction" className={actions ? "z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600" : "z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"}>
                       
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" >
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={addTodo}>Add new todo</a>
                                </li>
                                
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all todos</a>
                            </div>
                        </div>
                    </div>
                    <label for="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for todos" onChange={handleSearch}/>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-4 table-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input type="checkbox" className="checkbox" onClick={()=>console.log("checkbox clicked")}/>
                                    <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Serial
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Is Done?
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Target Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           todos && todos.map((item, i) => {
                                const { id, username, description, done, targetDate } = item;
                                return (
                                    <>
                                        <tr key={i} 
                                        className="bg-white border-b dark:bg-gray-800 text-base dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input type="checkbox" className="checkbox" />
                                                    <label className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td  className=" items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold">{id}</div>
                                                    {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                                                </div>
                                            </td>

                                            <td className=" items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="pl-3">
                                                    <div classzName="text-base font-semibold">
                                                        {i+1}
                                                        </div>
                                                    {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                {username}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {/* <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>  */}
                                                    {description}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                {done.toString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {targetDate}
                                            </td>
                                            <td className="px-6 py-4 bg-black flex flex-row items-center">
                                                <div className='pe-2 
                                                hover:animate-pulse'>
                                                <button 
                                                onClick={()=>handleDeleteById(id)}
                                                className='bg-red-600 
                                                border-2
                                                border-x-emerald-600 
                                                border-y-sky-600
                                                px-2 py-2 pe-2 rounded-lg uppercase
                                                hover:bg-red-700
                                                shadow-md shadow-red-400 
                                                text-sky-500
                                                transform 
                                                hover:scale-110
                                                transition hover:ease-in-out duration-500
                                                hover:text-base hover:text-slate-300'>
                                                    <div className='hover:animate-bounce'>Delete</div>
                                                    </button>
                                                </div>
                                                <div className=' 
                                                hover:animate-pulse'>
                                                <button 
                                                onClick={()=>handleUpdate(id)}
                                                className='bg-green-600
                                                border-2
                                                border-x-orange-600 
                                                border-y-red-500 uppercase
                                                px-4 py-2 rounded-lg hover:bg-teal-700
                                                shadow-md shadow-green-400 
                                                text-fuchsia-800
                                                transform 
                                                hover:scale-110
                                                transition hover:ease-in-out duration-500
                                                hover:text-base hover:text-slate-300'><div className='hover:animate-bounce'>Update</div></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodos