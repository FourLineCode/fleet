import axios from 'axios'
import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../../hooks/useAuthorization'
import { setError, setSuccess } from '../../store/actions/notificationActions'
import Button from '../../ui/components/Button'
import IconButton from '../../ui/components/IconButton'
import Modal from '../../ui/components/Modal'
import TextArea from '../../ui/components/TextArea'
import CloseIcon from '../../ui/icons/CloseIcon'
import VerifiedFilledIcon from '../../ui/icons/VerifiedFilledIcon'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'
import { FleetType } from './Timeline'

interface Props {
	fleet: FleetType
	visible: boolean
	setVisible: (arg: boolean) => void
}

const ReplyComposer = ({ fleet, visible, setVisible }: Props) => {
	const [body, setBody] = useState('')
	const auth = useAuthorization()
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const { pathname } = useRouter()
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const composeReply = async () => {
		try {
			const res = await axios.post(`${BASE_URL}/fleet/reply/${fleet.id}`, { body: body }, auth.apiConfig)

			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { mutate, isLoading } = useMutation(composeReply, {
		onMutate: () => {
			dispatch(setSuccess('Reply sent'))
			setVisible(false)
			setBody('')
		},
		onSuccess: () => {
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

	useEffect(() => {
		if (visible) {
			setTimeout(() => {
				inputRef.current?.focus()
			}, 0)
		}
	}, [visible])

	return (
		<Modal
			visible={visible}
			setVisible={setVisible}
			position='top'
			className='w-full pb-2 bg-gray-800 rounded-lg shadow-lg max-h-96 md:w-2/5'
		>
			<div className='flex justify-end w-full'>
				<IconButton onClick={() => setVisible(false)}>
					<CloseIcon className='w-5 h-5 text-white transform hover:text-green-400 hover:scale-110' />
				</IconButton>
			</div>
			<div className='px-2 mt-4'>
				<div className='w-full px-2 py-2 mb-3 border border-gray-700 rounded-lg shadow-xl'>
					<div className='flex space-x-1'>
						<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-2 overflow-hidden border-2 border-transparent rounded-lg'>
							<img
								src={
									fleet.author.isAdmin
										? 'https://github.com/FourLineCode.png'
										: 'https://github.com/RobinMalfait.png'
								}
								alt='profile-photo'
							/>
						</div>
						<div>
							<div className='text-base font-bold text-white'>
								<div className='flex items-center space-x-1'>
									<a className='flex items-center space-x-1'>
										<span className='flex items-center hover:underline'>
											<span>{fleet.author.displayName}</span>
											{fleet.author.isAdmin && <VerifiedFilledIcon className='w-4 h-4 ml-1' />}
										</span>{' '}
										<span className='font-normal text-gray-400'>@{fleet.author.username}</span>
									</a>
									<span>{' • '}</span>
									<span className='text-sm font-normal text-gray-400'>
										{formatDistanceToNow(new Date(fleet.createdAt))}
									</span>
								</div>
							</div>
							<div className='overflow-hidden text-sm text-white break-all'>{fleet.body}</div>
						</div>
					</div>
				</div>
				<TextArea
					value={body}
					onChange={onChange}
					onKeyDown={onEnterPress}
					label={`Reply to @${fleet.author.username}`}
					name='reply'
					ref={inputRef}
					className='h-24 text-white transition duration-150 bg-gray-800 focus:bg-gray-700'
				/>
				<div className='flex items-center justify-between w-full'>
					<span className={clsx(body.length > 240 ? 'text-red-600' : 'text-white')}>{body.length}/240</span>
					<Button variant='filled' onClick={onSubmit}>
						Reply
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default ReplyComposer
