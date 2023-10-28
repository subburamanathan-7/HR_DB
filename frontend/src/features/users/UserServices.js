import axios from 'axios'
const API_URL = 'http://localhost:5000/api/volunteer/'

export const login = async(userData)=>{
    const response = await axios.post(API_URL+'login',userData)
        .catch(function(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data.message);
                throw new Error(error.response.data.message) 

                // console.log(error.response.status);
                // console.log(error.response.headers);
            } 
            else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } 
            else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            // console.log(error.config);
        })
        if(response.data){
            sessionStorage.setItem('user',JSON.stringify(response.data.token))
            return response.data
        }
    // console.log(response.data)
}

export const getProfile = async(token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL+'profile',config)
    // console.log(response.data)
    return response.data
}

export const getUsers = async(token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL+'users',config)
    // console.log(response.data)
    return response.data
}

export const getDirectors = async(token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL+'directors',config)
    // console.log(response.data)
    return response.data
}