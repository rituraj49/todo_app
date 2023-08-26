import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from './auth/AuthContext';
import { createTodo, retrieveTodo, updateTodo } from './apiService/ApiService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment/moment';

function TodoComponent() {

  // const [todo, setTodo] = useState({
    // id:"",
    // description: "",
    // username:"",
    // targetDate:"",
    // done:""
  // });
  const [description, setDescription] = useState('');
  const[targetDate, setTargetDate] = useState('');
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  async function getData() {
    if(id != -1){
      let response = await retrieveTodo(username, id)
      let todoData = response.data;
      // console.log(todoData);
      // setTodo(todoData);
      setDescription(todoData.description);
      setTargetDate(todoData.targetDate);
      // console.log(res);
    }
  }
  useEffect(() => {
    getData();
  }, [id])
  // console.log(todo.targetDate);

  function handleDesc(e) {
    // setTodo(e.target.value)
  }

  function handleSubmit(values){
    // console.log(values);
    const todo = {
      id:id,
      username:username,
      description: values.description,
      targetDate: values.targetDate,
      done:false
    }

    console.log(todo);

    if(id === -1){
        // let res = await 
        createTodo(username, todo)
        .then((res)=>{

          // console.log(response);
          navigate("/todos")
        })
        .catch((error)=>{
          console.log(error);
        })
    } else {
      updateTodo(username, id, todo)
      .then((res)=>{
        navigate("/todos");
        console.log(res);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }

  function handleValidation(values){
    const errors = {
      // description:"Enter a valid description",
      // targetDate:"Enter a valid target date"
    }
    if(values.description.length < 5){
      errors.description = "* Enter atleast 5 characters"
    }
    
    if(values.targetDate === "" || values.targetDate == null || !moment(values.targetDate).isValid()){
      errors.targetDate = "* Enter a valid date"
    }
    // console.log(values);
    return errors
  }

  return (
    <div className=''>
        <h1 className='text-center text-3xl bg-emerald-500'>Enter Todo Details</h1>

        <Formik initialValues={{description, targetDate}}
          enableReinitialize = {true}
          onSubmit={handleSubmit}
          validate={handleValidation}
          validateOnChange = {false}
          validateOnBlur = {false}
        >
          {
            (props)=>{
              return(
                <>
                    <Form className=' bg-transparent p-20 '>
                    
        {/* <input type="text" value={todo.description}  onChange={handleDesc}/> */}
        {/* <input type="text" value={todo.username}  onChange={handleName}/> */}
        <div className="relative z-0 w-full mb-6 group mt-4  ">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-sky-500 duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
          <Field type="text" name="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer " placeholder=" " />
          <ErrorMessage 
            name='description'
            component="p"
            className='text-red-700 text-sm italic uppercase'
          />
          {/* <p className="text-sky-500 text-xs italic">Please fill out this field.</p> */}
        </div>
        <div className="relative z-0 w-full mb-6 group mt-4  ">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-sky-500 duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Target Date</label>
          <Field type="date" name="targetDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer " placeholder=" "  />
          <ErrorMessage 
            name='targetDate'
            component="p"
            className='text-red-700 text-sm italic uppercase'
          />
        </div>
        {/* <div className="relative z-0 w-full mb-6 group mt-4 flex justify-between">
          <div> 
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-sky-500 duration-300 ">Status</label>
          </div>
          <div className=' flex-row'>
            <div className='flex justify-between'>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-sky-500 duration-300 ">True</label>
              <input type="radio" name="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer " placeholder="" value={todo.done} onChange={handleDesc} />
            </div>
            
            <div className=''>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-sky-500 duration-300 ">False</label>
              <input type="radio" name="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer " placeholder="" value={todo.done} onChange={handleDesc} />
            </div>
          </div>
        </div> */}
        <div className='bg-transparent flex justify-center'>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Save</button>
        </div>
      </Form>
                </>
              )
            }
          }
      </Formik>
    </div>
  )
}

export default TodoComponent