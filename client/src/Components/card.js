import {useState} from 'react'
import {Typography,Card,CardContent,CardMedia,CardActions } from '@mui/material'
import {LoadingButton} from '@mui/lab'

export default function StyledCard({url,alt,classes,elevation,noButton,btnValue,onClick,payload, children}) {
	const [loading, setLoading] = useState(false)
	const handleClick = async (e) =>{
		setLoading(true)
		if(!onClick){ setLoading(false);return }
		try{
			await onClick(e,payload)
			setLoading(false)
		}catch(error){}
	}	
	return (
		<Card elevation={elevation} classes={classes}>
			<CardMedia
				component='img'
				image={url}
				alt={alt}
				classes={classes}
			/>
			<CardContent>
				<Typography variant='p' textAlign='center' paragraph>
					{children.length > 27 ? children.substr(0,27)+"..." : children}
				</Typography>
			</CardContent>
			{noButton ? <></>:
				<CardActions>
			        <LoadingButton sx={{ml: 'auto'}} onClick={handleClick} loading={loading} size="small" color="primary">
			          {btnValue}
			        </LoadingButton>
			    </CardActions>
			}
		</Card>
	)
}
