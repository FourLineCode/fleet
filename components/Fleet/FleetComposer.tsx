import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react'
import axios from 'axios'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setError, setSuccess } from '../../store/actions/notificationActions'
import Button from '../../ui/components/Button'
import TextArea from '../../ui/components/TextArea'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'

interface Props {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const FleetComposer = ({ isOpen, onOpen, onClose }: Props) => {
	const queryClient = useQueryClient()
	const dispatch = useDispatch()
	const { pathname } = useRouter()
	const [body, setBody] = useState('')
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const composeFleet = async () => {
		try {
			await axios.post(`${BASE_URL}/fleet`, { body: body })
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { mutate, isLoading } = useMutation(composeFleet, {
		onMutate: () => {
			onClose()
			setBody('')
		},
		onSuccess: () => {
			dispatch(setSuccess('Fleet sent'))
			if (pathname.startsWith('/home')) {
				queryClient.refetchQueries(queryTypes.FLEETS)
			} else if (pathname.startsWith('/profile')) {
				queryClient.refetchQueries(queryTypes.PROFILE_FLEETS)
			}
		},
	})

	const onSubmit = () => {
		if (body === '') {
			dispatch(setError('Fleet cannot be empty'))
		}
		if (body !== '' && !isLoading) {
			mutate()
		}
	}

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBody(e.target.value)
	}

	const onEnterPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && e.shiftKey === false) {
			e.preventDefault()
			onSubmit()
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='xl' initialFocusRef={inputRef}>
			<ModalOverlay />
			<ModalContent>
				<div className='text-white rounded-sm bg-dark-800'>
					<ModalHeader>Send a Fleet</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<TextArea
							value={body}
							onChange={onChange}
							onKeyDown={onEnterPress}
							label='Fleet'
							name='body'
							ref={inputRef}
							className='h-24 text-white transition duration-150 bg-dark-800 focus:bg-dark-700'
						/>
					</ModalBody>

					<ModalFooter>
						<div className='flex items-center justify-between w-full'>
							<span className={clsx(body.length > 240 ? 'text-red-600' : 'text-white')}>
								{body.length}/240
							</span>
							<Button variant='filled' onClick={onSubmit}>
								Send Fleet
							</Button>
						</div>
					</ModalFooter>
				</div>
			</ModalContent>
		</Modal>
	)
}

export default FleetComposer
