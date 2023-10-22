import React from 'react'
import Regiter from './page/register/registerpage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './page/register/login/Login'
import Dashbord from './page/dashbord/Dashbord'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Regiter />}> </Route>
        <Route path='/' element={<Login />}> </Route>
        <Route path='/dashbord/:token' element={<Dashbord />}> </Route>
      </Routes>
    </BrowserRouter>



  )
}

export default App