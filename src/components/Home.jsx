import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Home() {
    const { currentUserData } = useSelector(state => state.user);
    return (
        <div className='flex justify-center flex-col items-center text-5xl gap-10'>
            {currentUserData ? <h1>Welcome {currentUserData.name}</h1> : <h1>Welcome Guest</h1>}
            <h1>Go to Sign in</h1>
            <Link to={'/sign-in'}>
                <button className='border-2 text-center p-4 bg-green-400'>Sign In</button>
            </Link>
        </div>
    )
}

export default Home
