import clsx from 'clsx'
import React from 'react'

interface Props {
	type?: 'button' | 'submit' | 'reset'
	variant?: 'filled' | 'outlined'
	disabled?: boolean
	className?: string
	onClick?: (arg?: any) => void
	children: React.ReactNode
}

const VariantStyles: Record<string, string> = {
	filled: 'bg-green-500 hover:bg-green-600 hover:border-transparent',
	outlined: 'bg-transparent hover:bg-green-500 hover:bg-opacity-30',
}

const Button = ({ type, variant = 'filled', disabled = false, onClick, children, className }: Props) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={clsx(
				className,
				VariantStyles[variant],
				disabled
					? 'cursor-not-allowed border-gray-600 text-gray-500 bg-transparent'
					: 'border-green-500 text-white',
				'px-4 py-2 font-semibold rounded-full focus:outline-none focus:ring-4 ring-green-700 ring-opacity-50 border-2 '
			)}
		>
			{children}
		</button>
	)
}

export default Button
