import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { UserState } from '../../contexts/types';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { setError } from '../../store/actions/notificationActions';
import { BASE_URL } from '../../utils/config';
import { queryClient, queryTypes } from '../../utils/query';
import { FleetDetailsSuspense } from '../Suspense/FleetDetailsSuspense';
import { FleetView } from './FleetView';
import { Reply } from './Reply';

export interface ReplyType {
	id: string;
	user: UserState;
	body: string;
	createdAt: string;
}

export const FleetDetails = () => {
	const user = useCurrentUser();
	const router = useRouter();
	const { id } = router.query;
	const auth = useAuthorization();
	const dispatch = useDispatch();
	const [liked, setLiked] = useState<boolean>(false);

	const getFleetData = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/fleet/post/${id}`);

			return res.data;
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message));
		}
	};

	const { data, isLoading } = useQuery(queryTypes.FLEET_DETAILS, getFleetData);

	useEffect(() => {
		return () => {
			queryClient.removeQueries(queryTypes.FLEET_DETAILS);
		};
	}, []);

	useEffect(() => {
		if (data) {
			setLiked(data.liked);
		}
	}, [data]);

	return (
		<div
			className={clsx(
				'w-full h-full col-span-4 p-2 border-dark-500 md:col-span-3 xl:col-span-2 md:border-l lg:border-r'
			)}
		>
			{data && !isLoading ? (
				<div>
					<div className='border-b border-dark-700'>
						<FleetView
							fleet={data}
							liked={liked}
							setLiked={setLiked}
							canDelete={data.author.id === auth.id || user.isAdmin}
						/>
					</div>
					<div className='w-full mt-6 mb-8 space-y-4 md:mb-0'>
						{data.replies.map((reply: ReplyType) => (
							<Reply reply={reply} user={data.author} key={reply.id} />
						))}
					</div>
				</div>
			) : (
				<FleetDetailsSuspense />
			)}
		</div>
	);
};
