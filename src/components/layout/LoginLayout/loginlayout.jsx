import React from 'react'
import HeaderLogo from '../../ui/headerLogo'
import Inputnumber from '../../ui/Inputnumber'
import MainButton from '../../ui/button/mainButton'
import useTheme from '../../../Context/Theme/ThemeContext'

const Loginlayout = () => {
    const theme = useTheme((state) => (state.theme));
  return (
    <div className="flex flex-col gap-4 py-10">
     <div className="top flex flex-col w-full items-center gap-2">
        <div>
            <HeaderLogo />
        </div>
        <div className="flex flex-col items-center">
            <h1
          className={`${theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"} text-xl font-bold `}
        >
          Start Finding Services
        </h1>
        <p
          className={`capitalize ${theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"}`}
        >
          Login / Singup
        </p>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <Inputnumber numPlaceholder={"Enter Your Number"} />
        <MainButton/>
      </div>
      
    </div>
  )
}

export default Loginlayout;