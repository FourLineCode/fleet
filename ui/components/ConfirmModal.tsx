import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import Button from './Button'

interface Props {
	header: string
	desc?: string
	action: (arg?: any) => void
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const ConfirmModal = ({ header, desc, action, isOpen, onOpen, onClose }: Props) => {
	const ref = useRef<HTMLButtonElement>(null)

	return (
		<Modal onClose={onClose} isOpen={isOpen} initialFocusRef={ref} size='xs' isCentered>
			<ModalOverlay />
			<ModalContent>
				<div className='text-white rounded-sm bg-dark-800'>
					<ModalHeader>
						<div className='font-bold'>{header}</div>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className='text-center'>{desc}</div>
					</ModalBody>
					<ModalFooter>
						<div className='flex items-center justify-around w-full my-2'>
							<Button onClick={onClose} variant='outlined'>
								Cancel
							</Button>
							<Button ref={ref} onClick={action} variant='danger' danger>
								Confirm
							</Button>
						</div>
					</ModalFooter>
				</div>
			</ModalContent>
		</Modal>
	)
}

export default ConfirmModal
