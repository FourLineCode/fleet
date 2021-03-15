import { IsEmail } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import { Column, Entity } from 'typeorm'
import InternalEntity from './InternalEntity'

@ObjectType()
@Entity()
export default class User extends InternalEntity {
	@Field()
	@Column({ unique: true })
	username: string

	@Field()
	@Column()
	displayName: string

	@Field()
	@Column({ default: '' })
	bio: string

	@Field()
	@Column({ unique: true })
	@IsEmail()
	email: string

	@Field()
	@Column()
	password: string

	@Field()
	@Column({ default: false })
	isAdmin: boolean

	// @Field(() => [Fleet])
	// @OneToMany(() => Fleet, (fleet) => fleet.author)
	// fleets: Fleet[]

	// @Field(() => [Follow])
	// @OneToMany(() => Follow, (follow) => follow.from)
	// following: Follow[]

	// @Field(() => [Follow])
	// @OneToMany(() => Follow, (follow) => follow.to)
	// followers: Follow[]

	// @Field(() => [Like])
	// @OneToMany(() => Like, (likes) => likes.user)
	// likedFleets: Like[]

	// @Field(() => [Reply])
	// @OneToMany(() => Reply, (replies) => replies.user)
	// replies: Reply[]

	// static async getFollowUsers(id: string) {
	// 	try {
	// 		return await getManager()
	// 			.getRepository(User)
	// 			.createQueryBuilder('user')
	// 			.where('user.id = :id', { id })
	// 			.leftJoinAndSelect('user.followers', 'followers')
	// 			.leftJoinAndSelect('followers.from', 'frfrom')
	// 			.leftJoinAndSelect('followers.to', 'frto')
	// 			.leftJoinAndSelect('user.following', 'following')
	// 			.leftJoinAndSelect('following.from', 'fnfrom')
	// 			.leftJoinAndSelect('following.to', 'fnto')
	// 			.getOne()
	// 	} catch (error) {
	// 		throw error
	// 	}
	// }
}
