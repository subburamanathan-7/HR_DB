import axios from "axios";

const API_URL = 'http://localhost:5000/api/database/'

export const listContacts = async(token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL,config)
    // console.log(response.data)
    // console.log(response.data.contacts)
    // console.log(response.data.contacts[0])
    return response.data
}
export const getContact = async(contactId,token)=>{
    // console.log(contactId)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(API_URL+contactId,config)
    // console.log(response.data)
    return response.data
}
export const globalListContacts = async(token)=>{
  // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWE4YWY4OTRhNGNiOTM4Mjg0NzllMiIsImlhdCI6MTY5NTAwMDEzOCwiZXhwIjoxNzA1MzY4MTM4fQ.jmFnKb_3Yktyp776rXDJ4Tr3qkBSlmX79Ioy9LznCEE"
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }
  
  const response = await axios.get(API_URL+'list/globalHR',config)
  // console.log(response.data)
  // console.log(response.data.contacts)
  // console.log(response.data.contacts[0])
  return response.data
}
export const addContact = async(contactData,token)=>{
    // console.log(contactData)
    // console.log(token)
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL,contactData,config)
    console.log(response.data)
    return response.data
}
export const updateContact = async(contactID,contactData,token)=>{
  // console.log(contactID)
  // console.log(token)
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }
  const response = await axios.put(API_URL+contactID,contactData,config)
  // console.log(response.data)
  return response.data
}
export const deleteContact = async(contactId,token)=>{
  // console.log(contactId)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL+contactId,config)
  // console.log(response.data)
  return response.data
}
export const FileUpload = async(formData,token)=>{
  // console.log(formData)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL+'upload',formData,config)
  console.log(response.data)
  return response.data

}











// export const transferContact = async(contactID,contactData,token)=>{
//   // console.log(contactID)
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }
//     const response = await axios.put(API_URL+'/transfer/'+contactID,contactData,config)
//     // console.log(response.data)
//     return response.data
// }
