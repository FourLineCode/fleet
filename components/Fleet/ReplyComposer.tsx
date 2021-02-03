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
import FleetPreview from './FleetPreview'
import { FleetType } from './Timeline'

interface Props {
	fleet: FleetType
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const ReplyComposer = ({ fleet, isOpen, onOpen, onClose }: Props) => {
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const { pathname } = useRouter()
	const [body, setBody] = useState('')
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const composeReply = async () => {
		try {
			const res = await axios.post(`${BASE_URL}/fleet/reply/${fleet.id}`, { body: body })

			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { mutate, isLoading } = useMutation(composeReply, {
		onMutate: () => {
			onClose()
			setBody('')
		},
		onSuccess: () => {
			dispatch(setSuccess('Reply sent'))
			if (pathname.startsWith('/fleet')) {
				queryClient.refetchQueries(queryTypes.FLEET_DETAILS)
			} else if (pathname.startsWith('/home')) {
				queryClient.invalidateQueries(queryTypes.FLEETS)
			} else if (pathname.startsWith('/profile')) {
				queryClient.invalidateQueries(queryTypes.PROFILE_FLEETS)
			}
		},
	})

	const onSubmit = () => {
		if (body === '') {
			dispatch(setError('Reply cannot be empty'))
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
				<div className='text-white bg-gray-800 rounded-sm'>
					<ModalHeader>Reply to Fleet</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FleetPreview fleet={fleet} />
						<TextArea
							value={body}
							onChange={onChange}
							onKeyDown={onEnterPress}
							label='Reply'
							name='reply'
							ref={inputRef}
							className='h-24 text-white transition duration-150 bg-gray-800 focus:bg-gray-700'
						/>
					</ModalBody>

					<ModalFooter>
						<div className='flex items-center justify-between w-full'>
							<span className={clsx(body.length > 240 ? 'text-red-600' : 'text-white')}>
								{body.length}/240
							</span>
							<Button variant='filled' onClick={onSubmit}>
								Send Reply
							</Button>
						</div>
					</ModalFooter>
				</div>
			</ModalContent>
		</Modal>
	)
}

export default ReplyComposer
