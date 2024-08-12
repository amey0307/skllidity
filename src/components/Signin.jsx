import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUserData } from '../redux/user/userSlice.js';
import { data } from 'autoprefixer';

function Signin() {
    const [formData, setFormData] = React.useState({});
    const navigate = useNavigate();
    const { currentUserData } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        try {
            const res = await fetch(`http://localhost:8080/api/auth/${formData.auth}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setCurrentUserData(data));
                console.log(data.message);
            }
            else {
                alert(data.message);
            }
        } catch (e) {
            alert('Error : ' + data.message);
        }
    };

    useEffect(() => {
        if (currentUserData) {
            if (currentUserData.role === 'admin') {
                navigate('/admin-pannel');
            } else {
                navigate('/student-pannel');
            }
        }
    }, [currentUserData]);

    return (
        <div>
            <h1 className='text-center text-5xl'>SIGN IN</h1>
            <div className='flex flex-col space-y-4'>
                <div className='flex justify-center items-center gap-4 mt-10'>
                    <div>
                        <input type="radio" name='auth' value={'school'} onClick={() => {
                            setFormData({ ...formData, auth: 'school', role: 'admin' });
                        }} />
                        <label htmlFor="auth" className='ml-2'>School Login</label>
                    </div>
                    <div>
                        <input type="radio" name='auth' value={'student'} onClick={() => {
                            setFormData({ ...formData, auth: 'student', role: 'student' });
                        }} />
                        <label htmlFor="auth" className='ml-2'>Student Login</label>
                    </div>
                </div>

                <div>
                    <form action="#" className='flex gap-10 flex-col w-full items-center justify-center'>
                        <input type="email" className='border-2 w-[20vw]' onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                        }} />
                        <input type="password" className='border-2 w-[20vw]' onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value })
                        }} />

                        <button type='button' className='border-2 w-[10vw] hover:scale-110 transition-all duration-300' onClick={() => {
                            if (formData.auth) {
                                handleSubmit();
                            }
                            else {
                                alert("Select an option")
                            }
                        }}>Sign In</button>
                        <Link to={'/reset-password'} className='text-blue-600'>Forgot Password?</Link>
                    </form>

                    <div className='flex flex-col justify-center items-center mt-10'>
                        <h1 className='text-3xl'>School Login</h1>
                        <h2>email : admin@vit.ac.in</h2>
                        <h2>password : admin</h2>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signin
