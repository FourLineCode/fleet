import clsx from 'clsx'
import React from 'react'

interface Props {
	label: string
	placeholder: string
	value?: string
	name: string
	className?: string
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
	({ label, placeholder, value, name, onChange, onKeyDown, className }, ref) => {
		return (
			<>
				<label htmlFor={name} className='pl-1 text-black dark:text-white'>
					{label}
				</label>
				<textarea
					placeholder={placeholder}
					onChange={onChange}
					onKeyDown={onKeyDown}
					value={value}
					name={name}
					ref={ref}
					autoComplete='off'
					className={clsx(
						className,
						'w-full resize-none px-2 py-2 border-4 border-brand-300 dark:border-brand-200 rounded-lg focus:border-brand-500 dark:focus:border-brand-500 focus:outline-none'
					)}
				/>
			</>
		)
	}
)
