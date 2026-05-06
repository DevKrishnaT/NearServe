import React from 'react'
import useTheme from '../../../Context/Theme/ThemeContext'

const ServicePage = (items) => {
    const theme = useTheme((state) => state.theme)
    const isDark = theme === "dark";
  return (
    <div className={`relative h-200 w-80 ${ isDark ? "bg-[#0F172A] text-white" : "bg-white text-black"}`}>
        <img src={items.img} alt="" />
    </div>
  )
}

export default ServicePage;