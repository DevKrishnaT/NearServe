import React from 'react'
import useTheme from '../../../../Context/Theme/ThemeContext'
import Inputbox from '../../../ui/Inputbox';
import MainButton from '../../../ui/button/mainButton';

const HeroCard = () => {
    const theme = useTheme((state) => (state.theme));
    const isDark = theme === "dark";
  return (
    <div className='px-6 py-6 flex flex-col gap-3'>
        <div className="flex flex-col gap-6 text-left">
          <h1
            className={`text-4xl font-bold leading-tight ${
              isDark ? "text-[#F1F5F9]" : "text-[#0F172A]"
            }`}
          >
            Find Trusted <span className="text-[#296dda]">Local Services</span>{" "}
            <span className="whitespace-nowrap">Near You</span>
          </h1>

          <p
            className={`text-lg sm:text-xl lg:text-2xl leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Book verified professionals in{" "}
            <span className="text-[#296dda] font-medium">minutes</span>, from
            home repairs to tutoring — all around your{" "}
            <span className="text-[#296dda] font-medium">neighborhood.</span>
          </p>

          
        </div>
        <Inputbox placeholderText={"search For service"}/>
        <MainButton />
    </div>
  )
}

export default HeroCard