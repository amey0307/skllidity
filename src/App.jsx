import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import ResetPassword from './components/ResetPassword';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
