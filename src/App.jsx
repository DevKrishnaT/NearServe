import React from 'react'
import Header from './Components/header/Header';
import useTheme from './Context/Theme/ThemeContext';
import Menu from './Components/menu/menu';

const App = () => {
   const theme = useTheme((state) => state.theme);
  const toggle = useTheme((state) => state.toggle);
  return (
    <div className={`${theme == "dark" ? "bg-[0F172A]" : "bg-white"} h-full`}>
      <Header/>
      <Menu/>
    </div>
  )
}

export default App;