import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {Grid,Typography,Box,Button,Avatar,AvatarGroup,CardActions} from '@mui/material'
import {makeStyles} from '@mui/styles'

import StyledCard from '../../Components/card.js'

import { CourseContext } from '../../contexts/courseContext'
import { UserContext } from '../../contexts/userContext'

const useStyles = makeStyles(theme=>({
	outerContainer:{
	},
	container: {
		padding: theme.spacing(10)
	},
	root:{
		"&.MuiCard-root":{
			width: '300px'
		},
		"&.MuiCardMedia-root":{
			width: '100%',
			height: '200px',
		}
	},
}))
export default function CoursesSection() {
	const { courseState: {courseLoading, courses}, getCourses } = useContext(CourseContext)
	const { enrollCourse } = useContext(UserContext)

	const classes = useStyles()

	if(courseLoading){
		getCourses()
		return <Typography variant='h3'>Loading</Typography>
	}
	const goHandle = async (e,payload)=>{
		const courseID = courses[payload.index]._id
		try{
			const response = await enrollCourse({courseID: courseID})
			if(response){

			}
		}catch(error){
			console.log(error)
		}
	}
	
	return (
		<div className={classes.outerContainer}>
			<div className={classes.container}>
				<Grid container sm={12} justifyContent='center'>
					<Grid item sm={12}>
						<Typography variant='h4' textAlign='center' gutterBottom fontWeight='bold' color='primary'>
							Our Courses
						</Typography>
					</Grid>
					<Grid item container sm={12} justifyContent="center" >
						<Grid item container sm={12} md={5} lg={3} sx={{flexDirection: 'column'}} justifyContent='flex-start'>
							{courses.map((c,index)=>{
								return index%3==0?(
									<Box key={index} sx={{py: 4}}>
										<StyledCard 
											classes={classes} 
											payload={{index}} 
											onClick={goHandle}
											btnValue='Enroll' 
											url='/assets/images/course.jpg'>
											{c.title}
										</StyledCard>
									</Box>
								):<></>}
							)}
						</Grid>
						<Grid item container sm={12} md={5} lg={3} sx={{flexDirection: 'column'}} justifyContent='flex-start'>
							{courses.map((c,index)=>{
								return index%3==1?(
									<Box key={index} sx={{py: 4}}>
										<StyledCard 
											classes={classes} 
											payload={{index}} 
											onClick={goHandle}
											btnValue='Enroll' 
											url='/assets/images/course.jpg'>
											{c.title}
										</StyledCard>
									</Box>
								):<></>}
							)}
						</Grid>
						<Grid item container sm={12} md={10} lg={3} sx={{flexDirection: 'column'}} justifyContent='flex-start'>
							{courses.map((c,index)=>{
								return index%3==2?(
									<Box key={index} sx={{py: 4}}>
										<StyledCard 
											classes={classes} 
											payload={{index}} 
											onClick={goHandle}
											btnValue='Enroll' 
											url='/assets/images/course.jpg'>
											{c.title}
										</StyledCard>
									</Box>
								):<></>}
							)}
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}