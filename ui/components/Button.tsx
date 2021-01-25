import clsx from 'clsx'
import React from 'react'

interface Props {
	type?: 'button' | 'submit' | 'reset'
	variant?: 'filled' | 'outlined' | 'danger'
	disabled?: boolean
	className?: string
	onClick?: (arg?: any) => void
	children: React.ReactNode
	danger?: boolean
}

const VariantStyles: Record<string, string> = {
	filled: 'bg-green-500 hover:bg-green-600 hover:border-transparent',
	outlined: 'bg-transparent hover:bg-green-500 hover:bg-opacity-30',
	danger: 'bg-red-500 hover:bg-red-600 hover:border-transparent',
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
	({ type, variant = 'filled', disabled = false, onClick, danger = false, children, className }, ref) => {
		return (
			<button
				ref={ref}
				disabled={disabled}
				onClick={onClick}
				type={type}
				className={clsx(
					className,
					VariantStyles[variant],
					disabled
						? 'cursor-not-allowed border-gray-600 text-gray-500 bg-transparent'
						: danger
						? 'border-red-500 text-white ring-red-700'
						: 'border-green-500 text-white ring-green-700',
					'px-4 py-2 font-semibold rounded-lg focus:outline-none focus:ring-4 ring-opacity-50 border-2 '
				)}
			>
				{children}
			</button>
		)
	}
)

export default Button
