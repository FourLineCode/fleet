import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class SignInResult {
	@Field()
	success: boolean
	@Field()
	id: number
	@Field()
	token: string
	@Field()
	refreshToken: string

	constructor(success: boolean, id: number, token: string, refreshToken: string) {
		this.success = success
		this.id = id
		this.token = token
		this.refreshToken = refreshToken
	}
}
