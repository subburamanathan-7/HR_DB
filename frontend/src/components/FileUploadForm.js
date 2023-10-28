import React, { useState } from 'react';
import Papa from 'papaparse'

import { FileUpload } from '../features/contacts/ContactServices';
import{ useMutation, useQueryClient} from '@tanstack/react-query'

const FileUploadForm = () => {
  const queryClient = useQueryClient()
  const [file, setFile] = useState(null);
  const [CSVData, setCSVData] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const fileUploadMutation = useMutation({
    mutationFn: ()=>{
      return FileUpload(CSVData,sessionStorage.getItem('user'))
    },
    onSuccess:(data)=>{
      //Object.keys(responseData).forEach(v => responseData[v] = 0)
      // queryClient.invalidateQueries(['contacts'])

    }
})

  const handleUpload = () => {
    if (file) {
        console.log(file);
        Papa.parse(file, {
            complete: function(results) {
              console.log("Finished:", results.data);

              setCSVData(results.data)
              fileUploadMutation.mutate()
            }}
          )
      }
  };
  
  return (
    <>
        <div className=''>
            <div className='container mx-auto'>
                <div className='flex flex-col py-12 px-12'>
                    <h3 className='text-xl font-bold text-color1 mb-4 text-center'>Upload CSV or Excel</h3>
                   
                    <div className='flex items-center justify-center mt-5'>
                        <input id = "myfile" name="myfile" type="file" accept=".xls, .xlsx, .csv" onChange={handleFileChange} className=' font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2'/>

                        <button onClick={handleUpload} className='bg-[#D22B2B] hover:scale-95 focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2'
                        id='submit' >
                            Upload File
                        </button>
                    </div>
                </div>
            </div>
        </div>

    
    
    </>
        
  );
};

export default FileUploadForm;

// <div>
// <h2>Upload Excel or CSV File</h2>
// <input id = "myfile" name="myfile" type="file" accept=".xls, .xlsx, .csv" onChange={handleFileChange} />
// <button onClick={handleUpload}>Upload</button>
// </div>
