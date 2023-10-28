import React, {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom"
import{useMutation, useQueryClient} from '@tanstack/react-query'
import {currentUserContext} from '../App'


import {login} from "../features/users/UserServices"

function AdminForm() {
    const [formData, setFormData] = useState({email:"", password:"",role:"Admin"})
    const {currentUser,setCurrentUser } = useContext(currentUserContext);

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess:(data)=>{
            queryClient.invalidateQueries(["user"], { exact: true })
            setCurrentUser(sessionStorage.getItem('user'))
            sessionStorage.setItem('email',data.email)
            sessionStorage.setItem('role',data.role)
            sessionStorage.setItem('incharge',data.incharge)

        //   console.log(data)
            navigate('/ddashboard')
        }
      })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        loginMutation.mutate({
            email:formData.email,
            password:formData.password,
            role:formData.role
        })
    }
    return (
        <>
            <div className='flex justify-center items-center h-screen bg-[#8EA7E9]'>
                <form className='w-96 p-6 shadow-lg bg-white rounded-md text-[#7286D3]'>
                    <h2 className='text-2xl  block text-center font-semibold'><i className=' text-2xl fa-solid fa-user px-2'></i> Admin Login</h2>
                    <hr className='mt-3'/>
                    <div className='mt-3'>
                        <label htmlFor='username' className=' block text-base mb-2 font-base'>Email</label>
                        <input type='text' id ='email' 
                        name='email'
                        className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                        placeholder='Enter Email...'
                        value={formData.email} 
                        onChange={handleChange}/>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='password' className='block text-base mb-2 font-base'>Password</label>
                        <input type='password' id ='password' 
                        name='password'
                        className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                        placeholder='Enter Password...'
                        value={formData.password} 
                        onChange={handleChange}/>
                    </div>
                    <div class="mt-3 flex justify-between items-center">
                        <div>
                            <label><a href='/login' className='text-[#7286D3] font-semibold'>Common Login</a></label>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <button type='submit' className=' cursor-pointer border-2 border-[#a6c1ee] bg-[#7286D3] text-white py-1 w-full rounded font-semibold hover:opacity-75 hover:z-90 duration-150' onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminForm