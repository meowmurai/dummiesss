import {useContext, useEffect } from 'react'
import { Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import {Typography} from '@mui/material'

export default function ProtectedRoute({children}){
	const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);
	//authenticated check
	if(authLoading){
		return (
			<Typography color='danger'>loading</Typography>
		)
	}
	return(
		isAuthenticated ? children : <Navigate to='/login'/>
	);
}