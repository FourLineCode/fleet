import { QueryClient } from 'react-query'

export const queryClient = new QueryClient()

export const queryTypes = {
	FLEETS: 'fleets',
	PROFILE_FLEETS: 'profile-fleets',
	FLEET_DETAILS: 'fleet-details',
	FOLLOW_DETAILS: 'follow-details',
	FOLLOW_DATA: 'follow-data',
	IS_FOLLOWING: 'is-following',
	RECOMMENDED_USERS: 'recommended-users',
}
