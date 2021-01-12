import clsx from 'clsx'
import React from 'react'

interface Props {
	className?: string
	onClick: () => void
	children: React.ReactNode
}

const IconButton = ({ className, onClick, children }: Props) => {
	return (
		<button className={clsx(className, 'p-1 focus:outline-none')} onClick={onClick}>
			{children}
		</button>
	)
}

export default IconButton
