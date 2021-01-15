import { Transition } from '@headlessui/react'
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
	center: 'top-72',
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
			)}
		>
			<Transition
				show={visible}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<div
					ref={ref}
					className={clsx(
						className,
						'absolute overflow-hidden left-1/2 transform -translate-x-1/2',
						POSITIONS[position]
					)}
				>
					{children}
				</div>
			</Transition>
		</div>
	)
}

export default Modal
