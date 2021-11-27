import { styled, alpha } from '@mui/material/styles'
import {TextField} from '@mui/material'

export default function MyInput({label,payload,onChange,...props}) {
	const changeHandle = (e) =>{
		onChange(e,payload)
	}
	return (
		<StyledTextField
	        label={label}
	        defaultValue=""
	        id="reddit-input"
	        variant="filled"
	        style={{ marginTop: 4}}
	        onChange={changeHandle}
	        {...props}
	    />
	)
}
const StyledTextField = styled((props) => (
	  <TextField InputProps={{ disableUnderline: true }} {...props} />
	))(({ theme }) => ({
	  '& .MuiFilledInput-root': {
	    border: '1px solid #e2e2e1',
	    overflow: 'hidden',
	    borderRadius: 4,
	    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
	    transition: theme.transitions.create([
	      'border-color',
	      'background-color',
	      'box-shadow',
	    ]),
	    '&:hover': {
	      backgroundColor: 'transparent',
	    },
	    '&.Mui-focused': {
	      backgroundColor: 'transparent',
	      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
	      borderColor: theme.palette.primary.main,
	    },
	  },
}));