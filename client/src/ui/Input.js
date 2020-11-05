import React from 'react'

const Input = ({ label, type, name }) => {
	return (
		<>
			<label htmlFor={name} className='text-white'>
				{label}
			</label>
			<input
				type={type}
				name={name}
				autoComplete='off'
				className='w-full px-2 py-2 border-b-4 border-green-400 rounded-lg focus:outline-none'
			/>
			{/* <div className='w-full h-1 bg-green-400'></div> */}
		</>
	)
}

export default Input
