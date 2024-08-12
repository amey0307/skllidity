import React from 'react'
import { useSelector } from 'react-redux'

function StudentPannel() {
    const { currentUserData } = useSelector(state => state.user);
    return (
        <div>
            {currentUserData ? <h1>Welcome {currentUserData.name}</h1> : <h1>Welcome Guest</h1>}
        </div>
    )
}

export default StudentPannel
