import React from 'react'
import { Link } from 'react-router-dom';

function Signin() {
    const [formData, setFormData] = React.useState({});

    const handleSubmit = () => {
        console.log(formData);
        try {
            fetch(`http://localhost:8080/api/auth/${formData.auth}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    alert(data.message);
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h1 className='text-center text-5xl'>SIGN IN</h1>
            <div className='flex flex-col space-y-4'>
                <div className='flex justify-center items-center gap-4 mt-10'>
                    <div>
                        <input type="radio" name='auth' value={'school'} onClick={() => {
                            setFormData({ ...formData, auth: 'school' });
                        }} />
                        <label htmlFor="auth" className='ml-2'>School Login</label>
                    </div>
                    <div>
                        <input type="radio" name='auth' value={'student'} onClick={() => {
                            setFormData({ ...formData, auth: 'student' });
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

                        <button type='submit' className='border-2 w-[10vw] hover:scale-110 transition-all duration-300' onClick={() => {
                            if (formData.auth) {
                                handleSubmit();
                            }
                            else {
                                alert("Select an option")
                            }
                        }}>Sign In</button>
                        <Link to={'/reset-password'} className='text-blue-600'>Forgot Password?</Link>
                    </form>

                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
