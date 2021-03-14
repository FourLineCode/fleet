import { Query, Resolver } from 'type-graphql'

@Resolver()
export default class LOLResolver {
	@Query(() => String)
	async lol() {
		return 'Lmao'
	}
}
