import React from 'react'
import clsx from 'clsx'

const TextArea = ({ label, value, name, onChange, className }) => {
	return (
		<>
			<label htmlFor={name} className='pl-1 text-white'>
				{label}
			</label>
			<textarea
				onChange={onChange}
				value={value}
				name={name}
				autoComplete='off'
				className={clsx(
					className,
					'w-full resize-none px-2 py-2 transition duration-150 border-b-4 border-green-300 rounded-lg focus:border-green-500 focus:outline-none'
				)}
			/>
		</>
	)
}

export default TextArea
