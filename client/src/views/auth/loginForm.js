import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid,Typography,Button, TextField, Box} from '@mui/material'
import {LoadingButton } from '@mui/lab'
import { styled, alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

import {AuthContext} from '../../contexts/AuthContext'

export default function LoginForm(){
	//state
	const [loading,setLoading] = useState(false)
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	});
	const [alert,setAlert] = useState(null);
	//context
	const {loginUser} = useContext(AuthContext);
	//---------------
	const handleChange = e => setLoginForm({...loginForm, [e.target.name]:e.target.value});

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try{
			const loginData = await loginUser(loginForm)
			setLoading(false)
			if(loginData.success){
			}
			else{
				setAlert({type:'danger', message: loginData.message});
				setTimeout(()=>setAlert(null),5000);
			}
		} catch(error){
			console.log(error);
		}
	}

	return (
		<>
			<form sx={{width: '100%',height: '100%',display: 'flex'}} >
				<div sx={{m: 'auto'}}>
					<br/>
					<Grid container sm={12} justifyContent='center' rowSpacing={3}>
						<Grid item sm={12}>
							<Typography sx={{fontWeight: 'bold'}} color='primary' textAlign='center' variant='h4' gutterBottom>Be notified of new courses</Typography>
						</Grid>
						<Grid item container sm={12} md={8} justifyContent='center'>
							<MyInput name='username' onChange={handleChange} fullWidth label='username'/>
							<MyInput name='password' onChange={handleChange} fullWidth label='password'/>
						</Grid>
						<Grid item container justifyContent='center'>
							<LoadingButton
								sx={{py: '0.75rem', px: '2rem'}}
								loading={loading} 
								onClick={handleSubmit} 
								variant='contained'>
								Login
							</LoadingButton >
						</Grid>
					</Grid>
				</div>
				<br/>
			</form>
		</>
	)
}
function MyInput({label,...props}) {
	return (
		<StyledTextField
	        label={label}
	        defaultValue=""
	        id="reddit-input"
	        variant="filled"
	        style={{ marginTop: 4}}
	        {...props}
	    />
	)
}
const StyledTextField = styled((props) => (
	  <TextField InputProps={{ disableUnderline: true }} {...props} />
	))(({ theme }) => ({
	  '& .MuiFilledInput-root': {
	    border: '1px solid #e2e2e1',
	    overflow: 'hidden',
	    borderRadius: 4,
	    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
	    transition: theme.transitions.create([
	      'border-color',
	      'background-color',
	      'box-shadow',
	    ]),
	    '&:hover': {
	      backgroundColor: 'transparent',
	    },
	    '&.Mui-focused': {
	      backgroundColor: 'transparent',
	      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
	      borderColor: theme.palette.primary.main,
	    },
	  },
}));
