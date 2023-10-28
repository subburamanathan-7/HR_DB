import React, { Fragment, useState,useEffect } from 'react'
import{useQuery, useQueryClient} from '@tanstack/react-query'
import { useNavigate } from "react-router-dom"


import DashNavbar from '../components/DashNavbar'
import Card from '../components/Card'
import Modal from '../components/Modal'
import ContactForm from '../components/ContactForm'
import {Spinner} from '../components/Spinner'

import {listContacts} from '../features/contacts/ContactServices'
import UpdateContactForm from '../components/UpdateContactForm'
// import UpdateModal from '../components/UpdateModal'
import DeleteContactForm from '../components/DeleteContactForm'
import SearchNotFound from '../components/SearchNotFound'

function MainDashboard() {
    const navigate = useNavigate()

    useEffect(()=>{
        if(!sessionStorage.getItem('user')){
          navigate('/login')
        //   setResponseData(null)
        }
      },[]);
    
   
    let content=""
    let filteredData
    let totalContacts
    let color

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
    
    const queryClient = useQueryClient()
    const [showModal,setShowModal] = useState(false)
    const [showUpdateModal,setShowUpdateModal] = useState(false)
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    let [showSearchNotFound,setShowSearchNotFound] = useState(false)


    const [showFilter,setShowFilter] = useState(false)
    const [filterParam,setFilterParam]=useState('')
    const [searchParam, setSearchParam] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [currentUserID,setCurrentUserID] = useState(null)
    const [currentHeight, setCurrentHeight] = useState('')
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

    
    //List Contacts
    const listContactMutation= useQuery({
        queryKey:['contacts'],
        queryFn: ()=>{
        // Object.keys(responseData).forEach(v => responseData[v] = 0)
        return listContacts(sessionStorage.getItem('user'))
        },
    })     
    // const show404 = ()=>{
    //     setShowSearchNotFound(true)
    // }
    // useEffect(()=>{
    //     show404()
    //     setSearchParam(' ')      
    // })
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
        filteredData.reverse()

       
        
        content= filteredData.map((contact)=>{
            
            return(
                <tr className={`text-[#000000] text-lg rounded-md ${contact.status==='blacklisted'?'bg-[#E97777] hover:border-[#DBDFEA] hover:border-x-4 duration-150':'bg-[] hover:border-[#8294C4] hover:border-x-4 duration-150'}`}>
                
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '>{contact.name}</td>
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '>{contact.company}</td>
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '>{contact.contactNumber}</td>
                    <td className='p-3 font-base tracking-wide text-left whitespace-nowrap '><span className={`p-1.5 text-xs font-medium tracking-wide rounded-lg ${contact.status==='blacklisted'?'bg-[#DBDFEA] text-[#00000]':'bg-[#8EA7E9] text-white'}`}>{statusMap[contact.status]}</span></td>
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
                <div id = 'home-screen' className={`p-5 bg-opacity-60 min-h-screen`}>
                    
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
                        <table className='cursor-default w-full'>
                            <thead className='bg-[#8EA7E9]'>
                                <tr className='text-white text-lg font-semibold'>
                                    <th className='p-3 tracking-wide text-left'>Name</th>
                                    <th className='p-3 tracking-wide text-left'>Company</th>
                                    <th className='p-3 tracking-wide text-left'>Mobile</th>
                                    <th className='p-3 tracking-wide text-left'>Status</th>
                                    <th className='p-3 tracking-wide text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide'>
                                {/* <tr className='bg-[#FFF8DC]'>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '>Shreya</td>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '>SVCE</td>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '>7418732846</td>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '><span className='p-1.5 text-xs font-medium tracking-wide bg-white rounded-lg bg-opacity-30'>Not Reachable</span></td>
                                    <td className='p-3 text-sm tracking-wide text-left whitespace-nowrap '><i className="fa-solid fa-pen-to-square mr-4 hover:text-[#D22B2B]"></i><i className="fa-sharp fa-solid fa-trash hover:text-[#D22B2B]"></i></td>
                                </tr> */}
                                {content}
                            </tbody>
                        </table>
                    </div>
                </div>

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
                <Modal isVisible={showSearchNotFound} onClose={()=>{setShowSearchNotFound(false)}}>
                    <SearchNotFound onClose={()=>{setShowSearchNotFound(false)}}/>
                </Modal>
                {/* <UpdateModal isVisible={showUpdateModal} onClose={()=>{setShowUpdateModal(false)}} currentUserID = {currentUserID}  /> */}
            </Fragment>
        </>
    )
}
export default MainDashboard


