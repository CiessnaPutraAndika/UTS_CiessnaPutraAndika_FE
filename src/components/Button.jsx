import React from 'react'

export const Button = (props) => {
    const { children = "...", variant="black", onClick }=props;
  return (
    <button className={`bg-blue-700 hover:bg-blue-400 ease-in-out duration-75 font-semibold ${variant} rounded-md text-white p-2 px-4`} onClick={onClick} type='button'>
        {children}
    </button>
  )
}
