import { useDisclosure } from '@chakra-ui/react'
import { Menu, Transition } from '@headlessui/react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setError, setSuccess } from '../../store/actions/notificationActions'
import ConfirmModal from '../../ui/components/ConfirmModal'
import DotsVertical from '../../ui/icons/DotsVertical'
import ExternalLinkIcon from '../../ui/icons/ExternalLinkIcon'
import TrashIcon from '../../ui/icons/TrashIcon'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'

interface Props {
	id: string
	canDelete: boolean
}

const FleetOptions = ({ id, canDelete }: Props) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { pathname } = router
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const deleteFleet = async () => {
		try {
			const res = await axios.delete(`${BASE_URL}/fleet/${id}`)

			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { mutate } = useMutation(deleteFleet, {
		onSuccess: () => {
			onClose()
			dispatch(setSuccess('Fleet was deleted'))
			if (pathname.startsWith('/home')) {
				queryClient.refetchQueries(queryTypes.FLEETS)
			} else if (pathname.startsWith('/profile')) {
				queryClient.refetchQueries(queryTypes.PROFILE_FLEETS)
			} else if (pathname.startsWith('/fleet')) {
				router.back()
			}
		},
	})

	return (
		<div>
			<div className='relative'>
				<Menu>
					{({ open }) => (
						<>
							<Menu.Button className='focus:outline-none'>
								<div className='p-1 text-white transform rounded-full hover:bg-dark-700 hover:text-brand-500 hover:scale-110'>
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
									className='absolute right-0 z-50 w-56 text-white border rounded-lg shadow-lg bg-dark-800 border-brand-500 top-full focus:outline-none'
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
					action={mutate}
					header='Delete Fleet?'
					desc='This can’t be undone and it will be removed from your profile'
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
				/>
			</div>
		</div>
	)
}

export default FleetOptions
