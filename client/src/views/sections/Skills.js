import { Link } from 'react-router-dom'
import {Grid,Typography,Box,Button} from '@mui/material'
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
	},
	root:{
			"&.MuiCard-root":{
				
			},
			"&.MuiCardMedia-root":{
				width: '60%',
				height: '200px',
				margin: 'auto'
			}
	},
}))
export default function Skills() {
	const classes = useStyles()
	return (
		<div className={classes.outerContainer}>
			<div className={classes.container}>
				<Grid container sm={12} spacing={4} justifyContent='center'>
					<Grid item sm={12}>
						<Typography variant='h4' textAlign='center' gutterBottom fontWeight='bold' color='primary'>What skills will you learn?</Typography>
					</Grid>
					<Grid item container sm={12} justifyContent="center" columnSpacing={2}>
						<Grid item sm={12} md={4}>
							<StyledCard classes={classes} url='/assets/images/programmer.svg' elevation={0}>Gain world-class education to expand your technical knowledge</StyledCard>
						</Grid>
						<Grid item sm={12} md={4}>
							<StyledCard classes={classes} url='/assets/images/projection.svg' elevation={0}>Get hands-on training to acquire practical skills</StyledCard>
						</Grid>
						<Grid item sm={12} md={4}>
							<StyledCard classes={classes} url='/assets/images/community.svg' elevation={0}>Learn from a collaborative community of peers and mentors</StyledCard>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}