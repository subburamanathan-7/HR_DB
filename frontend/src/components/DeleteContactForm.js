import React, {useState } from 'react'
import{useQuery, useMutation, useQueryClient} from '@tanstack/react-query'

import {deleteContact, getContact} from '../features/contacts/ContactServices' 
import { Spinner } from './Spinner'

function DeleteContactForm(currentUserID,onClose) {
    const [userId,setUserId] = useState(currentUserID.currentUserID)
    const queryClient = useQueryClient()
    const [formData,setFormData]= useState({
        name:'',
        company:'',
    })

    // Delete Contacts
    const deleteContactMutation = useMutation({
        mutationFn:()=>{
            return deleteContact(currentUserID.currentUserID,sessionStorage.getItem('user'))
        },
        onSuccess: () =>{
            // Object.keys(responseData).forEach(v => responseData[v] = 0)
            queryClient.invalidateQueries(["contacts"])
            queryClient.invalidateQueries(["teamcontacts"])
            queryClient.invalidateQueries(["globalContacts"])


        } 
    })
    // Get Contact
    const getContactQuery = useQuery({
        queryKey:['contact',currentUserID],
        queryFn:()=>{
            return getContact(currentUserID.currentUserID,sessionStorage.getItem('user'))
        },
        // enabled:false
        enabled: !!userId,
        // refetchOnMount:false,
        // refetchInterval: 2000,
    })
    getContactQuery.remove()
    // if(!getContactQuery.isFetched || getContactQuery.isError)
    //     // getContactQuery.refetch()
    // {}
    if(getContactQuery.isLoading || getContactQuery.isFetching){
        // return <Spinner/>
        console.log("Loading")
    }
    else{
        console.log(userId)
        setUserId(null)    
        console.log(getContactQuery.data)
        const currentState = {
            name:getContactQuery.data.name,
            company:getContactQuery.data.company,
        }
        setFormData(currentState)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        deleteContactMutation.mutate() 
    }

    return (
        <>
           <div className=''>
            <div className='container mx-auto'>
                <div className='flex flex-col py-10 px-12'>
                    <h3 className=' my-[1%] text-center font-semibold text-[#000000] text-2xl'>Delete Contact</h3>
                    <div className=' px-[3%] py-[2%] text-[#000000] font-base text-xl'>
                        Delete {formData.name} from {formData.company}?
                    </div>
                    <div className='flex items-center justify-center mt-5 text-white'>
                        <button className='px-[2%] cursor-pointer bg-[#D22B2B] focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                        type='submit' id='cancel' onClick={()=>{}}>
                            Cancel
                        </button>
                        <button className=' px-[2%] cursor-pointer bg-[#8EA7E9] focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                        type='submit' id='submit' onClick={handleSubmit}>
                            Delete Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}

export default DeleteContactForm