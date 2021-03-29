import { gql, useMutation } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { ConfirmModal } from '../../ui/components/ConfirmModal';
import { DotsVertical } from '../../ui/icons/DotsVertical';
import { ExternalLinkIcon } from '../../ui/icons/ExternalLinkIcon';
import { TrashIcon } from '../../ui/icons/TrashIcon';

interface Props {
	id: number;
	canDelete: boolean;
}

export const FleetOptions = ({ id, canDelete }: Props) => {
	// const router = useRouter()
	// const { pathname } = router
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [deletePost] = useMutation(
		gql`
			mutation DeletePost($id: Int!) {
				deleteFleet(id: $id) {
					success
				}
			}
		`,
		{
			variables: {
				id: id,
			},
		}
	);

	// const { mutate } = useMutation(deleteFleet, {
	// 	onSuccess: () => {
	// 		onClose()
	// 		dispatch(setSuccess('Fleet was deleted'))
	// 		if (pathname.startsWith('/home')) {
	// 			queryClient.refetchQueries(queryTypes.FLEETS)
	// 		} else if (pathname.startsWith('/profile')) {
	// 			queryClient.refetchQueries(queryTypes.PROFILE_FLEETS)
	// 		} else if (pathname.startsWith('/fleet')) {
	// 			router.back()
	// 		}
	// 	},
	// })

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
									<Menu.Item>
										<Link href={`/fleet/${id}`}>
											<a
												target='_blank'
												className='flex items-center w-full px-2 py-2 font-semibold rounded-lg outline-none cursor-pointer hover:bg-brand-500 hover:bg-opacity-25 hover:text-brand-500'
											>
												<ExternalLinkIcon className='w-4 h-4 mr-2' />
												Open in a new window
											</a>
										</Link>
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</>
					)}
				</Menu>
				<ConfirmModal
					action={deletePost}
					header='Delete Fleet?'
					desc='This can’t be undone and it will be removed from your profile'
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
				/>
			</div>
		</div>
	);
};
