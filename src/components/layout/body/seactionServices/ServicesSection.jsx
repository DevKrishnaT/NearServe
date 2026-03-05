import React from 'react'
import useTheme from '../../../../Context/Theme/ThemeContext'

const ServicesSection = () => {
    const theme = useTheme((state) => (state.theme));

  return (
    <div>
    <div className='grid '></div>    
    </div>
  )
}

export default ServicesSection