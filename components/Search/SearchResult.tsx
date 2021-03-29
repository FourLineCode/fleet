import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';

type TabType = 'users' | 'posts';

const Tabs: Record<TabType, TabType> = {
	users: 'users',
	posts: 'posts',
};

export const SearchResult = () => {
	const router = useRouter();
	const { query } = router.query;
	const [tab, setTab] = useState<TabType>(Tabs.users);

	return (
		<div className='h-full col-span-4 px-1 py-2 mb-8 border-dark-500 md:px-2 md:col-span-3 xl:col-span-2 md:border-l xl:border-r md:mb-0'>
			<div className='flex justify-center w-full'>
				<div className='flex w-1/3 text-center text-black dark:text-white'>
					<div
						onClick={() => setTab(Tabs.users)}
						className='relative flex items-center justify-center flex-1 h-10 cursor-pointer hover:bg-gray-300 dark:hover:bg-dark-700'
					>
						Users
						<div
							className={clsx(
								tab === Tabs.users ? 'block' : 'invisible',
								'absolute bottom-0 left-0 w-full h-1 bg-brand-500'
							)}
						/>
					</div>
					<div
						onClick={() => setTab(Tabs.posts)}
						className='relative flex items-center justify-center flex-1 h-10 cursor-pointer hover:bg-gray-300 dark:hover:bg-dark-700'
					>
						Posts
						<div
							className={clsx(
								tab === Tabs.posts ? 'block' : 'invisible',
								'absolute bottom-0 left-0 w-full h-1 bg-brand-500'
							)}
						/>
					</div>
				</div>
			</div>
			<div className='flex items-center text-2xl text-black dark:text-white'>
				<span>Search result for "{query}"</span>
			</div>
		</div>
	);
};
