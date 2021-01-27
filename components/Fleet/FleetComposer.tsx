import axios from 'axios'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setError, setSuccess } from '../../store/actions/notificationActions'
import Button from '../../ui/components/Button'
import IconButton from '../../ui/components/IconButton'
import Modal from '../../ui/components/Modal'
import TextArea from '../../ui/components/TextArea'
import CloseIcon from '../../ui/icons/CloseIcon'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'

interface Props {
	visible: boolean
	setVisible: (arg: boolean) => void
}

const FleetComposer = ({ visible, setVisible }: Props) => {
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
			dispatch(setSuccess('Fleet sent'))
			setVisible(false)
			setBody('')
		},
		onSuccess: () => {
			if (pathname.startsWith('/home')) {
				queryClient.refetchQueries(queryTypes.FLEETS)
			} else if (pathname.startsWith('/profile')) {
				queryClient.refetchQueries(queryTypes.PROFILE_FLEETS)
			}
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
