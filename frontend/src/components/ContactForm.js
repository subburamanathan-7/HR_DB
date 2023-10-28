import React, {useState } from 'react'
import{useQuery, useMutation, useQueryClient} from '@tanstack/react-query'

import {addContact} from '../features/contacts/ContactServices'

function ContactForm(currentUserID,onClose) {
    const queryClient = useQueryClient()
    
    const [formData,setFormData]= useState({
        name:'',
        company:'',
        contactNumber:'',
        email:'',
        status:'',
        interviewMode:'',
        HRCount:'',
        transport:'',
        address:'',
        internship:'',
        // department:'',
        comments:''
    })
    const initialState ={}
    
    
    // Add ContactMutation
    const addContactMutation = useMutation({
        mutationFn: ()=>{
          return addContact(formData,sessionStorage.getItem('user'))
        },
        onSuccess:(data)=>{
        //   Object.keys(responseData).forEach(v => responseData[v] = 0)
          queryClient.invalidateQueries(['contacts'])
    
        }
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
     
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        addContactMutation.mutate()
        
    }
      
  return (
   <>
        <div className=''>
            <div className='container mx-auto'>
                <div className='flex flex-col py-12 px-12'>
                    <h3 className='text-xl mb-4 text-center text-[#00000]'>Add Contact</h3>
                    <form>
                        <div className='grid grid-cols-2 gap-2'>
                            <input className='placeholder-color1 rounded-md border py-1 px-2 border-[#A9A9A9] rounded' placeholder='Name'
                            type='text' name='name' value={formData.name} onChange={handleChange}/>
                            <input className='placeholder-color1 rounded-md border py-1 px-2 border-[#A9A9A9] rounded' placeholder='Contact Number'
                            type='text' name='contactNumber' value={formData.number} onChange={handleChange}/>
                        </div>
                        <div className='mt-2'>
                            <input className='placeholder-color1 rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='Company Name'
                            type='text' name='company' value={formData.company} onChange={handleChange}/>
                        </div>
                        <div className='mt-2'>
                            <input className='placeholder-color1 rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='Email'
                            type='email' name='email' value={formData.email} onChange={handleChange}/>
                        </div>
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                            <select name="status" id="status" className=' border py-1 px-2 border-[#A9A9A9] rounded'
                            value={formData.status} onChange={handleChange}
                            required>
                                <option className='text-color1' value='' disabled selected hidden>Choose Contact Status...</option>
                                <option value="notCalled">Not Called</option>
                                <option value="calledAccepted">Called/Accepted</option>
                                <option value="calledDeclined">Called/Declined</option>
                                <option value="calledNotReachable">Called/NotReachable</option>
                                <option value="emailedAccepted">Emailed/Accepted</option>
                                <option value="emailedAwaitingResponse">Emailed/AwaitingResponse</option>
                                <option value="emailedDeclined">Emailed/Declined</option>
                            </select>
                            <select name="interviewMode" id="interviewMode" className='border py-1 px-2 border-[#A9A9A9] rounded'
                            value={formData.interviewMode} onChange={handleChange}
                            required>
                                <option className='text-color1' value='' disabled selected hidden>Choose Interview Mode...</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                                <option value="onlineOffline">Online/Offline</option>
                            </select>
                        </div>
                        <div className='flex mt-2'>
                            <input  id="HRCount" name="HRCount" type="number" placeholder='HR Count'
                            className=' placeholder-color1 border py-1 px-2 border-[#A9A9A9] rounded mr-2 w-1/4'
                            value={formData.HRCount} 
                            onChange={handleChange}
                            min={0}
                            required/>
                            <select name="transport" id="transport" 
                            className='border py-1 px-2 border-[#A9A9A9] rounded mr-2'
                            value={formData.transport} 
                            onChange={handleChange}
                            required>
                            <option className='text-color1' value='' disabled selected hidden>Transportation Mode...</option>
                            <option value="own">Own</option>
                            <option value="Cab">Cab</option>
                            </select>
                            <select name="internship" id="internship" 
                            className='border py-1 px-2 border-[#A9A9A9] rounded w-2/5'
                            value={formData.internship} 
                            onChange={handleChange}
                            required>
                                <option className='text-color1' value='' disabled selected hidden>Internship ...</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className='mt-2'>
                            <input className='placeholder-color1 rounded-md border py-2 px-2 border-[#A9A9A9] w-full rounded' placeholder='Address'
                            value={formData.address} onChange={handleChange} name='address' type='textbox'/>
                        </div>
                        <div className='mt-2'>
                            <input className='placeholder-color1 rounded-md border py-2 px-2 border-[#A9A9A9] w-full rounded' placeholder='Comments'
                            value={formData.comments} onChange={handleChange} name='comments' type='textbox'/>
                        </div>
                    </form>
                    <div className='flex items-center justify-center mt-5'>
                        <button className='bg-[#8EA7E9] text-[#000000]  focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                        type='submit' id ='submit' onClick={handleSubmit}>
                            Save Contact
                        </button>
                        {/* <button className='bg-[#A9A9A9] hover:scale-95 focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2'>
                            Update Contact
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
   </>
  )
}

export default ContactForm

