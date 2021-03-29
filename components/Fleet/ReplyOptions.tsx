import { useDisclosure } from '@chakra-ui/react';
import { Menu, Transition } from '@headlessui/react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../store/actions/notificationActions';
import { ConfirmModal } from '../../ui/components/ConfirmModal';
import { DotsVertical } from '../../ui/icons/DotsVertical';
import { TrashIcon } from '../../ui/icons/TrashIcon';
import { BASE_URL } from '../../utils/config';
import { queryTypes } from '../../utils/query';

interface Props {
	id: string;
	canDelete: boolean;
}

export const ReplyOptions = ({ id, canDelete }: Props) => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const deleteReply = async () => {
		try {
			const res = await axios.delete(`${BASE_URL}/fleet/reply/${id}`);

			return res.data;
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message));
		}
	};

	const { mutate } = useMutation(deleteReply, {
		onSuccess: () => {
			onClose();
			dispatch(setSuccess('Reply was deleted'));
			queryClient.refetchQueries(queryTypes.FLEET_DETAILS);
		},
	});

	return (
		<div>
			<div className='relative'>
				<Menu>
					{({ open }) => (
						<>
							<Menu.Button className='focus:outline-none'>
								<div className='p-1 text-black transform rounded-full dark:text-white hover:bg-gray-300 dark:hover:bg-dark-700 hover:text-brand-500 hover:scale-110'>
									<DotsVertical className='w-4 h-4' />
								</div>
							</Menu.Button>
							<Transition
								show={open}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'
							>
								<Menu.Items
									static
									className='absolute right-0 z-50 w-56 text-black border rounded-lg shadow-lg dark:text-white bg-light dark:bg-dark-800 border-brand-500 top-full focus:outline-none'
								>
									{canDelete && (
										<Menu.Item>
											<div
												onClick={onOpen}
												className='flex items-center w-full px-2 py-2 font-semibold text-red-500 rounded-lg outline-none cursor-pointer hover:bg-red-500 hover:bg-opacity-20 hover:text-red-500'
											>
												<TrashIcon className='w-4 h-4 mr-2' />
												Delete
											</div>
										</Menu.Item>
									)}
								</Menu.Items>
							</Transition>
						</>
					)}
				</Menu>
				<ConfirmModal
					action={mutate}
					header='Delete Reply?'
					desc='This can’t be undone and it will be removed from the post'
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
				/>
			</div>
		</div>
	);
};
