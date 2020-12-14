import clsx from 'clsx'
import React from 'react'

interface Props {
	type?: 'button' | 'submit' | 'reset'
	variant?: 'filled' | 'outlined'
	className?: string
	onClick?: (arg?: any) => void
	children: React.ReactNode
}

const VariantStyles: Record<string, string> = {
	filled: 'bg-green-500 hover:bg-green-600 hover:border-transparent',
	outlined: 'bg-transparent hover:bg-green-500 hover:bg-opacity-30',
}

const Button = ({ type, variant = 'filled', onClick, children, className }: Props) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className={clsx(
				className,
				VariantStyles[variant],
				'px-4 py-2 font-semibold text-white transition duration-300 rounded-lg focus:outline-none border-2 border-green-500'
			)}>
			{children}
		</button>
	)
}

export default Button
