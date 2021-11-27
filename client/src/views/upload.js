import {useState} from 'react'
import axios from 'axios'
import ReactS3Uploader from 'react-s3-uploader'
const getSignedUrl= async (file, callback)=> {
  await axios.post('http://localhost:3001/lessons/getUploadUrl',{filename: file.name,filetype: file.type})
              .then(response=>callback(response.data)).catch(error=>console.log(error))
  
}

export default function Uploader() {
  const [file,setFile] = useState(null)
  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }
  const onFileUpload = () => {

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
    getSignedUrl(file,async (response)=>{
      const resp = await fetch(response.signedUrl, config).catch( err => {
        console.log(err);
        return null;
      });
    })
    // Request made to the backend api
    // Send formData object
   
  };

  return (
    <>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>submit</button>
    </>
  )
}

