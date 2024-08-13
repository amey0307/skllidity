import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import ResetPassword from './components/ResetPassword';
import NewPassword from './components/NewPassword';
import AdminPannel from './components/AdminPannel';
import OnlyAdminPrivate from './components/OnlyAdminPrivate';
import StudentPannel from './components/StudentPannel';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/reset-password/' element={<ResetPassword />} />
          <Route path='/new-password/:id' element={<NewPassword />} />
          <Route element={<OnlyAdminPrivate />}>
            <Route path='/admin-pannel' element={<AdminPannel />} />
          </Route>
          <Route path='/student-pannel' element={<StudentPannel />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
