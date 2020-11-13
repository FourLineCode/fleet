import React from 'react'
import clsx from 'clsx'

const IconButton = ({ className, onClick, children }) => {
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
