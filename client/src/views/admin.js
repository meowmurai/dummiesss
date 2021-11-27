import { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import CreateSection from './sections/createSection'
import {CourseContext} from '../contexts/courseContext'
import {AuthContext} from '../contexts/AuthContext'
import MyInput from '../Components/myInput.js'

import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'

import {Grid,Box,Typography,Button,IconButton,Divider} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme=>({
	outerContainer:{
		background: theme.palette.primary.main
	},
	container: {
		padding: theme.spacing(10),
		display: 'flex',
		justifyContent: 'center'
	},
	table: {
		background: theme.palette.secondary.main,
		borderRadius: '15px',
		overflow: 'hidden',
	},
	video: {
		width: '100%',
		height: '100%'
	}
}))

export default function Admin(){
	const {courseState: {courses, courseLoading}, getCourses,removeCourse} = useContext(CourseContext)
	const {authState: {isAdmin}} = useContext(AuthContext)

	const [showForm, setShowForm] = useState(false)
	const classes = useStyles()
	
	
	if(!isAdmin) return <Typography variant='h3' color='danger'>Permission denied</Typography>
	if(courseLoading){
		getCourses()
		return <Typography variant='h3' color='danger'>Loading</Typography>
	}

	const removeHandle = async (e)=>{
		removeCourse({courseID: e.target.value}).then((res)=>{
			if(res)
				getCourses()
		})
	}

	return (
		<>
			<div className={classes.outerContainer}>
				<div className={classes.container}>
					<Grid container sm={12} md={10} lg={8} 
						className={classes.table}
						justifyContent='center' alignContent='center'>

						<Grid item container sm={12} sx={{m: 3,overflow: 'hidden'}}>
							<Grid item sm={5}>
								<Typography variant='h6'>Title</Typography>
							</Grid>
							<Grid item sm={4}>
								<Typography variant='h6' textAlign='center'>Create At</Typography>
							</Grid>
							<Grid iteam sm={3}>
								
							</Grid>
						</Grid>
						{courses.map((c)=>{
							return (
							<>
								<Grid item container sm={12} sx={{m:3, overflow: 'hidden'}}>
									<Grid item sm={5}>
										<Typography>{c.title}</Typography>
									</Grid>
									<Grid item sm={4}>
										<Typography variant='h6' textAlign='center'>{c.createAt}</Typography>
									</Grid>
									<Grid iteam container sm={3}>
										<Button sx={{mx: 'auto'}}color='purple'>Edit</Button>
										<Button sx={{mx: 'auto'}}color='purple' onClick={removeHandle} value={c._id}>remove</Button>
									</Grid>
								</Grid>
								<Divider light color='purple'/>
							</>
							)
						})}
						<Grid item container sm={12} sx={{m: 3, overflow: 'hidden'}}>
							<IconButton color='primary' onClick={()=>setShowForm(true)}>
								<AddCircleSharpIcon/>
							</IconButton>
						</Grid>
						
					</Grid>
				</div>
			</div>
			{showForm ? <CreateSection/>:<></>}
			
		</>
	)
}


