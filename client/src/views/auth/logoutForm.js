import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
export default function LogoutForm(){
	const { logoutUser } = useContext(AuthContext);

	logoutUser();
	return <Navigate to='/login'/>
}