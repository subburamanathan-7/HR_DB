import React, {useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import{useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-toastify'

import {currentUserContext} from '../App'

import {login} from "../features/users/UserServices"

function Form() {
    const [formData, setFormData] = useState({email:"", password:"", role:""})
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

            if(data.role ==='Member'){
                navigate('/dashboard')
            }
            else{
                navigate('/ddashboard')
            }
        },
        onError:(message)=>{
            console.log(message)
            toast.error(message)
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
        if(loginMutation.error){
            toast.error('UC')
        }
    }
    return (
        <>
            <div className='flex justify-center items-center h-screen bg-[#8EA7E9]'>
                <form className='w-96 p-6 shadow-lg bg-white rounded-md text-[#7286D3]'>
                    <h2 className='text-3xl block text-center font-semibold '><i className=' text-2xl fa-solid fa-user px-2'></i>Login</h2>
                    <hr className='mt-3'/>
                    <div className='mt-3'>
                        <label htmlFor='email' className='  block font-semibold mb-2 text-base'>Email</label>
                        <input type='email' id ='email' 
                        name ="email"
                        className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                        placeholder='Enter Email...'
                        value={formData.email} 
                        onChange={handleChange}/>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='password' className=' font-semibold block text-base mb-2'>Password</label>
                        <input type='password' id ='password' 
                        name ="password"
                        className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                        placeholder='Enter Password...'
                        value={formData.password} 
                        onChange={handleChange}/>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='role' className=' font-semibold block text-base mb-2'>Role:</label>
                        <select name='role' id='role' 
                        className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
                        value={formData.role} 
                        onChange={handleChange}>
                            <option value='' disabled selected hidden>Choose Role...</option>
                            <option value='Director'>Executive Director</option>
                            <option value='Member'>Member</option>
                        </select>
                    </div>
                    <div class="mt-3 flex justify-between items-center">
                        <div>
                            <label><a href='/admin' className='text-color3 font-semibold'>Admin Login</a></label>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <button type='submit' 
                        className='cursor-pointer border-2 bg-[#7286D3] text-white py-1 w-full rounded font-semibold hover:opacity-75  hover:z-90 duration-150 ' 
                        onClick={handleSubmit}
                        disabled={!formData.email || !formData.password || !formData.role}>
                        Submit</button>
                    </div>
                </form>
            </div> 
        </> 
    )
}

export default Form