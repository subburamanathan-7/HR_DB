import React, { Fragment, useState } from 'react'
import{useQuery, useQueryClient} from '@tanstack/react-query'

import DashNavbar from '../components/DashNavbar'
import Card from '../components/Card'
import Modal from '../components/Modal'
import ContactForm from '../components/ContactForm'
import {Spinner} from '../components/Spinner'

import {listContacts} from '../features/contacts/ContactServices'
import { getMyTeam, getUsers } from '../features/users/UserServices'

import UpdateContactForm from '../components/UpdateContactForm'
import DeleteContactForm from '../components/DeleteContactForm'
import SearchNotFound from '../components/SearchNotFound'

function DirectorsDashboard() {
    let content=""
    let filteredData
    let totalContacts 

    let statusMap ={
        'notCalled':'Not Called',
        'calledAccepted':' Called/Accepted',
        'calledDeclined':'Called/Declined',
        'calledPostponed':'Called/Postponed',
        'calledNotReachable':'Called/NotReachable',
        'emailedAccepted':'Emailed/Accepted',
        'emailedAwaitingResponse':'Emailed/Awaiting Response',
        'emailedDeclined':'Emailed/Declined',
        'blacklisted':'Blacklisted',
    }
    const [usersMap, setUsersMap]=useState({})
    const queryClient = useQueryClient()
    const [showModal,setShowModal] = useState(false)
    const [showUpdateModal,setShowUpdateModal] = useState(false)
    const [showDeleteModal,setShowDeleteModal] = useState(false)


    const [showFilter,setShowFilter] = useState(false)
    const [filterParam,setFilterParam]=useState('')
    const [searchParam, setSearchParam] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [currentUserID,setCurrentUserID] = useState(null)
    
    const [statusResponseData,setStatusResponseData] = useState({
        notCalled:0,
        calledAccepted:0,
        calledDeclined:0,
        calledPostponed:0,
        calledNotReachable:0,
        emailedAccepted:0,
        emailedAwaitingResponse:0,
        emailedDeclined:0,
        blacklisted:0
    })
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }
    const handleSearchChange = (e) => {
        setSearchParam(e.target.value);
    };

    //Get Users
    const getUserQuery = useQuery({
        queryKey:['users'],
        queryFn: ()=>{
            return getUsers(sessionStorage.getItem('user'))
        },
    })
        
    //List Contacts
    const listContactMutation= useQuery({
        queryKey:['teamcontacts'],
        queryFn: ()=>{
        // Object.keys(responseData).forEach(v => responseData[v] = 0)
        return listContacts(sessionStorage.getItem('user'))
        },
    })     
    
    if(getUserQuery.isLoading){
        <Spinner/>
    }
    else if(getUserQuery.isFetched){
        getUserQuery.data.users.map((user)=>{
            let username = user.email.substring(0,user.email.length-10)
            username = username.charAt(0).toUpperCase() + username.slice(1)

            usersMap[user._id]=username
        })
    }
    if(listContactMutation.isLoading){
        <Spinner/>
    }
    else if(listContactMutation.isFetched ){
        Object.keys(statusResponseData).forEach(v => statusResponseData[v] = 0)
        totalContacts=0
        content = listContactMutation.data.contacts
        content.map((contact)=>{
            statusResponseData[contact.status]+=1
            totalContacts+=1;
        })
        !isChecked ?
        filteredData = content.filter(item =>
            item.name.toLowerCase().includes(searchParam.toLowerCase())
        )
        :
        filteredData = content.filter(item =>
            item.contactNumber.toString().includes(searchParam.toLowerCase())
        )
        
        if(showFilter){
            filteredData = filteredData.filter(item=>
                item.status===filterParam)
        }
        filteredData=filteredData.reverse()
        content= filteredData.map((contact)=>{
            return(
                <tr className={`text-[#000000] text-lg rounded-md ${contact.status==='blacklisted'?'bg-[#E97777] hover:border-[#DBDFEA] hover:border-x-4 duration-150':'bg-[] hover:border-[#8294C4] hover:border-x-4 duration-150'}`}>
                
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '>{contact.name}</td>
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '>{contact.company}</td>
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '>{contact.contactNumber}</td>
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '><span className={`p-1.5 text-xs font-medium tracking-wide rounded-lg ${contact.status==='blacklisted'?'bg-[#DBDFEA] text-[#00000]':'bg-[#8EA7E9] text-white'}`}>{statusMap[contact.status]}</span></td>
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '>{contact.volunteer? usersMap[contact.volunteer]: usersMap[contact.incharge] }</td>
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '>
                        <i className={`cursor-pointer fa-solid fa-pen-to-square mr-4 ${contact.status==='blacklisted'?'hover:text-white':'hover:text-[#8EA7E9]'}`} onClick={()=>{
                            setCurrentUserID(contact._id)
                            setShowUpdateModal(true)
                        }}></i>
                        <i className={`cursor-pointer fa-sharp fa-solid fa-trash ${contact.status==='blacklisted'?'hover:text-white':'hover:text-[#E97777]'}`} onClick={()=>{
                            setCurrentUserID(contact._id)
                            setShowDeleteModal(true)
                        }}
                        ></i>
                    </td>
                </tr>
            )

        })
    }   
    return (
        <>
            <DashNavbar/>
            <Fragment>
                <div className={`p-5 bg-opacity-60 min-h-screen`}>
                    
                    {/* Cards */}
                    <div>
                        <h1 className='font-bold text-4xl text-center text-[#8294C4] my-[2%]'>Status of Contacts</h1>
                        <div className='flex flex-wrap justify-center text-white'>
                            <Card name='Total' color='#7286D3' count={totalContacts} onClick={()=>{ 
                                setShowFilter(false);
                                setFilterParam('')
                            }} />

                            <Card name='Called/Accepted' color='#95BDFF' count={statusResponseData['calledAccepted']} onClick={()=>{ 
                                setShowFilter(true);
                                setFilterParam('calledAccepted')
                            }} />
                            
                            <Card name='Called/Postponed' color='#7286D3' count={statusResponseData['calledPostponed']} onClick={()=>{ 
                                setShowFilter(true);
                                setFilterParam('calledPostponed')
                            }} />

                            <Card name='Called/Declined' color='#95BDFF' count={statusResponseData['calledDeclined']} onClick={()=>{ 
                                setShowFilter(true);
                                setFilterParam('calledDeclined')
                            }} />
                            
                            <Card name='Called/NotReachable' color='#E97777' count={statusResponseData['calledNotReachable']} onClick={()=>{ 
                                setShowFilter(true);
                                setFilterParam('calledNotReachable')
                            }} />

                            <Card name='Not Called' color='#7286D3' count={statusResponseData['notCalled']} onClick={()=>{ 
                                setShowFilter(true);
                                setFilterParam('notCalled')
                            }}/>

                            <Card name='Emailed/Accepted' color='#95BDFF' count={statusResponseData['emailedAccepted']} onClick={()=>{ 
                                setShowFilter(true);
                                setFilterParam('emailedAccepted')
                            }} />
                            
                            <Card name='Emailed/AwaitingResponse' color='#7286D3' count={statusResponseData['emailedAwaitingResponse']} onClick={()=>{ 
                                setShowFilter(true);
                                setFilterParam('emailedAwaitingResponse')
                            }} />
                            <Card name='Emailed/Declined' color='#95BDFF' count={statusResponseData['emailedDeclined']} onClick={()=>{ 
                                setShowFilter(true);
                                setFilterParam('emailedDeclined')
                            }} />
                            
                            <Card name='Blacklisted' color='#E97777' count={statusResponseData['blacklisted']} onClick={()=>{ 
                                setShowFilter(true);
                                setFilterParam('blacklisted')
                            }} />
                            
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className='flex justify-center my-[2%] '>
                        {/* <button className='bg-color2 bg-opacity-90 text-white hover:scale-95 hover:bg-white hover:bg-opacity-10 focus:outine-none font-medium text-sm rounded-2xl px-5 py-2.5 text-center mr-5'
                        onClick={()=>setShowModal(true)}>
                            Add Contact
                        </button> */}
                        <form className=' ml-5 w-[90%] relative rounded-full overflow-hidden border-2 border-white'>
                            <div className=' px-[3%] py-[0.5%] flex items-center justify-center bg-[#8294C4]'>
                                <i class="fa-solid fa-magnifying-glass fa-beat px-2 ml-2 text-xl"></i>
                                <input type='search' placeholder='Type Here...' className='bg-color2 bg-opacity-5 placeholder-[#000000] w-full px-4 rounded-full appearance-none focus:outline-none border-none '
                                onChange={handleSearchChange} value={searchParam} />
                                <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md  p-1 rounded-full bg-color2 bg-opacity-5'>
                                <input
                                type='checkbox'
                                className='sr-only'
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                />
                                <span
                                className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                                    !isChecked ? ' rounded-md bg-white bg-opacity-60' : 'bg-[#]'
                                }`}
                                // False- BY Name
                                >
                                Name
                                </span>
                                <span
                                className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                                    isChecked ? 'rounded-md bg-white bg-opacity-60' : 'bg-[#]'
                                }`}
                                // True- BY Number

                                >
                                Number
                                </span>
                                </label>
                            </div>
                        </form>
                    </div>
                    
                    {/* Table */}
                    <div className='flex justify-between justify-items-center  justify-self-center items-baseline mx-[1%] my-[2%]'>
                        <h1 className='text-3xl font-bold text-[#8294C4]'>Your Contacts</h1>
                        <button onClick={()=>setShowModal(true)} title="Add Contact"
                            className=" z-90 bg-[#8294C4] px-[2%] py-[1%] rounded-md drop-shadow-lg text-white text-thin hover:bg-white hover:text-[#000000] duration-150 cursor-pointer">+

                        </button>
                    </div>
                    <div className='overflow-auto rounded-lg shadow'>
                        <table className='cursor-pointer w-full'>
                            <thead className='bg-[#8EA7E9]'>
                                <tr className='text-white text-lg font-semibold'>
                                    <th className='p-3 tracking-wide text-left'>Name</th>
                                    <th className='p-3 tracking-wide text-left'>Company</th>
                                    <th className='p-3 tracking-wide text-left'>Mobile</th>
                                    <th className='p-3 tracking-wide text-left'>Status</th>
                                    <th className='p-3 tracking-wide text-left'>POC</th>
                                    <th className='p-3 tracking-wide text-left'>Actions</th>
                                </tr>
                            </thead>
                           
                            <tbody className='divide-y divide'>
                                {/* <tr className='rounded'>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '>Shreya</td>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '>SVCE</td>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '>7418732846</td>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '><span className='p-1.5 text-xs font-medium tracking-wide bg-[#A9A9A9] rounded-lg bg-opacity-30'>Not Reachable</span></td>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '>Ramanathan</td>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '><i className="fa-solid fa-pen-to-square mr-4 hover:text-[#D22B2B]"></i><i className="fa-sharp fa-solid fa-trash hover:text-[#D22B2B]"></i></td>
                                </tr> */}
                                {content}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAB */}
                <button onClick={()=>setShowModal(true)} title="Add Contact"
                className="fixed z-90 bg-[#000000] px-[2%] py-[1%] rounded-md drop-shadow-lg flex justify-center items-center text-white text-thin hover:bg-[#DBDFEA] hover:drop-shadow-2xl">+</button>
    

                {/* Modal  */}
                <Modal isVisible={showModal} onClose={()=>{setShowModal(false)}}>
                    <ContactForm currentUserID = {currentUserID} onClose={()=>{setShowModal(false)}}/>
                </Modal>
                <Modal isVisible={showUpdateModal} onClose={()=>{setShowUpdateModal(false)}}>
                    <UpdateContactForm currentUserID = {currentUserID} onClose={()=>{setShowUpdateModal(false)}}/>
                </Modal>
                <Modal isVisible={showDeleteModal} onClose={()=>{setShowDeleteModal(false)}}>
                    <DeleteContactForm currentUserID = {currentUserID} onClose={()=>{setShowDeleteModal(false)}}/>
                </Modal>
            </Fragment>
        </>
    )
}
export default DirectorsDashboard
