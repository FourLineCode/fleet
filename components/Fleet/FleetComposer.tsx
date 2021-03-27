import { gql, useMutation } from '@apollo/client'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { useNotification } from '../../hooks/useNotification'
import { Button } from '../../ui/components/Button'
import { TextArea } from '../../ui/components/TextArea'

interface Props {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const FleetComposer = ({ isOpen, onOpen, onClose }: Props) => {
	// const { pathname } = useRouter()
	const [body, setBody] = useState('')
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const notification = useNotification()

	const [composeFleet, { loading }] = useMutation(
		gql`
			mutation PostFleet($body: String!) {
				postFleet(body: $body) {
					id
				}
			}
		`,
		{
			variables: {
				body: body,
			},
		}
	)

	// const composeFleet = async () => {
	// 	try {
	// 		await axios.post(`${BASE_URL}/fleet`, { body: body })
	// 	} catch (error) {
	// 		if (error.response) dispatch(setError(error.response.data.message))
	// 	}
	// }

	// const { mutate, isLoading } = useMutation(composeFleet, {
	// 	onMutate: () => {
	// 		onClose()
	// 		setBody('')
	// 	},
	// 	onSuccess: () => {
	// 		dispatch(setSuccess('Fleet sent'))
	// 		if (pathname.startsWith('/home')) {
	// 			queryClient.refetchQueries(queryTypes.FLEETS)
	// 		} else if (pathname.startsWith('/profile')) {
	// 			queryClient.refetchQueries(queryTypes.PROFILE_FLEETS)
	// 		}
	// 	},
	// })

	const onSubmit = () => {
		if (body === '') {
			notification.showErrorMessage('Fleet cannot be empty')
		}
		if (body !== '' && !loading) {
			composeFleet()
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
				<div className='text-black rounded-sm dark:text-white bg-light dark:bg-dark-800'>
					<ModalHeader>Send a Fleet</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<TextArea
							placeholder='Send a fleet...'
							value={body}
							onChange={onChange}
							onKeyDown={onEnterPress}
							label='Fleet'
							name='body'
							ref={inputRef}
							className='h-24 text-black transition duration-150 dark:text-white bg-light dark:bg-dark-800 focus:bg-gray-200 dark:focus:bg-dark-700'
						/>
					</ModalBody>
					<ModalFooter>
						<div className='flex items-center justify-between w-full'>
							<span className={clsx(body.length > 240 ? 'text-red-600' : 'text-black dark:text-white')}>
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
