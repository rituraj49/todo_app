import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Welcome from './Welcome'
import Error from './Error'
import ListTodos from './ListTodos'
import Header from './Header'
import Footer from './Footer'
import AuthProvider from './auth/AuthContext'
import Logout from './Logout'
import AuthenticatedRoute from './auth/AuthenticatedRoute'
import TodoComponent from './TodoComponent'

function TodoApp() {

    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<Login />} />

                        <Route path='/logout' element={<AuthenticatedRoute>
                            <Logout />
                        </AuthenticatedRoute>} />

                        <Route path='/welcome/:username' element={<AuthenticatedRoute>
                            <Welcome />
                        </AuthenticatedRoute>} />

                        <Route path='/todos' element={<AuthenticatedRoute>
                            <ListTodos />
                        </AuthenticatedRoute>} >
                        </Route>
                            <Route path='/todo/:id' element={
                                <AuthenticatedRoute>
                                    <TodoComponent /> 
                                </AuthenticatedRoute> } />

                        <Route path='*' element={<Error />} />
                    </Routes>
                    {/* <Footer/> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

export default TodoApp