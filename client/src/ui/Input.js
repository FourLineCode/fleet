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
				className='w-full px-2 py-2 rounded focus:outline-none'
			/>
		</>
	)
}

export default Input
