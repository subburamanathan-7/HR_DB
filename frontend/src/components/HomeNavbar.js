import React from 'react'
import { useNavigate } from "react-router-dom"

const forese = require('../forese.png')
function Test() {
    const navigate = useNavigate()
    return (
        <>
            <div className='font - [Poppins] bg-[#8EA7E9] min-h-screen'>
                <header className='bg-[#DBDFEA]'>
                    <nav className='flex justify-between items-center w-[92%] mx-auto py-2'>
                        <div>
                            <img 
                            className='w-16'
                            alt='logo'
                            src={forese} />
                        </div>
                        <div>
                            <ul className=' text-lg flex items-center gap-[4vw]'>
                                <li>
                                    <a href='/'>HR Pitch</a>
                                </li>
                                <li>
                                    <a  href='/'>About</a>
                                </li>
                                <li>
                                    <a  href='/'>Contact</a>
                                </li>
                            </ul>
                        </div>
                        {/* <div>
                            <button className='bg-[#87acec] text-white px-5 py-2 rounded-full hover:bg-[#a6c1ee]' onClick={()=>navigate('/login')}>Sign In</button>
                        </div> */}
                    </nav>
                </header>
                <div>
                    <div className='mx-[23%] my-[18%] max-w-2xl min-w-screen '>
                        <p className='text-2xl font-base text-justify '>Mock placements is a flagship event organized by FORESE. Each year we have an attendance over 100 HRs and other technical personel from several companies who are invited to examine the technical strength of about 800+ pre final year students.</p>
                        <div className='text-center mt-[3%]'>
                            <button className='bg-[#ACB1D6] text-xl font-semibold text-white px-[5%] py-2 rounded-full hover:bg-[#DBDFEA] hover:text-[#000000] hover:z-90 duration-150' onClick={()=>navigate('/login')}>
                                Sign In</button>
                        </div>
                    </div>
                    {/* Footer */}
                    <div class=" fixed bottom-0 w-full">
                        <div class="max-w-2xl mx-auto text-white py-2">
                            <div class=" flex flex-col md:flex-row md:justify-center items-center text-lg">
                                <p class="order-2 md:order-1 mt-8 md:mt-0">Designed & Developed by <span className='underline cursor-pointer'>FORESE - TECH</span></p>
                                {/* <div class="order-1 md:order-2">
                                    <span class="px-2">About us</span>
                                    <span class="px-2 border-l">Contact us</span>
                                    <span class="px-2 border-l">Privacy Policy</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </>
    )
}

export default Test