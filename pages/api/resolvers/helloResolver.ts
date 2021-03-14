import { Arg, Query, Resolver } from 'type-graphql'

@Resolver()
export default class HelloResolver {
	private str = 'foo:bar'

	@Query(() => String)
	async hello() {
		return this.str
	}

	@Query(() => String)
	async greet(@Arg('name') name: string) {
		return `Hello ${name}, how are you?`
	}
}
