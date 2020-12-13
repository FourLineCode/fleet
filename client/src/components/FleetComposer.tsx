import axios from 'axios'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { queryCache, useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../config'
import useAuthorization from '../hooks/useAuthorization'
import { setError, setSuccess } from '../store/actions/notificationActions'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'
import CloseIcon from '../ui/icons/CloseIcon'
import TextArea from '../ui/TextArea'

type Props = {
	visible: boolean
	setVisible: (arg: boolean) => void
}

const FleetComposer = ({ visible, setVisible }: Props) => {
	const [body, setBody] = useState('')
	const auth = useAuthorization()
	const dispatch = useDispatch()

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
			console.log(error.response.data)
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
	})

	return (
		<div
			className={clsx(
				!visible && 'invisible',
				'fixed top-0 left-0 bg-opacity-25 bg-white w-screen h-screen z-50'
			)}>
			<div
				ref={ref}
				className='absolute left-0 right-0 w-full h-56 mx-auto bg-gray-800 rounded-lg shadow-md md:w-2/5 top-20'>
				<div className='flex justify-end w-full'>
					<IconButton onClick={() => setVisible(false)}>
						<CloseIcon className='w-5 h-5 text-white hover:text-green-400' />
					</IconButton>
				</div>
				<div className='w-full h-full px-2'>
					<TextArea
						value={body}
						onChange={onChange}
						label='Fleet'
						name='body'
						className='h-24 text-white bg-gray-700 focus:bg-gray-600'
					/>
					<div className='flex items-center justify-between w-full'>
						<span className={clsx(body.length > 240 ? 'text-red-600' : 'text-white')}>
							{body.length}/240
						</span>
						<Button variant='filled' onClick={onSubmit}>
							Send Fleet
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FleetComposer
