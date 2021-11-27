import { Link } from 'react-router-dom'
import {Grid,Typography,Box,Button,Avatar,AvatarGroup} from '@mui/material'
import {makeStyles} from '@mui/styles'

import StyledCard from '../../Components/card.js'

const useStyles = makeStyles(theme=>({
	outerContainer:{
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
	inlineBlock: {
	}
}))
export default function AboutUs() {
	const classes = useStyles()
	return (
		<div className={classes.outerContainer}>
			<div className={classes.container}>
				<Grid container sm={12} spacing={4} justifyContent='center'>
					<Grid item sm={12}>
						<Typography variant='h4' textAlign='center' gutterBottom fontWeight='bold' color='primary'>Who are we?</Typography>
					</Grid>
					<Grid item container sm={12} justifyContent="center" spacing={2}>
						<Grid item container sm={12} md={2}>
							<AvatarGroup spacing={50} sx={{mx: 'auto'}}>
								<Avatar sx={{width: '150px',height: '150px'}} alt="Remy Sharp" src="/assets/images/ava1.jpg" />
								<Avatar sx={{width: '150px',height: '150px'}} alt="Remy Sharp" src="/assets/images/ava2.jpg" />
							</AvatarGroup>
						</Grid>
						<Grid item sm={12} md={6}>
							<Typography paragraph>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
							</Typography>
						</Grid>
						<Grid item container sm={12} >
							<Button sx={{mx: 'auto', height: '3rem'}} disableElevation color='darkerpurple' variant='contained'>Learn more</Button>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}