import { gql, useQuery } from '@apollo/client';
import { ErrorIcon } from '../../ui/icons/ErrorIcon';
import { Fleet } from './Fleet';

interface Author {
	id: number;
	username: string;
	displayName: string;
	isAdmin: boolean;
}

interface Like {
	id: number;
	createdAt: string;
}

interface Reply {
	id: number;
	createdAt: string;
}

interface Post {
	id: number;
	body: string;
	createdAt: string;
	author: Author;
	like: Like[];
	reply: Reply[];
}
export interface FleetType {
	post: Post;
	liked: boolean;
}

interface Props {
	fleets: FleetType[];
}

export const Timeline = ({}: Props) => {
	const { data } = useQuery(gql`
		query Fleets {
			homePageFleets {
				post {
					id
					body
					createdAt
					like {
						id
						createdAt
					}
					reply {
						id
						createdAt
					}
					author {
						id
						username
						displayName
						isAdmin
					}
				}
				liked
			}
		}
	`);

	console.log(data);

	return (
		<div className='flex flex-col h-full col-span-4 px-1 py-4 mb-8 space-y-4 border-dark-500 md:px-2 lg:px-0 md:col-span-3 xl:col-span-2 md:border-l xl:border-r md:mb-0'>
			{data.fleets && data.fleets.length > 0 ? (
				data.fleets.map((fleet: FleetType) => <Fleet fleet={fleet} key={fleet.post.id} />)
			) : (
				<div className='flex items-center justify-center w-full h-full'>
					<div className='flex-col'>
						<ErrorIcon className='w-20 h-20 mx-auto text-gray-500' />
						<div className='text-2xl font-semibold text-gray-500'>No Fleets found</div>
					</div>
				</div>
			)}
		</div>
	);
};
