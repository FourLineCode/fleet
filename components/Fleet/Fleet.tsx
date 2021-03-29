import { gql, useMutation } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { IconButton } from '../../ui/components/IconButton';
import { HeartFilledIcon } from '../../ui/icons/HeartFilledIcon';
import { HeartIcon } from '../../ui/icons/HeartIcon';
import { ReplyIcon } from '../../ui/icons/ReplyIcon';
import { VerifiedFilledIcon } from '../../ui/icons/VerifiedFilledIcon';
import { FleetOptions } from './FleetOptions';
import { ReplyComposer } from './ReplyComposer';
import { FleetType } from './Timeline';

interface Props {
	fleet: FleetType;
}

export const Fleet = ({ fleet }: Props) => {
	const auth = useAuthorization();
	const user = useCurrentUser();
	// const { pathname } = useRouter()

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [liked, setLiked] = useState<boolean>(fleet.liked);
	const [canDelete] = useState(auth.id === fleet.post.author.id || user.isAdmin);

	const likeMutation = liked
		? gql`
				mutation UnlikePost($id: Int!) {
					unlikeFleet(id: $id) {
						success
					}
				}
		  `
		: gql`
				mutation LikePost($id: Int!) {
					likeFleet(id: $id) {
						success
					}
				}
		  `;

	const [likePost] = useMutation(likeMutation, {
		variables: {
			id: fleet.post.id,
		},
		onCompleted: () => {
			setLiked((prev) => !prev);
		},
	});

	// const { mutate } = useMutation(likeHandler, {
	// 	onMutate: () => {
	// 		if (liked) {
	// 			fleet.likes.pop()
	// 		} else {
	// 			fleet.likes.push({
	// 				id: 'placeholder',
	// 				createdAt: new Date().toISOString(),
	// 			})
	// 		}
	// 		setLiked(!liked)
	// 	},
	// 	onSettled: () => {
	// 		if (pathname.startsWith('/home')) {
	// 			queryClient.invalidateQueries(queryTypes.FLEETS)
	// 		} else if (pathname.startsWith('/profile')) {
	// 			queryClient.invalidateQueries(queryTypes.PROFILE_FLEETS)
	// 		}
	// 	},
	// })

	return (
		<div className='w-full px-2 pt-2 border rounded-lg shadow-xl border-dark-700 lg:mx-auto lg:w-3/4 hover:bg-gray-200 dark:hover:bg-dark-900 hover:bg-opacity-50'>
			<Link href={`/fleet/${fleet.post.id}`} passHref={true}>
				<div className='flex space-x-1 cursor-pointer'>
					<Link href={`/profile/${fleet.post.author.id}`}>
						<a className='flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-2 overflow-hidden border-2 border-transparent rounded-lg hover:border-brand-500'>
							<img
								src={
									fleet.post.author.isAdmin
										? 'https://github.com/FourLineCode.png'
										: 'https://github.com/RobinMalfait.png'
								}
								alt='profile-photo'
							/>
						</a>
					</Link>
					<div className='w-full text-base font-bold text-black dark:text-white'>
						<div className='flex flex-col mb-2'>
							<Link href={`/profile/${fleet.post.author.id}`}>
								<a className='flex items-center space-x-1 group'>
									<span className='group-hover:underline line-clamp-1'>
										{fleet.post.author.displayName}
									</span>
									<span>
										{fleet.post.author.isAdmin && (
											<VerifiedFilledIcon className='w-4 h-4 ml-1 text-brand-500 dark:text-white' />
										)}
									</span>
									<span className='font-normal text-gray-600 truncate dark:text-gray-400'>
										@{fleet.post.author.username}
									</span>
								</a>
							</Link>
							<span className='text-xs font-normal text-gray-600 dark:text-gray-400 line-clamp-1'>
								{formatDistanceToNow(new Date(fleet.post.createdAt))}
							</span>
						</div>
						<div className='text-base font-normal text-black break-all dark:text-white'>
							{fleet.post.body}
						</div>
					</div>
				</div>
			</Link>
			<div className='w-full h-6 mt-1'>
				<div className='flex items-center w-full h-full'>
					<div className='flex items-center flex-1 justify-evenly'>
						<div className='flex items-center justify-evenly'>
							<IconButton
								onClick={onOpen}
								className='text-black transform rounded-full dark:text-white hover:bg-gray-300 dark:hover:bg-dark-700 hover:text-brand-500 hover:scale-110'
							>
								<ReplyIcon className='w-4 h-4' />
							</IconButton>
							<span className='text-base text-black dark:text-white'>{fleet.post.reply.length}</span>
						</div>
						<div className='flex items-center'>
							<IconButton
								onClick={likePost}
								className='text-black transform rounded-full dark:text-white hover:bg-gray-300 dark:hover:bg-dark-700 hover:text-brand-500 hover:scale-110'
							>
								{liked ? (
									<HeartFilledIcon className='w-4 h-4 text-brand-500 dark:text-white' />
								) : (
									<HeartIcon className='w-4 h-4' />
								)}
							</IconButton>
							<span className='text-base text-black dark:text-white'>{fleet.post.like.length}</span>
						</div>
					</div>
					<FleetOptions id={fleet.post.id} canDelete={canDelete} />
				</div>
			</div>
			<ReplyComposer fleet={fleet} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</div>
	);
};
