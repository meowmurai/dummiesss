import axios from 'axios'
import {Url} from '../contexts/constants';
async function getPresignedURL(title,filetype,callback) {
	await axios.post(`${Url}/lessons/getUploadUrl`,{title: title,filetype: filetype})
               .then(response=>callback(response.data.signedUrl))
               .catch(error=>console.log(error))
}
export async function upload(title,file){
	// Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      file,
      file.name
    );
    formData.append('Content-Type',file.type)

    // Details of the uploaded file
	const config = {
	    method: "PUT",
	    headers: new Headers({
	        "Accept": "application/xml",
	        "Content-Type": file.type
	      }),
	    body: formData,
	};
	const success = true
	getPresignedURL(title,file.type,async (presignedURL)=>{
		const resp = await fetch(presignedURL, config)
		.catch( err => {
		    console.log(err);
		    success = false
		});
	})
	return success
    // Request made to the backend api
    // Send formData object
}