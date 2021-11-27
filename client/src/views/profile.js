import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import {UserContext} from '../contexts/userContext'
import {AuthContext} from '../contexts/AuthContext'

import {Typography} from '@mui/material'

import InfoSection from './sections/InfoSection'
import UserCoursesSection from './sections/UserCoursesSection'

export default function Profile(){
	const {userState: {userLoading, userProfile,courses}, getUser, getUserCourse} = useContext(UserContext)

	if(userLoading){
		getUser()
		getUserCourse()
		return <Typography variant='h3'>Loading</Typography>
	}
	
	return (
		<>
			<InfoSection/>
			<UserCoursesSection/>
		</>
	)
}