import React from 'react'
import useTheme from '../../Context/Theme/ThemeContext'

const ToggleButton = ({toggle , className}) => {
    const theme = useTheme((state) => (state.theme));
  return (
    <div className={`absolute top-2 left-2 drop-shadow-md  ${className}`} onClick={toggle}>
        <div
          className={`h-10 w-10  rounded-3xl flex items-center justify-center  ${theme == "dark" ? "bg-[#FFFFFF] text-[#0F172A]" : "bg-[#0F172A] text-[#F1F5F9]"} `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
      </div>
  )
}

export default ToggleButton