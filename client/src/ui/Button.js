import React from 'react'

const Button = ({ type, children }) => {
	return (
		<button
			type={type}
			className='px-4 py-2 font-semibold text-white transition duration-300 bg-green-500 rounded focus:outline-none hover:bg-green-400'>
			{children}
		</button>
	)
}

export default Button
