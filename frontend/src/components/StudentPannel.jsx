import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

function StudentPannel() {
    const { currentUserData } = useSelector(state => state.user);
    const navigate = useNavigate();
    return (
        <div className='flex justify-center gap-10 items-center text-3xl flex-col'>
            {currentUserData ? <h1>Welcome {currentUserData.name}</h1> : <h1>Welcome Guest</h1>}
            <button className='border-2 bg-violet-500 p-2' onClick={() => {
                window.localStorage.removeItem('token');
                //reload the page
                navigate('/sign-in');
                window.location.reload();
            }}>Log Out</button>
        </div>
    )
}

export default StudentPannel
