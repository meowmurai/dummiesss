import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {Grid,Typography,Box} from '@mui/material'
import {makeStyles} from '@mui/styles'

import StyledCard from '../../Components/card.js'

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
export default function UserCoursesSection() {
	const {userState:{courses} } = useContext(UserContext)

	const classes = useStyles()
	const navigate = useNavigate()

	const goHandle = (e,payload)=>{
		navigate(`/course/${courses[payload.index]._id}`)
	}
	
	return (
		<div className={classes.outerContainer}>
			<div className={classes.container}>
				<Grid container sm={12} justifyContent='center'>
					<Grid item sm={12}>
						<Typography variant='h4' textAlign='center' gutterBottom fontWeight='bold' color='primary'>
							Yours course
						</Typography>
					</Grid>
					<Grid item container xs={12} justifyContent="center" >
						<Grid item container sm={12} md={5} lg={3} justifyContent='center'>
							{courses.map((c,index)=>{
								return index%3===0?(
									<Box key={index} sx={{py: 4}}>
										<StyledCard 
											classes={classes} 
											payload={{index}} 
											btnValue='Go'
											onClick={goHandle}
											url='/assets/images/course.jpg'>
											{c.title}
										</StyledCard>
									</Box>
								):<></>}
							)}
						</Grid>
						<Grid item container sm={12} md={5} lg={3} justifyContent='center'>
							{Object.keys(courses).length < 1 ? <Typography sx={{mx: 'auto'}}>You haven't attemped any course</Typography> : <></>}
							{courses.map((c,index)=>{
								return index%3===1?(
									<Box key={index} sx={{py: 4}}>
										<StyledCard 
											classes={classes} 
											payload={{index}} 
											btnValue='Go' 
											onClick={goHandle}
											url='/assets/images/course.jpg'>
											{c.title}
										</StyledCard>
									</Box>
								):<></>}
							)}
						</Grid>
						<Grid item container sm={12} md={10} lg={3} justifyContent='center'>
							{courses.map((c,index)=>{
								return index%3===2?(
									<Box key={index} sx={{py: 4}}>
										<StyledCard 
											classes={classes} 
											payload={{index}} 
											btnValue='Go' 
											onClick={goHandle}
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