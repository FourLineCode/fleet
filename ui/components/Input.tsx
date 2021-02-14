import clsx from 'clsx'
import React from 'react'

interface Props {
	label: string
	placeholder: string
	type: string
	name: string
	className?: string
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ label, placeholder, type, name, className }, ref) => {
	return (
		<>
			<label htmlFor={name} className='pl-1 text-black dark:text-white'>
				{label}
			</label>
			<input
				placeholder={placeholder}
				type={type}
				name={name}
				ref={ref}
				autoComplete='off'
				className={clsx(
					className,
					'w-full px-2 py-2 border-4 border-brand-300 dark:border-brand-200 rounded-lg dark:focus:border-brand-500 focus:border-brand-500 focus:outline-none'
				)}
			/>
		</>
	)
})

export default Input
