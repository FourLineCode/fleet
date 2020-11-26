import clsx from 'clsx'
import React from 'react'

type Props = {
	type?: 'button' | 'submit' | 'reset'
	className?: string
	onClick?: () => void
	children: React.ReactNode
}

const Button = ({ type, onClick, children, className }: Props) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className={clsx(
				className,
				'px-4 py-2 font-semibold text-white transition duration-300 bg-green-500 rounded-lg focus:outline-none hover:bg-green-400'
			)}>
			{children}
		</button>
	)
}

export default Button
