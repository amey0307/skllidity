import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function OnlyAdminPrivate() {
    const navigate = useNavigate();
    const { currentUserData } = useSelector(state => state.user);
    return currentUserData?.role === 'admin' ? <Outlet /> : (navigate('/'));
}

export default OnlyAdminPrivate
