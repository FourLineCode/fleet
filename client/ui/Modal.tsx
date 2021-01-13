import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

interface Props {
	visible: boolean
	setVisible: (arg: any) => void
	className?: string
	position: 'top' | 'center'
	children: React.ReactNode
}

const POSITIONS: Record<string, string> = {
	top: 'top-20',
	center: 'my-auto top-0 bottom-0',
}

const Modal = ({ visible, setVisible, className, position, children }: Props) => {
	const ref = useRef<HTMLDivElement>(null)

	const handleClick = (e: MouseEvent) => {
		if (ref.current?.contains(e.target as Node)) {
			return
		}

		setVisible(false)
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [])

	return (
		<div
			className={clsx(
				!visible && 'invisible',
				'fixed top-0 left-0 bg-opacity-10 bg-white w-screen h-screen z-50'
			)}>
			<div
				ref={ref}
				className={clsx(className, 'absolute overflow-hidden left-0 right-0 mx-auto', POSITIONS[position])}>
				{children}
			</div>
		</div>
	)
}

export default Modal
