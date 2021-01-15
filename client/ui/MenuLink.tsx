import Link from 'next/link'
import React from 'react'

interface Props {
	type: 'route' | 'site' | 'button'
	to?: string
	active?: boolean
	onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void
	children: React.ReactNode
}

const MenuLink = ({ type, to, active = false, children, onClick }: Props) => {
	const classes = `${
		active ? 'text-green-400' : 'text-white'
	} px-10 py-1 rounded-lg font-bold text-2xl hover:bg-green-700 hover:bg-opacity-25 hover:text-green-400`

	if (type === 'route') {
		return (
			<div className={classes}>
				<Link href={to as string}>{children}</Link>
			</div>
		)
	} else if (type === 'site') {
		return (
			<a className={classes} href={to} target='_blank'>
				{children}
			</a>
		)
	} else if (type === 'button') {
		return (
			<button
				className={`px-10 py-1 rounded-lg focus:ring-4 ring-green-700 ring-opacity-50 text-white font-bold text-2xl hover:bg-green-600 bg-green-500 focus:outline-none`}
				// @ts-ignore: This function will be passed trust me
				onClick={onClick}
			>
				{children}
			</button>
		)
	} else return <></>
}

export default MenuLink
