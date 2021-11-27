import { createContext, useReducer, useEffect, useContext} from 'react';
import { userReducer } from  '../reducers/userReducer';
import {apiUrl,Url} from './constants';
import axios from 'axios';

import {AuthContext} from './AuthContext'

export const UserContext = createContext();

const UserContextProvider = ({children}) =>{

	const [userState, dispatch] = useReducer(userReducer,{
		userLoading: true,
		userProfile: null,
		courses: []
	});
	const {authState: {user}} = useContext(AuthContext)
	const enrollCourse = async (courseID)=>{
		try{
			const response = await axios.post(`${Url}/u/enroll-course`,courseID)
			if(response.data.success){
				getUserCourse()
				return true
			}
		}catch(error){
			console.log('enroll failed: ', error);
			return false
		}

	}
	const getUser = async () =>{
		try{
			const response = await axios.get(`${Url}/u/my-profile`);
			if(response.data.success){
				dispatch({
					type: 'USER_PROFILE_LOADED_SUCCESS',
					payload: {userProfile: response.data.user}
				})
			}
		}catch(error){
			console.log('error', error);
			dispatch({
					type: 'USER_PROFILE_LOADED_FAIL'
				})
		}
	}
	const getUserCourse = async ()=>{
		try{
			const response = await axios.get(`${Url}/u/my-courses`);
			if(response.data.success){
				dispatch({
					type: 'USER_COURSES_LOADED_SUCCESS',
					payload: {courses: response.data.courses}
				})
			}
		}catch(error){
			console.log('error', error)
			dispatch({
					type: 'USER_COURSES_LOADED_FAIL'
			})
		}
	}
	const getLessonURL = async (lessonID)=>{
		try{
			const response = await axios.get(`${Url}/lessons/getURL`, {params: {lessonID: lessonID}});
			if(response.data.success){
				return response.data
			}
		}catch(error){
			console.log('error', error)
			return 
		}
	}
	const getCourseDetail = async (courseID) =>{
		try{
			const response = await axios.get(`${Url}/u/details`,{params: {courseID: courseID}});
			if(response.data.success){
				return response.data

			}
		}catch(error){
			console.log('error', error)
			return {success: false, course: null}
		}
	}

	//context data
	const userContextData={userState, getUser, getUserCourse,getCourseDetail,getLessonURL, enrollCourse};

	return (
		<UserContext.Provider value={userContextData}>
			{children}
		</UserContext.Provider>

	)
}


export default UserContextProvider;