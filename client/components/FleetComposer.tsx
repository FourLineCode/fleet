import axios from 'axios'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { queryCache, useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../hooks/useAuthorization'
import { setError, setSuccess } from '../store/actions/notificationActions'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'
import CloseIcon from '../ui/icons/CloseIcon'
import Modal from '../ui/Modal'
import TextArea from '../ui/TextArea'
import { BASE_URL } from '../utils/config'

interface Props {
	visible: boolean
	setVisible: (arg: boolean) => void
}

const FleetComposer = ({ visible, setVisible }: Props) => {
	const [body, setBody] = useState('')
	const auth = useAuthorization()
	const dispatch = useDispatch()
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const composeFleet = async () => {
		try {
			await axios.post(
				`${BASE_URL}/fleet`,
				{ body: body },
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
					},
				}
			)
		} catch (error) {
			if (error.response.data) dispatch(setError(error.response.data.message))
		}
	}

	const [mutate, { isLoading }] = useMutation(composeFleet, {
		onSuccess: () => {
			dispatch(setSuccess('Fleet sent'))
			queryCache.refetchQueries('fleets')
			setVisible(false)
			setBody('')
		},
		onError: () => {
			dispatch(setError('An error occured while sending fleet'))
			setBody('')
		},
	})

	const onSubmit = () => {
		if (body === '') {
			dispatch(setError('Fleet body cannot be empty'))
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
			className='w-full h-56 bg-gray-800 rounded-lg shadow-lg md:w-2/5'
		>
			<div className='flex justify-end w-full'>
				<IconButton onClick={() => setVisible(false)}>
					<CloseIcon className='w-5 h-5 text-white transform hover:text-green-400 hover:scale-110' />
				</IconButton>
			</div>
			<div className='w-full h-full px-2'>
				<TextArea
					value={body}
					onChange={onChange}
					onKeyDown={onEnterPress}
					label='Fleet'
					name='body'
					ref={inputRef}
					className='h-24 text-white transition duration-150 bg-gray-800 focus:bg-gray-700'
				/>
				<div className='flex items-center justify-between w-full'>
					<span className={clsx(body.length > 240 ? 'text-red-600' : 'text-white')}>{body.length}/240</span>
					<Button variant='filled' onClick={onSubmit}>
						Send Fleet
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default FleetComposer
