import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

import {UserContext} from '../contexts/userContext'
import {AuthContext} from '../contexts/AuthContext'
//import component
import {AppBar, Toolbar, Typography, ButtonGroup, Button, Grid, Box, IconButton, Avatar} from '@mui/material'
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined'


const useStyles = makeStyles(theme => ({
	container: {
		padding: 0
	},
	item:{
		spaceBetween: 2
	},
	grow: {
		flexGrow: 1
	},
	logo: {
		width: '4rem',
		height: '4rem',
		filter: 'invert(98%) sepia(22%) saturate(7493%) hue-rotate(315deg) brightness(106%) contrast(97%)',
		paddingRight: theme.spacing(1)
	},
	title: {
		color: theme.palette.secondary.darker,
		display: 'inline-bLock',
	}
}));
export default function Navbar (){
	const { authState: {isAuthenticated, user}} = useContext(AuthContext)
	const classes = useStyles()
	return (
		<AppBar	position='static' elevation={0}>
			<Grid sm={12} lg={12} className={classes.container}>
				<Toolbar>
					<Grid item sm={4} md={2} direction='row'>
						<IconButton component={Link} to='/' className={classes.container}>
							<img className={classes.logo} src='assets/images/logo.svg'/>
							<Typography variant='h5' className={classes.title}>ummies</Typography>
						</IconButton>
					</Grid>
					<Grid item container justifyContent='center' sm={4} md={8} rowSpacing={2} nowrap>
						<Button component={Link} to='/Home' color='secondary' variant='text'>Home</Button>
				        <Button component={Link} to='/explore' color='secondary' variant='text'>Explore</Button>
				        <Button component={Link} to='/about' color='secondary' variant='text'>About us</Button>
			      	</Grid>
			      	<Grid item container sm={4} md={2}  direction='row' spacing={2} justifyContent="flex-end">
			      		{isAuthenticated ? 
			      			<>
			      				<Button component={Link} to='/logout' color='secondary' disableElevation>Logout</Button>
				      			<Box sx={{display: 'flex', borderRadius: '12px', overflow: 'hidden'}}>
					      			<Avatar
					      				sx={{height: '100%'}}
									  	alt={user.firstname}
									  	src={user.avt}
										variant='square'
									/>
									<Button component={Link} to='/profile' sx={{borderRadius: '0'}} variant='contained' color='yellow' disableElevation>
										<Typography variant='h6' color='yellow'>
											{user.username}
										</Typography>
									</Button>

				      			</Box>
				      			
				      		</>
			      			:
			      			<>

			      				<Button component={Link} to='/login' variant='text'color='secondary'>Login</Button>
								<Button component={Link} to='/register' variant='contained'color='secondary' disableElevation>Register</Button>
			      			</>
			      		}
						
					</Grid>
				</Toolbar>
			</Grid>
		</AppBar>
	)
}
