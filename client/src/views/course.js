import { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import {UserContext} from '../contexts/userContext'
import {AuthContext} from '../contexts/AuthContext'

import {Grid,Typography,MenuItem,InputLabel} from '@mui/material'
import {makeStyles} from '@mui/styles'
import Select from 'react-select'

import InfoSection from './sections/InfoSection'
import UserCoursesSection from './sections/UserCoursesSection'

const useStyles = makeStyles(theme=>({
	outerContainer:{
		background: theme.palette.primary.main
	},
	container: {
		padding: theme.spacing(10)
	},
	video: {
		width: '100%',
		height: '100%'
	}
}))

export default function Course(){
	const {getCourseDetail, getLessonURL} = useContext(UserContext)
	const {authState: {isAuthenticated, authLoading}} = useContext(AuthContext)

	const [course, setCourse] = useState(null)
	const [options, setOptions] = useState(null)
	const [contentURL, setContentURL] = useState('')

	const {id} = useParams()
	const classes = useStyles()

	useEffect(async()=>{
		let isMounted = true
		getCourseDetail(id).then(c=>{
			if(isMounted && c.success) setCourse(c.course)
		})
		return () => {isMounted = false}
	},[])
	useEffect(()=>{
		if(!course) return
		console.log(course)
		let tmp = []
		course.lessonList.map((lesson,i)=>{
			tmp.push({
				value: i,
				label: `week ${i} ${lesson.title}`
			})
		})
		setOptions(tmp)
	},[course])

	if(!course) return <Typography color='danger'>course not found</Typography>

	const handleSel = async (payload)=>{
		getLessonURL(course.lessonList[payload.value]._id).then(response=>{
			console.log(response)
			if(response.success){
				setContentURL(response.url)
			}else{
				console.log('error at handleSel() course.js')
			}
		})
	}
	
	return (
		<>
			<div className={classes.outerContainer}>
				<div className={classes.container}>
					<Grid container sm={12} rowSpacing={{xs: 1, md: 4}} justifyContent='center'>
						<Grid item xs={12} md={10} lg={8}>
							<Select onChange={handleSel} options={options} />
						</Grid>
						<Grid item xs={12} md={10} lg={8}>
							<video className={classes.video} key={contentURL} autoPlay controls >
     							<source src={contentURL} type="video/mp4"/> 
     						</video>
						</Grid>
					</Grid>
				</div>
			</div>
			<div >
				<div className={classes.container}>
					<Grid container xs={12} justifyContent='center'>
						<Grid item xs={12} sm={10} md={8}>
							<Typography variant='h4' fontWeight='bold' gutterBottom textAlign='center'>Description</Typography>
							<Typography variant='p' paragraph textAlign='center'>
								{course.description}
							</Typography>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	)
}