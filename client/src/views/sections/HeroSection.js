import { Link } from 'react-router-dom'
import {Grid,Typography,Box,Button} from '@mui/material'
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
export default function HeroSection() {
	const classes = useStyles()
	return (
		<div className={classes.outerContainer}>
			<div className={classes.container}>
				<Grid container sm={12} spacing={4}>
					<Grid item container sm={12} lg={6} >
						<Grid item sm={12}>
							<Typography variant='h4' color='secondary'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.
								<b className={classes.highlight}>dummies?</b>
							</Typography>
						</Grid>
						<Grid item container >
							<Button component={Link} to='/login' sx={{mr: '8px', flexGrow: 2, height: '3rem'}} disableElevation color='darkerpurple' variant='contained'>Get Started</Button>
							<Button component={Link} to='/explore' sx={{mx: '8px', flexGrow: 4, height: '3rem'}} disableElevation color='secondary' variant='contained'>Explore</Button>
						</Grid>
					</Grid>
					<Grid item container sm={12} lg={6} justifyContent="center">
						<img className={classes.img} src='/assets/images/book-reading.svg'/>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}