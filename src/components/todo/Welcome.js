import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Welcome() {
    // const params = useParams();
    const {username} = useParams();
    const[message, setMessage] = useState("");

    // async function callApi(){
    //     let result = await axios.get(`http://localhost:8080/users/${username}/todos`)
    //     // console.log(result.data);
    //     let todos = result.data
    //    await success(todos);
    // }

    // async function success(result){
    //     setMessage(result);
    //     console.log(message);
    // }

  return (
    <div className='bg-gradient-to-br from-gray-700 to-sky-800 flex flex-col justify-center items-center'>
        <div className='h-max bg-transparent text-2xl text-teal-400 mt-4'>
            {/* Welcome {params.username}  */}
            Welcome {username} 
        </div>
        <div className='h-max bg-transparent text-2xl text-teal-400 p-4'>
            Go to your <Link to="/todos" className='text-green-500 ml-0 hover:text-green-600'>todos</Link>
            {/* <button className='border-neutral-800 border-x-2 border-y-4 bg-green-700 rounded' onClick={callApi}>hello</button> */}
        </div>
        
    </div>
  )
}

export default Welcome