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
    const [loading, setLoading] = React.useState(false);

    //sign in request to the server
    const handleSubmit = async (e) => {
        setLoading(true);
        try {
            const res = await fetch(`https://skllidity-vercel-api.vercel.app/api/auth/${formData.auth}/signin`, {
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
                setLoading(false);
            }
            else {
                alert(data.message);
                setLoading(false);
            }
        } catch (e) {
            alert('Error : ' + data.message);
            setLoading(false);
        }
    };

    //redirect to the respective pannel
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
                        }} disabled={loading}>{loading ? 'Loading' : 'Sign In'}</button>
                        <Link to={'/reset-password'} className='text-blue-600'>Forgot Password?</Link>
                        <span className='text-red-600 text-center'>NOTE : Not working in PRODUCTION because user data not saved in browser <br /><span className='text-green-600 text-center'>But working in localhost</span></span>
                    </form>

                    <div className='flex flex-col justify-center items-center mt-10'>
                        <div className='border-dashed border-2 w-fit p-4'>
                            <h1 className='text-3xl'>School Login</h1>
                            <h2>email : admin@vit.ac.in</h2>
                            <h2>password : <span className='blur-sm hover:blur-0 transition-all duration-200 cursor-pointer'>admin</span></h2>
                            <h3>{' [ hover to show ]'}</h3>
                        </div>
                    </div>

                    <hr className='mt-4 border-[1.5px] border-dashed mx-40' />

                    <div className='p-10 font-mono flex justify-between items-start gap-10 px-[10vw]'>
                        <div>
                            <h1 className='font-bold'>{' > What does this backend project cover?'} </h1>
                            <ul className='px-5' >
                                <li><h2> œ User Authentication</h2></li>
                                <li><h2> œ Email Service</h2></li>
                                <li><h2> œ Admin Pannel</h2></li>
                                <li><h2> œ Student Pannel</h2></li>
                                <li><h2> œ Reset Password</h2></li>
                                <li><h2> œ Change Password</h2></li>
                                <li><h2> œ Add New Student</h2></li>
                                <li><h2> œ Delete Student</h2></li>
                                <li><h2> œ Send Email</h2></li>
                            </ul>
                        </div>

                        <div>
                            <div>
                                <h1 className='font-bold'>{' > What Does Admin Can Do?'} </h1>
                                <ul className='px-5' >
                                    <li><h2> œ You can add student by loggin in <span className='text-red-600'>"ADMIN PANNEL"</span> using credientials provided above.</h2></li>
                                    <li><h2> œ A <span className='text-red-600'>"Welcome Email"</span> wil be send to the respective student email address.</h2></li>
                                    <li><h2> œ Admin can email <span className='text-red-600'>"Login Credientials"</span> by clicking <span className='text-green-600'>"Send Credientials"</span> button with <br /><span className='font-semibold text-yellow-600'>RANDOM PASSWORD</span>.</h2></li>
                                    <li><h2> œ Admin can remove student from school by <span className='text-red-600'>"Delete"</span> button.</h2></li>
                                </ul>
                            </div>

                            <div>
                                <h1 className='font-bold mt-4'>{' > What Does A Student Can Do?'} </h1>
                                <ul className='px-5' >
                                    <li><h2> œ A student can access their own <span className='text-red-600'>dashboard</span> and view their profile information.</h2></li>
                                    <li><h2> œ They can <span className='text-red-600'>reset their password</span>.</h2></li>
                                    <li><h2> œ They can view their profile information.</h2></li>
                                </ul>
                            </div>

                            <div>
                                <h1 className='font-bold mt-4'>{' > Task Compeleted'} </h1>
                                <ul className='px-5' >
                                    <li><h2> œ Student will recieve credientials through mail with a <span className='font-semibold text-yellow-600'>RANDOM PASSWORD</span> generated.</h2></li>
                                    <li><h2> œ Student will recieve mail with instruction on his <span className='text-red-600'>"First Login"</span></h2></li>
                                    <li><h2> œ Student can <span className='text-red-600'>reset their password</span>.</h2></li>
                                    <li><h2> œ "User" as well as "Admin" will be logged out if refresh page (cookie not used for data storage in browser).</h2></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signin
