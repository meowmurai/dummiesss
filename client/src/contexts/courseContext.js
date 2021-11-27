import { createContext, useReducer, useEffect, useContext} from 'react'
import { courseReducer } from  '../reducers/courseReducer'
import {apiUrl,Url} from './constants'
import Cookies from 'universal-cookie'
import axios from 'axios'

export const CourseContext = createContext()

const CourseContextProvider = ({children}) =>{

	const [courseState, dispatch] = useReducer(courseReducer,{
		courseLoading: true,
		courses: []
	});
	const cookies = new Cookies();

	const getCourses = async () =>{
		try{
			const response = await axios.get(`${Url}/courses`);
			if(response.data.success){
				dispatch({
					type: 'COURSES_LOADED_SUCCESS',
					payload: response.data.courses 
				})
			}
		}catch(error){
			console.log('error', error);
			dispatch({type: 'COURSES_LOADED_FAIL', payload: null})
		}
	}
	const createCourses = async (form) =>{
		try{
			const response = await axios.post(`${Url}/courses/create`, form);
			if(response.data.success){
				cookies.set('course', response.data.coursecookie, { path: '/' });
				return true
			}
		}catch(error){
			console.log('error', error);
			return false
		}
	}
	const createLesson = async (title) =>{
		try{
			const response = await axios.post(`${Url}/lessons`, {title: title});
			if(response.data.success){
				return true
			}
		}catch(error){
			console.log('error', error);
			return false
		}
	}
	const removeCourse = async (courseID) =>{
		try{
			const response = await axios.post(`${Url}/courses/delete`, courseID);
			if(response.data.success){
				return true
			}
		}catch(error){
			console.log('error', error);
			return false
		}
	}
	
	//context data
	const courseContextData={courseState, getCourses, createCourses,createLesson,removeCourse}

	return (
		<CourseContext.Provider value={courseContextData}>
			{children}
		</CourseContext.Provider>

	)
}


export default CourseContextProvider