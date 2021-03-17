import { Query, Resolver } from 'type-graphql'
import { prisma } from '../../prisma'
import { User } from '../entity/models'

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

			return prisma.user.findMany()
		} catch (error) {
			console.log(error)
		}
	}
}
