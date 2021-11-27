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
	root:{
			"&.MuiCard-root":{
				width: '300px'
			},
			"&.MuiCardMedia-root":{
				width: '100%',
				height: '200px',
				background: `${randomGradient()}`
			}
	},
}))
export default function FilterSection() {
	const classes = useStyles()
	return (
		<div className={classes.outerContainer}>
			<div className={classes.container}>
				<Grid container sm={12} justifyContent='center'>
					<Grid item sm={12}>
						<Typography variant='h4' textAlign='center' gutterBottom fontWeight='bold' color='primary'>Search by category</Typography>
					</Grid>
					<Grid item container sm={12} justifyContent="center">
						<Grid item container sm={4}>
							
						</Grid>
						<Grid item container sx={{height: '90vh',flexWrap: 'wrap', alignContent: 'space-between'}} sm={8}>
								<Box gutterBottom sx={{flexBasis: '40%',display: 'flex', justifyContent: 'center'}}>
									<StyledCard classes={classes} background>
										AI for everyone
									</StyledCard>
								</Box>
								<Box sx={{flexBasis: '40%',display: 'flex', justifyContent: 'center'}}>
									<StyledCard classes={classes} background>
										AI for everyone
									</StyledCard>
								</Box>
								<Box sx={{flexBasis: '40%',display: 'flex', justifyContent: 'center'}}>
									<StyledCard classes={classes} background>
										AI for everyone
									</StyledCard>
								</Box>
								<Box sx={{flexBasis: '40%',display: 'flex', justifyContent: 'center'}}>
									<StyledCard classes={classes} background>
										AI for everyone
									</StyledCard>
								</Box>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}
function randomGradient() {
  var c1 = {
        r: Math.floor(255),
        g: Math.floor(35+Math.random()*220),
        b: Math.floor(Math.random()*55)
      };
      var c2 = {
        r: Math.floor(255),
        g: Math.floor(35+Math.random()*220),
        b: Math.floor(Math.random()*85)
      };
  c1.rgb = 'rgb('+c1.r+','+c1.g+','+c1.b+')';
  c2.rgb = 'rgb('+c2.r+','+c2.g+','+c2.b+')';
  return 'radial-gradient(circle, '+c1.rgb+', '+c2.rgb+')';
}