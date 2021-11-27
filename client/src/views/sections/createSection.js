import { useContext, useEffect, useState } from 'react'
import {CourseContext} from '../../contexts/courseContext'
import {makeStyles} from '@mui/styles'
import {LoadingButton} from '@mui/lab'
import {Grid,Box,Typography,Button,IconButton,TextField} from '@mui/material'

import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import UploadButton from '../../Components/uploadButton.js'
import MyInput from '../../Components/myInput.js'

import {upload} from '../../utils/uploader.js'


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


export default function CreateSection(){
	const {courseState: {courses, courseLoading}, getCourses, createCourses,createLesson} = useContext(CourseContext)

	const [form, setForm] = useState({
		title: '',
		code: '',
		desc: '',
	})
	const [lessons,setLessons] = useState([])
	const [count, setCount] = useState(0)
	const [loading,setLoading] = useState(false)
	const classes = useStyles()

	const onChangeForm = e => setForm({...form, [e.target.name]:e.target.value});
	const addEmptyLesson = ()=>{
		let tmp = lessons
		tmp.push({order: count,title: '',file: null})
		
		setLessons(tmp)
		setCount(count+1)
		
	}
	const lessonfileChange = (e,payload)=>{
		let index = payload.order
		let tmp = lessons
		tmp[index].file = e.target.files[0]
		setLessons(tmp)
	}
	const lessonformChange = (e,payload)=>{
		let index = payload.order
		let tmp = lessons
		tmp[index] = {...tmp[index], [e.target.name]:e.target.value} 
		setLessons(tmp)

		console.log(lessons)
	}
	const submit = async ()=>{
		setLoading(true)
		const resp = await createCourses(form)
		if(!resp){
			console.log('failed to create course: ',form.title)
			setLoading(false)
			return
		}
		console.log(resp)
		for (const lesson of lessons){
			const response = await upload(lesson.title, lesson.file)
			if(response){
				createLesson(lesson.title)
			}
			else{
				console.log('failed to upload lesson: ',lesson.title)
			}
		}
		setLoading(false)
	}
	return (
		<div>
			<div className={classes.container}>
				<Grid container xs={12} justifyContent='center'>
					<Grid item container xs={12} sm={10} md={8} justifyContent='center' rowSpacing={4}>
						<Grid item sm={12}>
							<Typography sx={{fontWeight: 'bold'}} color='primary' textAlign='center' variant='h4' gutterBottom>New Course</Typography>
						</Grid>
						<Grid item container sm={12} md={8} justifyContent='flex-start'>
							<MyInput name='title' onChange={onChangeForm} fullWidth label='Course title'/>
							<MyInput name='code' onChange={onChangeForm} fullWidth label='Course code'/>
							<MyInput name='desc' onChange={onChangeForm} fullWidth label='Description'/>

							{[ ...Array(count).keys() ].map(i=>{
								return(
									<Box key={i} sx={{flexBasis: '50%'}}>
										<MyInput disabled={loading} name='title' onChange={lessonformChange} payload={{order: i}} fullWidth label='Lesson title'/>
										<UploadButton disabled onChange={lessonfileChange} payload={{order: i}}/>
									</Box>
								)
							})}
							<Box>
								<IconButton color='primary' onClick={addEmptyLesson}>
									<AddCircleSharpIcon/>
									lesson
								</IconButton>
								<IconButton color='primary' onClick={()=>{setCount(0);setLessons([])}}>
									<HighlightOffIcon/>
									clear
								</IconButton>
							</Box>
						</Grid>
						<Grid item container xs={12} justifyContent='center'>
							<LoadingButton onClick={submit} loading={loading} variant='contained' color='purple'>Create</LoadingButton>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}