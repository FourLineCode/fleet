import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
	type: 'route' | 'site' | 'button'
	to?: string
	active?: boolean
	onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void
	children: React.ReactNode
}

const MenuLink = ({ type, to, active = false, children, onClick }: Props) => {
	const classes = `${
		active ? 'text-green-400' : 'text-white'
	} flex items-center px-10 py-1 rounded-full font-bold text-2xl transition duration-300 hover:bg-green-700 hover:bg-opacity-25 hover:text-green-400`

	if (type === 'route') {
		return (
			<Link className={classes} to={to as string}>
				{children}
			</Link>
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
				className={`px-10 py-1 rounded-full text-white font-bold text-2xl transition duration-300 hover:bg-green-400 bg-green-500 focus:outline-none`}
				// @ts-ignore: This function will be passed trust me
				onClick={onClick}>
				{children}
			</button>
		)
	} else return <></>
}

export default MenuLink
