import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import ResetPassword from './components/ResetPassword';
import NewPassword from './components/NewPassword';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/reset-password/' element={<ResetPassword />} />
          <Route path='/new-password/:id' element={<NewPassword />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
