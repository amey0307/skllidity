import React from 'react'

function ResetPassword() {
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/auth/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            }).then(alert('Email sent'))
            setLoading(false);
        } catch (e) {
            console.log(e)
            alert('Error')
            setLoading(false);
        }
    }
    return (
        <div>
            <form action="#" className='flex justify-center items-center h-[100vh] flex-col gap-10'>
                <input type="email" placeholder='Enter your email' className='border-2 w-[20vw]' onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <button type='submit' className='border-2 w-fit p-4 hover:scale-110 hover:bg-slate-300 transition-all duration-300' onClick={handleSubmit} disabled={loading}>Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPassword

