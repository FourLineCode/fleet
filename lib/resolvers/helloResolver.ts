import { Query, Resolver } from 'type-graphql'
import User from '../entity/User'

@Resolver()
export class HelloResolver {
	@Query(() => [User])
	async hello() {
		try {
			const user = User.create({
				username: 'akmal',
				displayName: 'Akmal Hossain',
				email: 'akmal@rip.com',
				password: 'hello',
				isAdmin: true,
				bio: 'I made this website, i dont know what else to tell you about me LOL',
			})
			await user.save()

			return User.find()
		} catch (error) {
			console.log(error)
		}
	}
}
