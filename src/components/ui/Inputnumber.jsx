import React from 'react'
import useTheme from '../../Context/Theme/ThemeContext'

const Inputnumber = ({numPlaceholder}) => {
    const theme = useTheme((state) => (state.theme));
  return (
    <div className={`h-12 border rounded-2xl ${theme == "dark" ? "border-[#E2E8F0] text-[#F1F5F9] " : "border-[#334155] text-[#0F172A]"}`}>
        <input type="number" className='w-full h-full bg-transparent focus:outline-0 px-2 '  placeholder={numPlaceholder}/>
    </div>
  )
}

export default Inputnumber;