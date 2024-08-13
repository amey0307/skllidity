import React from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NewPassword() {
    const { id } = useParams();
    const [password, setPassword] = React.useState('');
    const [rePassword, setRepassword] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            alert('Password does not match');
            return;
        }

        try {
            fetch(`https://skllidity-vercel-api.vercel.app/api/auth/resetpassword/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    navigate('/sign-in');
                    alert(data.message);
                })
        } catch (e) {
            alert('Something went wrong');
            console.log(e)
        }
    }

    return (
        <div>
            <form action="#" className='flex flex-col justify-center items-center h-[100vh] gap-4 w-full'>
                <input type="password" placeholder='Enter your new password' className='border-2 w-[20vw]' onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <input type="password" placeholder='Confirm your new password' className='border-2 w-[20vw]' onChange={(e) => {
                    setRepassword(e.target.value)
                }} />
                <button type='submit' className='border-2 w-fit p-4 hover:scale-110 hover:bg-slate-300 transition-all duration-300' onClick={handleSubmit}>Change Password</button>
            </form>
        </div>
    )
}

export default NewPassword
