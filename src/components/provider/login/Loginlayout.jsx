import React, { useState } from 'react'
import useTheme from '../../../Context/Theme/ThemeContext'
import MainButton from '../../ui/button/mainButton';
import ToggleButton from '../../ui/toggleButton';
import HeaderLogo from '../../ui/headerLogo';

const Loginlayout = () => {
    const theme = useTheme((state) => state.theme);
    
 

    const isDark = theme === "dark";
  return (
    <div className={`w-full h-full lg:w-100 lg:h-min  lg:rounded-2xl ${isDark ? "bg-[#1E293B]" : "bg-[#F8FAFC]"} flex flex-col justify-center  gap-2 px-6 py-12  relative` }>
        <ToggleButton />
        <div className='w-full flex justify-center'><HeaderLogo /></div>
        <div className={`${isDark ? "text-white" : "text-black"} flex justify-center text-2xl font-bold `}>Welecome Heros!</div>
       <div className={`${isDark ? "text-white" : "text-black"} flex flex-col gap-1`}>
        phoneNo
         <div className={`p-2 px-4 rounded-xl border `}>
            <input type="tel" className='focus:outline-0' placeholder='Enter your PhoneNumber'/>
        </div>
       </div>

       <div><MainButton /></div>
    </div>
  )
}

export default Loginlayout