import { gql, useMutation } from '@apollo/client';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../../ui/components/Button';
import { TextArea } from '../../ui/components/TextArea';
import { FleetPreview } from './FleetPreview';
import { FleetType } from './Timeline';

interface Props {
	fleet: FleetType;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const ReplyComposer = ({ fleet, isOpen, onOpen, onClose }: Props) => {
	// const { pathname } = useRouter()
	const notification = useNotification();
	const [body, setBody] = useState('');
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const [composeReply, { loading }] = useMutation(gql`
		mutation Reply($fleetId: Int!, $body: String!) {
			reply(fleetId: $fleetId, body: $body) {
				id
			}
		}
	`);

	// const composeReply = async () => {
	// 	try {
	// 		const res = await axios.post(`${BASE_URL}/fleet/reply/${fleet.id}`, { body: body })

	// 		return res.data
	// 	} catch (error) {
	// 		if (error.response) dispatch(setError(error.response.data.message))
	// 	}
	// }

	// const { mutate, isLoading: loading } = useMutation(composeReply, {
	// 	onMutate: () => {
	// 		onClose()
	// 		setBody('')
	// 	},
	// 	onSuccess: () => {
	// 		dispatch(setSuccess('Reply sent'))
	// 		if (pathname.startsWith('/fleet')) {
	// 			queryClient.refetchQueries(queryTypes.FLEET_DETAILS)
	// 		} else if (pathname.startsWith('/home')) {
	// 			queryClient.invalidateQueries(queryTypes.FLEETS)
	// 		} else if (pathname.startsWith('/profile')) {
	// 			queryClient.invalidateQueries(queryTypes.PROFILE_FLEETS)
	// 		}
	// 	},
	// })

	const onSubmit = () => {
		if (body === '') {
			notification.showErrorMessage('Reply cannot be empty');
		}
		if (body !== '' && !loading) {
			composeReply();
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBody(e.target.value);
	};

	const onEnterPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && e.shiftKey === false) {
			e.preventDefault();
			onSubmit();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='xl' initialFocusRef={inputRef}>
			<ModalOverlay />
			<ModalContent>
				<div className='text-black rounded-sm dark:text-white bg-light dark:bg-dark-800'>
					<ModalHeader>Reply to Fleet</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FleetPreview fleet={fleet} />
						<TextArea
							placeholder='Reply to fleet...'
							value={body}
							onChange={onChange}
							onKeyDown={onEnterPress}
							label='Reply'
							name='reply'
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
								Send Reply
							</Button>
						</div>
					</ModalFooter>
				</div>
			</ModalContent>
		</Modal>
	);
};
