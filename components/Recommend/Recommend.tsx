import { gql, useQuery } from '@apollo/client'
import { UserState } from '../../contexts/types'
import { RecommendSuspense } from '../Suspense/RecommendSuspense'
import { UserInfo } from './UserInfo'

export const Recommend = () => {
	const { data } = useQuery(gql`
		query Recommendation {
			recommend {
				id
				username
				displayName
				bio
				avatarURL
				isAdmin
				createdAt
			}
		}
	`)

	// const getRecommendations = async () => {
	// 	try {
	// 		const res = await axios.get(`${BASE_URL}/search/recommend`)
	// 		return res.data
	// 	} catch (error) {
	// 		if (error.response) dispatch(setError(error.response.data.message))
	// 	}
	// }

	// const { data } = useQuery(queryTypes.RECOMMENDED_USERS, getRecommendations)

	// useEffect(() => {
	// 	return () => {
	// 		queryClient.removeQueries(queryTypes.RECOMMENDED_USERS)
	// 	}
	// }, [])

	return (
		<div className='h-full p-4'>
			<div className='hidden w-full px-4 pt-2 pb-4 border rounded-lg shadow-xl border-dark-700 xl:block'>
				<div className='mb-2 text-lg text-black dark:text-white'>People you may know</div>
				<div className='flex flex-col space-y-4'>
					{data && data.recommend.length > 0 ? (
						data.recommend.map((user: UserState) => <UserInfo user={user} key={user.id} />)
					) : (
						<RecommendSuspense />
					)}
				</div>
			</div>
		</div>
	)
}
