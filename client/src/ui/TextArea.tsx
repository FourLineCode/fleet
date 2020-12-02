import clsx from 'clsx'
import React from 'react'

type Props = {
	label: string
	value?: string
	name: string
	className?: string
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({ label, value, name, onChange, className }: Props) => {
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
					'w-full resize-none px-2 py-2 transition duration-150 border-4 border-green-200 rounded-lg focus:border-green-500 focus:outline-none'
				)}
			/>
		</>
	)
}

export default TextArea
