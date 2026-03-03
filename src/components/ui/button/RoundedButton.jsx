import React from 'react'

const RoundedButton = ({buttonText}) => {
  return (
    <div>
        <button className='bg-[#296dda] border rounded-4xl h-10 w-40  text-white drop-shadow-xl  border-white'>{buttonText}</button>
    </div>
  )
}

export default RoundedButton