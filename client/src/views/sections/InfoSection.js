import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'

import {UserContext} from '../../contexts/userContext'
import {AuthContext} from '../../contexts/AuthContext'

import {Grid,Typography,Box,Button,Avatar} from '@mui/material'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme=>({
	outerContainer:{
		background: theme.palette.primary.main
	},
	container: {
		padding: theme.spacing(10)
	},
	highlight: {
		color: theme.palette.secondary.darker
	},
	img:{
		width: "80%"
	},
}))
export default function InfoSection() {
	const {userState: {userProfile,courses}} = useContext(UserContext)

	const classes = useStyles()
	return (
	<>
		<div className={classes.outerContainer}>
			<div className={classes.container}>
				<Grid container sm={12} columnSpacing={{xs: 0, lg: 4}}>
					<Grid item container flexDirection='column' sm={12} md={3}>
						<Avatar
		      				sx={{mx: 'auto',mb: '8px', height: '150px', width: '150px', borderRadius: '8px'}}
						  	alt={userProfile.firstname}
						  	src={userProfile.avt}
							variant='square'
						/>
						<Typography sx={{display: 'inline-block'}} textAlign='center' variant='h5' color='secondary.darker' fontWeight='bold' >
							{userProfile.firstname} {userProfile.lastname}
						</Typography>
						<Typography 
							textAlign='center'
							variant='p' color='secondary'
							gutterBottom>
							Computer science student
						</Typography>
					</Grid>
					<Grid item xs={0} md={1}/>
					<Grid item xs={12} sm={6} md={4} textAlign='center'>
						<Typography variant='h6' color='secondary.darker' fontWeight='bold' >Your courses</Typography>
						<Typography 
							sx={{fontSize: '4rem'}} 
							variant='h4' color='secondary' 
							fontWeight='bold' 
							gutterBottom>
							{Object.keys(courses).length}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4} textAlign='center'>
						<Typography variant='h6' color='secondary.darker' fontWeight='bold'>Completed Tasks</Typography>
						<Typography 
							sx={{fontSize: '4rem'}} 
							variant='h4' color='secondary' 
							fontWeight='bold' 
							gutterBottom>
							0
						</Typography>
					</Grid>
				</Grid>
			</div>
		</div>
		<div >
			<div className={classes.container}>
				<Grid container xs={12} justifyContent='center'>
					<Grid item xs={12} sm={10} md={8}>
						<Typography variant='h4' fontWeight='bold' gutterBottom textAlign='center'>About me</Typography>
						<Typography variant='p' paragraph>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

							It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
						</Typography>
					</Grid>
				</Grid>
			</div>
		</div>
	</>
	)
}