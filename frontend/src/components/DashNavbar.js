import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import FileUploadForm from '../components/FileUploadForm'

import {currentUserContext} from '../App'
const forese = require('../forese.png')

function DashNavbar() {
    const navigate = useNavigate()
    const {currentUser,setCurrentUser } = useContext(currentUserContext);
    const [currentUserRole,setCurrentUserRole] = useState(sessionStorage.getItem('role'))
    const [showUploadModal,setShowUploadModal] = useState(false)

    const currentRoute = window.location.href
   
    const handleLogout = ()=>{
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('incharge')
        setCurrentUser(null)
        navigate('/login')
    }
    let user = sessionStorage.getItem('email')
    user = user?user.substring(0,user.length-10):''
    user = user?user.charAt(0).toUpperCase() + user.slice(1):''
    
  return (
   <>
        <header className='bg-[#8294C4]'>
            <nav className='flex justify-between items-center w-[92%] mx-auto py-2'>
                <div>
                    <img className='w-16'
                    src={forese} />
                </div>
                <div className='flex justify-end '>
                    <div className='mr-2 ml-2'>
                        <button className='bg-[#DBDFEA] text-[#000000] px-5 py-2 rounded-full'>Hello {user}</button>
                    </div>
                    <button className=' mr-2 ml-2 bg-[#DBDFEA] text-[#000000] px-5 py-2 rounded-full hover:scale-95 duration-150' onClick={()=>{
                        setShowUploadModal(true)
                        }}>Upload Contacts 
                    </button>
                    {
                        currentUserRole==='Director'?
                        (
                            <div className='mr-2 ml-2'>
                                {
                                    currentRoute.includes('globalHR')
                                    ?
                                    <button className='bg-[#DBDFEA] text-[#000000] px-5 py-2 rounded-full hover: scale-95 duration-150' onClick={()=>navigate('/ddashboard')}>Dashboard</button>
                                    :
                                    <button className='bg-[#DBDFEA] text-[#000000] px-5 py-2 rounded-full hover:scale-95 duration-150' onClick={()=>navigate('/globalHR')}>Global HR</button>
                                } 
                                
                            </div>
                        ):(<></>)
                    }
                    <div className=' ml-2 '>
                        <button className='bg-[#DBDFEA] text-[#000000]  px-5 py-2 rounded-full hover:scale-95 duration-150' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </header>
        <Modal isVisible={showUploadModal} onClose={()=>{setShowUploadModal(false)}}>
            <FileUploadForm onClose={()=>{setShowUploadModal(false)}}/>
        </Modal>
   </>
  )
}

export default DashNavbar