import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

interface Props {
	header: string
	desc?: string
	action: (arg?: any) => void
	visible: boolean
	setVisible: Dispatch<SetStateAction<boolean>>
}

const ConfirmModal = ({ header, desc, action, visible, setVisible }: Props) => {
	const ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (visible) {
			setTimeout(() => {
				ref.current?.focus()
			}, 50)
		}
	}, [visible])

	return (
		<Modal
			visible={visible}
			setVisible={setVisible}
			position='top'
			className='w-full h-40 p-4 bg-gray-800 rounded-lg shadow-lg md:w-1/5'
		>
			<div className='text-2xl font-bold text-center text-white'>{header}</div>
			<div className='text-sm text-center text-gray-400'>{desc}</div>
			<div className='flex items-center justify-around my-2'>
				<Button onClick={() => setVisible(false)} variant='outlined'>
					Cancel
				</Button>
				<Button ref={ref} onClick={action} variant='danger' danger>
					Confirm
				</Button>
			</div>
		</Modal>
	)
}

export default ConfirmModal
