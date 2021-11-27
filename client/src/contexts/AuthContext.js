import { createContext, useReducer, useEffect} from 'react';
import { authReducer } from  '../reducers/authReducer';
import {apiUrl,LOCAL_STORAGE_TOKEN_NAME} from './constants';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) =>{
	const [authState, dispatch] = useReducer(authReducer,{
		authLoading: true,
		isAuthenticated: false,
		isAdmin: false,
		user: null
	});
	const load = async () =>{
		if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
		}
		try{
			const response = await axios.get(`${apiUrl}/auth`);
			if(response.data.success){
				dispatch({
					type: 'SET_AUTH',
					payload: {isAuthenticated: true, user: response.data.user}
				})
			}
		}catch(error){
			console.log('from /auth ', authState.isAuthenticated)
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
			setAuthToken(null);
			dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, user: null}});
		}
		try{
			const response2 = await axios.get(`${apiUrl}/auth/admin`)
			if(response2.data.success){
				dispatch({
					type: 'SET_ADMIN',
					payload: {isAdmin: true}
				})
			}
		}catch(error){
			console.log('from /admin ', authState.isAuthenticated)
			dispatch({
				type: 'SET_ADMIN',
				payload: {isAdmin: false}
			})
		}
	}

	useEffect(()=>load(),[]);

	const loginUser = async userForm =>{
		try{
			const response = await axios.post(`${apiUrl}/auth/login`,userForm);
			if(response.data.success){
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken);
				await load();
			}
			return response.data
		} catch(error){
			if(error.response.data) return error.response.data;
			else return {success: false, message: error.message};
		}
	}

	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, user: null,isAdmin: false}});
		setAuthToken(null);
	}

	const signupUser = async userForm =>{
		try{
			const response = await axios.post(`${apiUrl}/auth/register`,userForm);
			if(response.data.success){
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken);
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user}
				});
			}
			return response.data
		} catch(error){
			if(error.response.data) return error.response.data;
			else return {success: false, message: error.message};
		}
	}

	//context data
	const authContextData={loginUser,signupUser, logoutUser, authState};

	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>

	)
}


export default AuthContextProvider;