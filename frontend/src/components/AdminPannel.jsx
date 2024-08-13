import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function AdminPannel() {
    const [students, setStudents] = React.useState([]);
    const [showModle, setShowModle] = React.useState(false);
    const [formData, setFormData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleMail = async (email) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/auth/greetMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json()
            alert("Email Sent")
            setLoading(false);
        } catch (e) {
            console.log(e)
            alert('Error')
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('http://localhost:8080/api/auth/school/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json()
            console.log(data)
            alert(data.message)
        } catch (e) {
            console.log(e)
        }

        //update the students list
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/getStudents');
                const data = await response.json()
                console.log(data)
                if (data) {
                    setStudents(data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchStudents();
    }

    const handleDelete = async (email) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/deleteStudent', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json()
            console.log(data)
            alert(data.message)
        } catch (e) {
            console.log(e)
        }

        //update the students list
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/getStudents');
                const data = await response.json()
                console.log(data)
                if (data) {
                    setStudents(data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchStudents();
    }

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/getStudents');
                const data = await response.json()
                console.log(data)
                if (data) {
                    setStudents(data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchStudents();
    }, [])
    return (
        <div>
            <h1 className='text-5xl text-center mt-4'><Link to={'/'}>ADMIN PANNEL</Link></h1>
            <button className='border-2 bg-violet-500 p-2' onClick={() => {
                navigate('/sign-in');
                window.location.reload();
            }}>Log Out</button>
            <table className="w-full text-left border-collapse shadow-md rounded-lg overflow-hidden mt-10">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-4 border-b-2 border-blue-700">Name</th>
                        <th className="p-4 border-b-2 border-blue-700">Email</th>
                        <th className="p-4 border-b-2 border-blue-700">Send Email</th>
                        <th className="p-4 border-b-2 border-blue-700">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id} className="even:bg-blue-50 odd:bg-white hover:bg-blue-100">
                            <td className="p-4 border-b border-gray-200">{student.name}</td>
                            <td className="p-4 border-b border-gray-200">{student.email}</td>
                            <td className="p-4 border-b border-gray-200"><button type='button' className='text-blue-500' onClick={() => {
                                handleMail(student.email)
                            }} disabled={loading}>{loading ? 'Sending...' : 'Send Email'}</button></td>
                            <td className="p-4 border-b border-gray-200 disabled:cursor-not-allowed"><button type='button' className='text-blue-500' onClick={() => {
                                handleDelete(student.email);
                            }}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button type='button' className='bg-blue-400 rounded-sm m-4 p-2' onClick={() => {
                if (!showModle) {
                    setShowModle(true)
                }
                else {
                    setShowModle(false)
                }
            }}>{showModle ? 'Cancel' : 'Add New +'}</button>

            {
                <div hidden={!showModle}>
                    <h1 className='text-3xl text-center mt-4'>Add New Student</h1>
                    <form action="#" className='flex justify-center items-center gap-10 mt-4'>
                        <input type="text" placeholder='Enter name' className='border-2 p-2' onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value })
                        }} />
                        <input type="email" placeholder='Enter email' className='border-2 p-2' onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                        }} />
                        <button type='submit' className='bg-blue-400 p-2' onClick={handleSubmit}>Add</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default AdminPannel
