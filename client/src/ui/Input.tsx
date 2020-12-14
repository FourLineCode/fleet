import clsx from 'clsx'
import React from 'react'

interface Props {
	label: string
	type: string
	name: string
	className?: string
}

const Input = ({ label, type, name, className }: Props) => {
	return (
		<>
			<label htmlFor={name} className='pl-1 text-white'>
				{label}
			</label>
			<input
				type={type}
				name={name}
				autoComplete='off'
				className={clsx(
					className,
					'w-full px-2 py-2 transition duration-150 border-4 border-green-200 rounded-lg focus:border-green-500 focus:outline-none'
				)}
			/>
		</>
	)
}

export default Input
