import clsx from 'clsx'
import React from 'react'

type Props = {
	className?: string
	onClick: () => void
	children: React.ReactNode
}

const IconButton = ({ className, onClick, children }: Props) => {
	return (
		<button
			className={clsx(
				className,
				'p-1 focus:outline-none transition duration-150'
			)}
			onClick={onClick}>
			{children}
		</button>
	)
}

export default IconButton