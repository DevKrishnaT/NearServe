import React from 'react'
import useTheme from '../../../../Context/Theme/ThemeContext'


const ListedServiceMain = () => {
    const theme = useTheme((state) => (state.theme));
    const isdark = theme == "dark";
  
  return (
    <div className={`gride grid-cols-1`}>
        

    </div>
  )
}

export default ListedServiceMain