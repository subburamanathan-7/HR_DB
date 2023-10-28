import React from 'react'

function Card({name,color,count,onClick}) {

  const handleClick = ()=>{
    onClick()
  }
  return (
    <>
        <div className='flex flex-col text-[#000000] bg-[#8EA7E9] rounded-lg shadow-md w-full m-3 overflow-hidden sm:w-52'>
            <h2 className='text-center px-2 pb-5 mt-2'>{name}</h2>
            <button className='text-sm text-white p-3 text-center mb-0' style={{backgroundColor:color}} onClick={handleClick}>{count}</button>
        </div>
    </>
  )
}

export default Card