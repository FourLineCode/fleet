import React from 'react'
import { Link } from 'react-router-dom'

const MenuLink = ({ type, to, children, onClick }) => {
	const classes = `flex items-center px-10 py-1 rounded-full text-white font-bold text-2xl transition duration-300 hover:bg-green-700 hover:bg-opacity-25 hover:text-green-400`

	if (type === 'route') {
		return (
			<Link className={classes} to={to}>
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
				onClick={onClick}>
				{children}
			</button>
		)
	}
}

export default MenuLink
