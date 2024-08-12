import React, { useEffect } from 'react'

function AdminPannel() {
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/getStudents');
                const data = await response.json()
                console.log(data)

            } catch (e) {
                console.log(e)
            }
        }
        fetchStudents();
    }, [])
    return (
        <div>

        </div>
    )
}

export default AdminPannel
