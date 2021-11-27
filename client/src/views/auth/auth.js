import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import {AppBar,Tabs,Tab,Typography,Box} from '@mui/material'

import LoginForm from './loginForm';
import RegisterForm from './registerForm'
import LogoutForm from './logoutForm';

import { AuthContext } from '../../contexts/AuthContext.js'

export default function AuthRoutes ({route}){
	//context
	const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);

	const theme = useTheme();
 	const [value, setValue] = useState(0);

	//authenticated check
	if(route === 'logout') return <LogoutForm/>
	if(authLoading){
		return (
			<div className='container flex-center'>
				<Typography>Loading</Typography>
			</div>
		)
	} else if(isAuthenticated) return <Navigate to='/' />

	const handleChange = (event, newValue) => {
    	setValue(newValue);
  	};
  	const handleChangeIndex = (index) => {
   	 setValue(index);
  	};
  return (
  	<Box sx={{width: '100vw', height: '90vh', display: 'flex', justifyContent: 'center'}} >
	    <Box sx={{ border: 2,borderColor: 'primary.main', bgcolor: 'background.paper', width: 500, maxHeight: '90vh',m: 5}} boxShadow={2}>
			<AppBar position="static">
				<Tabs
				  value={value}
				  onChange={handleChange}
				  indicatorColor="secondary"
				  textColor="inherit"
				  variant="fullWidth"
				  aria-label="full width tabs example"
				>
				  <Tab label="Login" {...a11yProps(0)} />
				  <Tab label="Register" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
				>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<LoginForm/>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
				  	<RegisterForm/>
				</TabPanel>
			</SwipeableViews>
	    </Box>
    </Box>
  );
}
function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
		  role="tabpanel"
		  hidden={value !== index}
		  id={`full-width-tabpanel-${index}`}
		  aria-labelledby={`full-width-tab-${index}`}
		  {...other}
		>
		  {value === index && (
		    <Box>
		    	{children}
		    </Box>
		  )}
		</div>
	);
}