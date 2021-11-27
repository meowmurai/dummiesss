import {makeStyles} from '@mui/styles'
import { Grid, Box, Typography, Divider, IconButton } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(10)
	},
	logo: {
		width: '5rem',
		height: '5rem',
		filter: 'invert(26%) sepia(23%) saturate(4000%) hue-rotate(229deg) brightness(97%) contrast(86%)',
		paddingRight: theme.spacing(1)
	},
	title: {
		color: theme.palette.primary.main,
		display: 'inline-bLock',
	}
}));
export default function Footer() {
	const classes = useStyles()
	return (
		<>
			<Divider />
			<div className={classes.container}>
				<Grid container sm={12} spacing={4}>
					<Grid item sm={12} >
						<IconButton sx={{pl: 0}} className={classes.container}>
							<img className={classes.logo} src='assets/images/logo.svg'/>
							<Typography variant='h4' className={classes.title}>u m m i e s</Typography>
						</IconButton>
					</Grid>
					<Grid item container sm={12} >
						<Grid item sm={12} lg={6}>
							<Typography variant='p'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								<br/>
								Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
								<br/>
								Morbi a bibendum metus.
							</Typography>
						</Grid>
						<Grid item>
							<Grid></Grid>
							<Grid></Grid>
							<Grid></Grid>
						</Grid>
					</Grid>
					<Grid item container sm={12} lg={6}>
						<IconButton sx={{pl: 0}} size='large'>
							<LinkedInIcon fontSize="inherit"/>
						</IconButton>
						<IconButton size='large'>
							<TwitterIcon fontSize="inherit"/>
						</IconButton>
						<IconButton size='large'>
							<FacebookRoundedIcon fontSize="inherit"/>
						</IconButton>
						<IconButton size='large'>
							<InstagramIcon fontSize="inherit"/>
						</IconButton>
					</Grid>
				</Grid>
			</div>
		</>
	)
}