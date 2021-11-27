import {useState} from 'react'
import {Box, Button} from '@mui/material'
import { styled } from '@mui/material/styles'

const Input = styled('input')({
    display: 'none',
});

export default function UploadButton({onChange,payload}) {
	const [filename, setFilename] = useState('upload')

	const filenameChange = (e)=>{
		setFilename(e.target.files[0].name)
		onChange(e,payload)
	}
	return (
		<Box>
			<label>
				<Input accept="video/*" onChange={filenameChange} multiple type="file" />
				<Button variant="contained" component="span">
					{filename.length > 15 ? filename.substr(0,12)+"..." : filename}
				</Button>
			</label>
		</Box>
	);
}