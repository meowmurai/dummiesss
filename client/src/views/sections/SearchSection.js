import { useState, useEffect, useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import {Grid,Typography,Autocomplete,TextField, CircularProgress} from '@mui/material'
import {makeStyles} from '@mui/styles'

import { CourseContext } from '../../contexts/courseContext'
const useStyles = makeStyles(theme=>({
	outerContainer:{
		background: theme.palette.primary.main
	},
	container: {
		padding: theme.spacing(10)
	},
	inputRoot: {
		"& .MuiOutlinedInput-notchedOutline": {
	      borderColor: theme.palette.secondary.main
	    },
	    "&.MuiInputLabel-root, .MuiAutocomplete-tag": {
	    	color: theme.palette.secondary.main,
	    },
	    '& .MuiAutocomplete-inputFocused': {
	    	color: '#fff'
	    },
	    '&.MuiInputLabel-root': {
	    	color: '#fff'
	    }
	}
}))

export default function SearchSection() {
	const { courseState: {courseLoading, courses}, getCourses } = useContext(CourseContext)
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	const navigate = useNavigate()
	useEffect(() => {
		let active = true;
		if (!loading) {
		  	return undefined;
		}
		(async () => {
		  	if (active) {
		    	setOptions(courses);
		  	}
		})();
		return () => {active = false;};
	}, [loading]);

	useEffect(() => {
		if (!open) {
		  	setOptions([]);
		}
	}, [open]);

	const onChange = (e,newVal) =>{
		navigate(`../course/${newVal._id}`)
	}

	const classes = useStyles()
	return (
		<div className={classes.outerContainer}>
			<div className={classes.container}>
				<Grid container sm={12} rowSpacing={4}>
					<Grid item sm={12}>
						<Typography variant='h4' color='secondary' textAlign='center'>
							Lorem ipsum dolor sit amet, consectetur.
						</Typography>
						<Typography variant='h5' color='secondary' textAlign='center'>
							Lorem Ipsum has been the industry's.
						</Typography>
					</Grid>
					<Grid item container justifyContent='center'>
						<Autocomplete
					      id="asynchronous-demo" sx={{ width: 400 }}
					      classes={classes}
					      open={open}
					      onOpen={() => {setOpen(true);}}
					      onClose={() => {setOpen(false);}}
					      isOptionEqualToValue={(option, value) => option.title === value.title}
					      getOptionLabel={(option) => option.title.length>40 ? option.title.substr(0,40) + "..." : option.title}
					      options={options}
					      loading={loading}
					      onChange={onChange}
					      renderInput={(params) => (
					        <TextField
					          {...params}
					          label="Asynchronous"
					          InputProps={{
					            ...params.InputProps,
					            endAdornment: (
					              <>
					                {loading ? <CircularProgress color="inherit" size={20} /> : null}
					                {params.InputProps.endAdornment}
					              </>
					            ),
					          }}
					        />
					      )}
					    />
					</Grid>
				</Grid>
			</div>
		</div>
	)
}