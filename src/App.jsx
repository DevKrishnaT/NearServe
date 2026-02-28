import React from 'react'
import Header from './Components/header/Header';
import useTheme from './Context/Theme/ThemeContext';


const App = () => {
   const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  return (
    <div className={`${theme == "dark" ? "bg-[#0F172A]" : "bg-white"} h-full`}>
      <Header/>
    
    </div>
  )
}

export default App;