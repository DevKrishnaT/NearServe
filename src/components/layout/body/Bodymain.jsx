import React from 'react'
import ServicesSection from './seactionServices/ServicesSection'
import ListedServiceMain from './ListedServicess/ListedServiceMain'
import useTheme from '../../../Context/Theme/ThemeContext'

const Bodymain = () => {
    const theme = useTheme((state) => (state.theme));
    const isdark = theme == "dark";
  return (
    <div className={`${isdark ? "bg-[#0F172A]" : "bg-[#FFFFFF]"} h-full`}>
        <ServicesSection />
        <ListedServiceMain />
    </div>
  )
}

export default Bodymain