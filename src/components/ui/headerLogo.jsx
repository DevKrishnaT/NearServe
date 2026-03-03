import React from 'react'
import useTheme from '../../Context/Theme/ThemeContext';

const HeaderLogo = () => {
  const theme = useTheme((state) => (state.theme));
  return (
    <div className=''>
      <div className="flex">
        <p className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-[#1c3b79]" }`}>Near</p><p  className={`text-4xl font-bold text-[#296dda]`}>Serve</p>
      </div>
    </div>
  )
}

export default HeaderLogo;