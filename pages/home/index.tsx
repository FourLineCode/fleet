import { gql } from '@apollo/client';
import { FleetType, Timeline } from '../../components/Fleet/Timeline';
import { ProtectedLayout } from '../../components/Layouts/ProtectedLayout';
import { Menu } from '../../components/Navigation/Menu';
import { Recommend } from '../../components/Recommend/Recommend';
import { client } from '../../utils/apollo';

interface Props {
	fleets: FleetType[];
}

const Home = ({ fleets }: Props) => {
	return (
		<ProtectedLayout title='Home'>
			<div className='grid min-h-screen grid-cols-4 bg-light dark:bg-dark-800 gap-x-1 xl:gap-x-4'>
				<Menu />
				<Timeline fleets={fleets} />
				<Recommend />
			</div>
		</ProtectedLayout>
	);
};

export const getServerSideProps = async () => {
	const { data } = await client.query({
		query: gql`
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
		`,
	});

	return {
		props: {
			fleets: data.homePageFleets,
		},
	};
};

export default Home;
