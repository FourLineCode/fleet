import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { format } from 'date-fns'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setError } from '../../store/actions/notificationActions'
import IconButton from '../../ui/components/IconButton'
import HeartFilledIcon from '../../ui/icons/HeartFilledIcon'
import HeartIcon from '../../ui/icons/HeartIcon'
import ReplyIcon from '../../ui/icons/ReplyIcon'
import VerifiedFilledIcon from '../../ui/icons/VerifiedFilledIcon'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'
import FleetOptions from './FleetOptions'
import ReplyComposer from './ReplyComposer'
import { FleetType } from './Timeline'

interface Props {
	fleet: FleetType
	liked: boolean
	setLiked: Dispatch<SetStateAction<boolean>>
	canDelete: boolean
}

const FleetView = ({ fleet, liked, setLiked, canDelete }: Props) => {
	const dispatch = useDispatch()
	const queryClient = useQueryClient()

	const { isOpen, onOpen, onClose } = useDisclosure()

	const likeHandler = async () => {
		try {
			if (!liked) {
				await axios.post(`${BASE_URL}/fleet/like/${fleet.id}`)
			} else {
				await axios.post(`${BASE_URL}/fleet/unlike/${fleet.id}`)
			}
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { mutate } = useMutation(likeHandler, {
		onMutate: () => {
			if (liked) {
				fleet.likes.pop()
			} else {
				fleet.likes.push({
					id: 'placeholder',
					createdAt: new Date().toISOString(),
				})
			}
			setLiked(!liked)
		},
		onSettled: () => {
			queryClient.invalidateQueries(queryTypes.FLEET_DETAILS)
		},
	})

	return (
		<div className='w-full'>
			<div className='flex flex-col pb-2 space-x-1 space-y-2 border-b border-dark-700'>
				<div className='flex'>
					<Link href={`/profile/${fleet.author.id}`}>
						<a className='flex items-center justify-center flex-shrink-0 mt-1 mr-2 overflow-hidden border-2 border-transparent rounded-lg w-14 h-14 hover:border-brand-500'>
							<img
								src={
									fleet.author.isAdmin
										? 'https://github.com/FourLineCode.png'
										: 'https://github.com/RobinMalfait.png'
								}
								alt='profile-photo'
							/>
						</a>
					</Link>
					<div className='text-base font-bold text-black dark:text-white'>
						<Link href={`/profile/${fleet.author.id}`}>
							<a>
								<span className='flex items-center text-xl hover:underline'>
									<span>{fleet.author.displayName}</span>
									{fleet.author.isAdmin && (
										<VerifiedFilledIcon className='w-4 h-4 ml-1 text-brand-500 dark:text-white' />
									)}
								</span>{' '}
								<span className='font-normal text-gray-600 dark:text-gray-400'>
									@{fleet.author.username}
								</span>
							</a>
						</Link>
					</div>
				</div>
				<div className='text-xl font-normal text-black break-all dark:text-white'>{fleet.body}</div>
				<div className='text-sm font-normal text-gray-600 dark:text-gray-400'>
					{format(new Date(fleet.createdAt), 'h:mm bbb • d MMMM, yyyy')}
				</div>
			</div>
			<div className='w-full h-8 px-2 mt-1'>
				<div className='flex items-center w-full h-full'>
					<div className='flex items-center flex-1 justify-evenly'>
						<div className='flex items-center justify-evenly'>
							<IconButton
								onClick={onOpen}
								className='text-black transform rounded-full dark:text-white hover:bg-gray-300 dark:hover:bg-dark-700 hover:text-brand-500 hover:scale-110'
							>
								<ReplyIcon className='w-5 h-5' />
							</IconButton>
							<span className='text-lg text-black dark:text-white'>{fleet.replies.length}</span>
						</div>
						<div className='flex items-center'>
							<IconButton
								onClick={mutate}
								className='text-black transform rounded-full dark:text-white hover:bg-gray-300 dark:hover:bg-dark-700 hover:text-brand-500 hover:scale-110'
							>
								{liked ? (
									<HeartFilledIcon className='w-5 h-5 text-brand-500 dark:text-white' />
								) : (
									<HeartIcon className='w-5 h-5' />
								)}
							</IconButton>
							<span className='text-lg text-black dark:text-white'>{fleet.likes.length}</span>
						</div>
					</div>
					<FleetOptions id={fleet.id} canDelete={canDelete} />
				</div>
			</div>
			<ReplyComposer fleet={fleet} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</div>
	)
}

export default FleetView
