import React from 'react'

const Photo = () => {
  return (
    <div className="flex px-4 py-4 rounded border-1 border-grey-200 mt-2 gap-2">
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
            stroke="#AFB1B6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
            stroke="#AFB1B6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-grey-600 text-xl-3 font-inter">
          Click to upload from computer or drop your file here
        </p>
        <p className="text-grey-800 text-xl-2 font-inter">
          Supported files: jpg, png not bigger than 2MB
        </p>
      </div>
    </div>
  )
}

export default Photo