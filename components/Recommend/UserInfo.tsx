import Link from 'next/link';
import { useState } from 'react';
import { UserState } from '../../contexts/types';
import { RightArrowIcon } from '../../ui/icons/RightArrowIcon';
import { VerifiedFilledIcon } from '../../ui/icons/VerifiedFilledIcon';

interface Props {
	user: UserState;
}

export const UserInfo = ({ user }: Props) => {
	const [showIcon, setShowIcon] = useState(false);
	const userProfileId = user.id ? user.id : user.id;

	return (
		<Link href={`/profile/${userProfileId}`}>
			<a
				onMouseEnter={() => setShowIcon(true)}
				onMouseLeave={() => setShowIcon(false)}
				className='flex items-center justify-between w-full h-16 p-2 border rounded-lg shadow-xl cursor-pointer border-dark-700 group hover:bg-gray-300 dark:hover:bg-dark-900 dark:hover:bg-opacity-50'
			>
				<div className='flex items-center'>
					<div className='flex items-center justify-center w-12 h-12 mr-2 overflow-hidden rounded-lg'>
						<img
							src={
								user.isAdmin
									? 'https://github.com/FourLineCode.png'
									: 'https://github.com/RobinMalfait.png'
							}
							alt='profile-photo'
						/>
					</div>
					<div className='flex flex-col'>
						<div className='flex items-center text-black truncate dark:text-white'>
							<span className='group-hover:underline'>{user.displayName}</span>
							{user.isAdmin && (
								<VerifiedFilledIcon className='w-4 h-4 ml-1 dark:text-white text-brand-500' />
							)}
						</div>
						<div className='text-gray-600 dark:text-gray-400'>@{user.username}</div>
					</div>
				</div>
				{showIcon && <RightArrowIcon className='w-5 h-5 text-gray-500' />}
			</a>
		</Link>
	);
};
