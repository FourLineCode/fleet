import { Query, Resolver } from 'type-graphql'
import User from '../entity/User'

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async allUsers() {
		try {
			// TODO: Authorization
			// if (!req.admin) {
			//     res.status(StatusCodes.FORBIDDEN)
			//     throw new Error('Access denied')
			// }

			return (await User.find()) || []
		} catch (error) {
			console.log(error)
		}
	}
}
